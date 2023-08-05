import { MessageInput } from '@/types'
import { useCallback, useEffect } from 'react'
import { useUser } from '@realm/react'
import { useRealm } from './index'
import { User, Message, Conversation } from './schema'

type UseDeleteMessageResult = [handleSend: (messageId: string) => void]
export function useDeleteMessage (): UseDeleteMessageResult {
  const realm = useRealm()

  const handleDelete = useCallback((messageId: string) => {
    realm.write(() => {
      realm.delete(realm.objectForPrimaryKey<Message>('Message', messageId))
    })
  }, [realm])

  return [handleDelete]
}

type UseStartConversation = [handleStart: (msg: MessageInput) => void]
export function useStartConversation (otherMemberIds: string[]): UseStartConversation {
  const realm = useRealm()
  const user = useUser()

  const handleStart = useCallback((msg: MessageInput) => {
    realm.write(() => {
      const owner = realm.objectForPrimaryKey<User>('User', new Realm.BSON.ObjectId(user.id))
      if (owner != null) {
        const messageResult = realm.create<Message>('Message', {
          _id: new Realm.BSON.ObjectId(),
          content: msg.content,
          createdAt: new Date(),
          messageType: 'TEXT',
          user: owner
        })
        realm.create<Conversation>('Conversation', {
          lastMessageAuthor: messageResult.user.name,
          lastMessageContent: messageResult.content,
          lastMessageDate: messageResult.createdAt,
          unreadCount: 0,
          members: [...otherMemberIds, user.id]
        })
      } else {
        throw new Error('User not found')
      }
    })
  }, [realm, user, otherMemberIds])

  return [handleStart]
}

type UseSendMessageResult = [handleSend: (msg: MessageInput) => void]
export function useSendMessage (conversationId: string): UseSendMessageResult {
  const realm = useRealm()
  const user = useUser()

  const handleSend = useCallback((msg: MessageInput) => {
    realm.write(() => {
      const owner = realm.objectForPrimaryKey<User>('User', new Realm.BSON.ObjectId(user.id))
      if (owner != null) {
        const messageResult = realm.create<Message>('Message', {
          _id: new Realm.BSON.ObjectId(),
          content: msg.content,
          createdAt: new Date(),
          messageType: 'TEXT',
          user: owner
        })
        const conversation = realm.objectForPrimaryKey<Conversation>('Conversation', conversationId)
        if (conversation != null) {
          conversation.lastMessageAuthor = messageResult.user.name
          conversation.lastMessageContent = messageResult.content
          conversation.lastMessageDate = messageResult.createdAt
        } else {
          throw new Error('conversation not found')
        }
      } else {
        throw new Error('User not found')
      }
    })
  }, [realm, user, conversationId])

  return [handleSend]
}

export function useCreateUser (): void {
  const realm = useRealm()
  const user = useUser()

  const handleCreate = useCallback(() => {
    realm.write(() => {
      realm.create<User>('User', {
        _id: new Realm.BSON.ObjectId(user.id),
        name: user.profile.name ?? 'Anonymous',
        conversations: [],
        messages: []
      })
    })
  }, [realm, user])

  useEffect(() => {
    const existing = realm.objectForPrimaryKey<User>('User', new Realm.BSON.ObjectId(user.id))
    if (existing == null) {
      handleCreate()
    }
  }, [user.id, handleCreate, realm])
}
