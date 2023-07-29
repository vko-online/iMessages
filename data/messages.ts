import { MessageType, type Message, type Conversation } from '@/types'

export const messages: Message[] = [{
  authorId: '1',
  content: 'Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! ',
  createdAt: new Date(),
  files: [],
  id: '1',
  type: MessageType.TEXT,
  authorName: 'John Doe'
}, {
  authorId: '1',
  content: 'Another hello world!',
  createdAt: new Date(),
  files: [],
  id: '2',
  type: MessageType.TEXT,
  authorName: 'John Doe'
}, {
  authorId: '3',
  content: 'another random text',
  createdAt: new Date(),
  files: [],
  id: '3',
  type: MessageType.TEXT,
  authorName: 'John Doe'
}, {
  authorId: '3',
  content: 'some random text',
  createdAt: new Date(),
  files: [],
  id: '4',
  type: MessageType.TEXT,
  authorName: 'John Doe'
}, {
  authorId: '3',
  content: 'lorem ipsum dolor sit amet',
  createdAt: new Date(),
  files: [],
  id: '5',
  type: MessageType.TEXT,
  authorName: 'John Doe'
}]

export function findConversationById (id: string): Conversation | undefined {
  return conversations.find(conversation => conversation.id === id)
}
export const conversations: Conversation[] = [{
  id: '1',
  lastMessageAuthor: messages[0].authorName,
  lastMessageContent: messages[0].content,
  lastMessageCreatedAt: messages[0].createdAt,
  messages,
  unreadCount: 0
}, {
  id: '2',
  lastMessageAuthor: messages[0].authorName,
  lastMessageContent: messages[0].content,
  lastMessageCreatedAt: messages[0].createdAt,
  messages,
  unreadCount: 0
}, {
  id: '3',
  lastMessageAuthor: messages[0].authorName,
  lastMessageContent: messages[0].content,
  lastMessageCreatedAt: messages[0].createdAt,
  messages,
  unreadCount: 0
}, {
  id: '4',
  lastMessageAuthor: messages[0].authorName,
  lastMessageContent: messages[0].content,
  lastMessageCreatedAt: messages[0].createdAt,
  messages,
  unreadCount: 0
}, {
  id: '5',
  lastMessageAuthor: messages[0].authorName,
  lastMessageContent: messages[0].content,
  lastMessageCreatedAt: messages[0].createdAt,
  messages,
  unreadCount: 0
}, {
  id: '6',
  lastMessageAuthor: messages[0].authorName,
  lastMessageContent: messages[0].content,
  lastMessageCreatedAt: messages[0].createdAt,
  messages,
  unreadCount: 0
}, {
  id: '77',
  lastMessageAuthor: messages[0].authorName,
  lastMessageContent: messages[0].content,
  lastMessageCreatedAt: messages[0].createdAt,
  messages,
  unreadCount: 0
}, {
  id: '8',
  lastMessageAuthor: messages[0].authorName,
  lastMessageContent: messages[0].content,
  lastMessageCreatedAt: messages[0].createdAt,
  messages,
  unreadCount: 0
}, {
  id: '81',
  lastMessageAuthor: messages[0].authorName,
  lastMessageContent: messages[0].content,
  lastMessageCreatedAt: messages[0].createdAt,
  messages,
  unreadCount: 0
}, {
  id: '82',
  lastMessageAuthor: messages[0].authorName,
  lastMessageContent: messages[0].content,
  lastMessageCreatedAt: messages[0].createdAt,
  messages,
  unreadCount: 0
}, {
  id: '83',
  lastMessageAuthor: messages[0].authorName,
  lastMessageContent: messages[0].content,
  lastMessageCreatedAt: messages[0].createdAt,
  messages,
  unreadCount: 0
}, {
  id: '84',
  lastMessageAuthor: messages[0].authorName,
  lastMessageContent: messages[0].content,
  lastMessageCreatedAt: messages[0].createdAt,
  messages,
  unreadCount: 0
}, {
  id: '85',
  lastMessageAuthor: messages[0].authorName,
  lastMessageContent: messages[0].content,
  lastMessageCreatedAt: messages[0].createdAt,
  messages,
  unreadCount: 0
}]
