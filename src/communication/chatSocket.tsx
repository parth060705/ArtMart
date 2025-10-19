export interface MessageBase {
  receiver_id: string;
  content?: string;
  action: "message" | "typing" | "read" | "presence";
}

export interface PresenceMessage extends MessageBase {
  action: "presence";
  content: 'online' | 'offline' | 'away';
}

export interface MessageOut {
  id?: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  timestamp: string;
  is_read: boolean;
  action: "message" | "typing" | "read";
  message_type: "text" | "image" | "file"; // Changed from literal "text" to union type
  status?: 'sending' | 'sent' | 'delivered' | 'failed';
}

class ChatSocket {
  private socket: WebSocket | null = null;
  private presenceTimeouts: { [key: string]: NodeJS.Timeout } = {};
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
  private messageHandlers: ((data: any) => void)[] = [];
  private accessToken: string | null = null;
  private userId: string | null = null; // Added userId
  private isConnecting: boolean = false;
  private reconnectAttempts: number = 0;
  private readonly maxReconnectAttempts: number = 5;

  

  public connect(accessToken: string, userId: string): void { // Added userId parameter
    if (this.isConnecting || this.socket?.readyState === WebSocket.OPEN) {
      console.log('WebSocket already connected or connecting');
      return;
    }

    this.isConnecting = true;
    this.accessToken = accessToken;
    this.userId = userId; // Store userId

    try {
      // Construct WebSocket URL with token
      console.log(import.meta.env.VITE_API_WS_URL)
      const baseUrl = `${import.meta.env.VITE_API_WS_URL}/auth/ chat/ws?token=${accessToken}`;
      this.socket = new WebSocket(baseUrl);
      this.reconnectAttempts++;

      this.socket.onopen = (): void => {
        console.log("✅ WebSocket connected:", baseUrl);
        this.isConnecting = false;
        if (this.reconnectTimeout) {
          clearTimeout(this.reconnectTimeout);
          this.reconnectTimeout = null;
        }
        this.reconnectAttempts = 0;
      };

      this.socket.onmessage = (event: MessageEvent): void => {
        try {
          const data = JSON.parse(event.data);
          this.messageHandlers.forEach((handler) => handler(data));
        } catch (error) {
          console.error("❌ Failed to parse message:", error);
        }
      };

      this.socket.onclose = (event: CloseEvent): void => {
        console.warn("⚠️ WebSocket closed:", event.code, event.reason);
        this.isConnecting = false;

        // Don't try to reconnect if the token is invalid
        if (event.code === 4001) {
          console.error('Authentication failed - invalid token');
          return;
        }

        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.scheduleReconnect();
        } else {
          console.error('Max reconnection attempts reached');
        }
      };

      this.socket.onerror = (event: Event): void => {
        console.error("❌ WebSocket error:", event);
        this.isConnecting = false;
        this.socket?.close();
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
      this.isConnecting = false;
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimeout || !this.accessToken || !this.userId) return;

    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    console.log(`Attempting to reconnect in ${delay}ms... (attempt ${this.reconnectAttempts + 1}/${this.maxReconnectAttempts})`);

    this.reconnectTimeout = setTimeout(() => {
      if (this.accessToken && this.userId) {
        this.connect(this.accessToken, this.userId);
      }
    }, delay);
  }

  public sendMessage(message: MessageOut): void {
    console.log('Sending message:', message);
    this.send(message);
  }

  public sendPresence(receiverId: string, status: 'online' | 'away' | 'offline'): void {
    if (!this.userId) {
      console.error('Cannot send presence: userId not set');
      return;
    }
    this.send({
      action: "presence",
      sender_id: this.userId, // Fixed: use userId instead of accessToken
      receiver_id: receiverId,
      content: status,
    });
  }

  private handlePresenceUpdate(senderId: string, status: string): void {
    // Clear any existing timeout for this user
    if (this.presenceTimeouts[senderId]) {
      clearTimeout(this.presenceTimeouts[senderId]);
      delete this.presenceTimeouts[senderId];
    }

    // Notify all message handlers about the presence update
    const presenceMessage = {
      action: 'presence' as const,
      sender_id: senderId,
      content: status as 'online' | 'away' | 'offline',
      receiver_id: ''
    };

    this.messageHandlers.forEach(handler => handler(presenceMessage));

    if (status === 'online') {
      // Set timeout to mark as away after 30 seconds of inactivity
      this.presenceTimeouts[senderId] = setTimeout(() => {
        this.handlePresenceUpdate(senderId, 'away');
      }, 30000);
    }
  }

  public sendTyping(receiverId: string): void {
    if (!this.userId) {
      console.error('Cannot send typing: userId not set');
      return;
    }
    this.send({
      action: "typing",
      sender_id: this.userId,
      is_typing: true
    });
  }

  public sendRead(receiverId: string): void {
    if (!this.userId) {
      console.error('Cannot send read receipt: userId not set');
      return;
    }
    this.send({
      action: "read",
      sender_id: this.userId,
      receiver_id: receiverId
    });
  }

  public send(data: any): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      try {
        console.log('Sending data:', data);
        this.socket.send(JSON.stringify(data));
      } catch (err) {
        console.error("❌ Failed to stringify message:", err, data);
      }
    } else {
      console.warn("⚠️ Cannot send, socket not connected");
    }
  }

  public onMessage(handler: (data: any) => void): void {
    this.messageHandlers.push(handler);
  }

  public offMessage(handler: (data: any) => void): void {
    this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.onclose = null; // Prevent reconnection on manual disconnect
      this.socket.close();
      this.socket = null;
    }
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    this.isConnecting = false;
    this.reconnectAttempts = 0;
  }
}

export const chatSocket = new ChatSocket();