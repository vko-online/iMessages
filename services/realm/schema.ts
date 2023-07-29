import Realm from 'realm'

export class User extends Realm.Object<User> {
  _id!: Realm.BSON.ObjectId
  name!: string
  conversations!: Realm.List<Conversation>
  messages!: Realm.List<Message>
  static schema = {
    name: 'User',
    properties: {
      _id: 'objectId',
      name: 'string',
      conversations: 'Conversation[]',
      messages: 'Message[]'
    },
    primaryKey: '_id'
  }
}

export class Conversation extends Realm.Object<Conversation> {
  _id!: Realm.BSON.ObjectId
  lastMessageContent!: string
  lastMessageDate!: Date
  lastMessageAuthor!: string
  unreadCount!: number
  members!: Realm.List<User>
  messages!: Realm.List<Message>
  static schema = {
    name: 'Conversation',
    properties: {
      _id: 'objectId',
      lastMessageContent: 'string',
      lastMessageDate: 'date',
      lastMessageAuthor: 'string',
      unreadCount: 'int',
      members: 'User[]',
      messages: 'Message[]'
    },
    primaryKey: '_id'
  }
}

export class Message extends Realm.Object<Message> {
  _id!: Realm.BSON.ObjectId
  messageType!: string // MessageType
  createdAt!: Date
  content!: string
  conversation!: Realm.Results<Conversation>
  user!: Realm.Results<User>
  static schema = {
    name: 'Message',
    properties: {
      _id: 'objectId',
      messageType: 'string',
      createdAt: 'date',
      content: 'string',
      user: {
        type: 'linkingObjects',
        objectType: 'User',
        property: 'messages'
      },
      conversation: {
        type: 'linkingObjects',
        objectType: 'Conversation',
        property: 'messages'
      }
    },
    primaryKey: '_id'
  }
}
