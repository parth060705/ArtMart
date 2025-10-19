# Chat System Architecture

## Overview
The chat system provides real-time messaging between users with features like typing indicators, read receipts, and online status. It's built using WebSockets for real-time communication and REST APIs for initial data loading.

## Key Components

### 1. useChat Hook
- **Location**: `src/hooks/chat/useChat.tsx`
- **Purpose**: Manages chat state, WebSocket connections, and message handling
- **Features**:
  - Real-time message sending/receiving
  - Typing indicators
  - Online/offline status
  - Message status tracking (sending/sent/delivered/read)
  - Automatic reconnection

### 2. Chat Component
- **Location**: `src/pages/chat/Chat.tsx`
- **Purpose**: Renders the chat interface and handles user interactions
- **Features**:
  - Message display with different styling for sent/received messages
  - Typing indicators
  - Online status display
  - Message input with emoji support
  - Auto-scrolling to latest message

### 3. ChatList Component
- **Location**: `src/pages/chat/ChatList.tsx`
- **Purpose**: Displays list of conversations
- **Features**:
  - List of conversations with last message preview
  - Unread message indicators
  - Timestamp formatting
  - Online status indicators

## Data Flow
1. On page load, `ChatList` fetches the list of conversations
2. When a chat is opened, `Chat` component loads message history via `useGetChatHistory`
3. `useChat` hook establishes WebSocket connection for real-time updates
4. Messages are sent/received through WebSockets
5. UI updates in real-time as messages are sent/received

## Message Status Lifecycle
1. `sending` - Message is being sent
2. `sent` - Message has been sent to server
3. `delivered` - Message has been delivered to recipient
4. `read` - Recipient has read the message

## Error Handling
- Failed messages are marked with `failed` status
- Automatic reconnection on network issues
- Error boundaries for component-level error handling
