export interface MessageBase {
  receiver_id: string;
  content?: string;
  action: "message" | "typing" | "read";
}

export interface MessageOut {
  sender_id: string;
  receiver_id: string;
  content: string;
  timestamp: string; // ISO from backend
  is_read: boolean;
}

class ChatSocket {
  private socket: WebSocket | null = null;
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
  private messageHandlers: ((data: any) => void)[] = [];
  private userId: string | null = null;

  connect(userId: string) {
    if (!userId) {
      console.error("❌ No userId provided for WebSocket connection");
      return;
    }

    this.userId = userId;
    const baseUrl = `ws://localhost:8000/api/auth/chat/ws/${userId}`;
    this.socket = new WebSocket(baseUrl);

    this.socket.onopen = () => {
      console.log("✅ WebSocket connected:", baseUrl);
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = null;
      }
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.messageHandlers.forEach((fn) => fn(data));
      } catch (err) {
        console.error("❌ Failed to parse message:", err);
      }
    };

    this.socket.onclose = () => {
      console.warn("⚠️ WebSocket closed. Reconnecting...");
      this.scheduleReconnect();
    };

    this.socket.onerror = (err) => {
      console.error("❌ WebSocket error:", err);
      this.socket?.close();
    };
  }

  private scheduleReconnect() {
    if (this.reconnectTimeout) return;
    this.reconnectTimeout = setTimeout(() => {
      if (this.userId) {
        this.connect(this.userId);
      }
    }, 3000);
  }

  sendMessage(receiverId: string, content: string) {
    const msg: MessageBase = {
      receiver_id: receiverId,
      content,
      action: "message",
    };
    this.send(msg);
  }

  sendTyping(receiverId: string) {
    const msg: MessageBase = {
      receiver_id: receiverId,
      action: "typing",
    };
    this.send(msg);
  }

  sendRead(receiverId: string) {
    const msg: MessageBase = {
      receiver_id: receiverId,
      action: "read",
    };
    this.send(msg);
  }

  private send(data: MessageBase) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.warn("⚠️ Cannot send, socket not connected");
    }
  }

  onMessage(handler: (data: any) => void) {
    this.messageHandlers.push(handler);
  }

  offMessage(handler: (data: any) => void) {
    this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }
}

export const chatSocket = new ChatSocket();
