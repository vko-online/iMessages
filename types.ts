export enum MessageType {
  TEXT,
  IMAGE,
  VIDEO,
  AUDIO,
  SYSTEM
}
export interface Message {
  id: string
  type: MessageType
  createdAt: Date
  content: string
  files: File[]
  authorId: string
  authorName: string
}
export interface Conversation {
  id: string
  lastMessageContent: string
  lastMessageCreatedAt: Date
  lastMessageAuthor: string
  unreadCount: number
  messages: Message[]
}
export interface MessageInput {
  type: MessageType
  content: string
  files: Blob[]
}
