// src/communication/chatSocket.ts
export interface MessageBase {
  receiver_id: string;
  content?: string;
  action: "message" | "typing" | "read";
}

export interface MessageOut {
  sender_id: string;
  receiver_id: string;
  content: string;
  timestamp: string;
  is_read: boolean;
}

class ChatSocket {
  private socket: WebSocket | null = null;
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
  private messageHandlers: ((data: any) => void)[] = [];
  private accessToken: string | null = null;
  private isConnecting: boolean = false;
  private reconnectAttempts: number = 0;
  private readonly maxReconnectAttempts: number = 5;

  public connect(accessToken: string): void {
    if (this.isConnecting || this.socket?.readyState === WebSocket.OPEN) {
      console.log('WebSocket already connected or connecting');
      return;
    }

    this.isConnecting = true;
    this.accessToken = accessToken;
    
    try {
      // Construct WebSocket URL with token
      const baseUrl = `wss://fastapi-app-61yp.onrender.com/api/auth/chat/ws?token=${accessToken}`;
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
    if (this.reconnectTimeout || !this.accessToken) return;
    
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000); // Exponential backoff with max 30s
    console.log(`Attempting to reconnect in ${delay}ms... (attempt ${this.reconnectAttempts + 1}/${this.maxReconnectAttempts})`);
    
    this.reconnectTimeout = setTimeout(() => {
      if (this.accessToken) {
        this.connect(this.accessToken);
      }
    }, delay);
  }

  public sendMessage(receiverId: string, content: string): void {
    this.send({ receiver_id: receiverId, content, action: "message" });
  }

  public sendTyping(receiverId: string): void {
    this.send({ receiver_id: receiverId, action: "typing" });
  }

  public sendRead(receiverId: string): void {
    this.send({ receiver_id: receiverId, action: "read" });
  }

  private send(data: MessageBase): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      // Format the message according to the required structure
      const message = {
        action: data.action,
        receiver_id: data.receiver_id,
        ...(data.content && { content: data.content }) // Only include content if it exists
      };
      this.socket.send(JSON.stringify(message));
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
