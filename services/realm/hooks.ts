import { Message, MessageInput } from '@/types'
import { useCallback } from 'react'
import { useUser, useRealm } from '@realm/react'
import { Conversation } from './schema'

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
      const now = new Date()
      const messageResult = realm.create<Message>('Message', {
        authorId: user.id,
        authorName: user.profile.name,
        content: msg.content,
        createdAt: now,
        type: msg.type
      })
      realm.create<Conversation>('Conversation', {
        lastMessageAuthor: messageResult.authorName,
        lastMessageContent: messageResult.content,
        lastMessageDate: messageResult.createdAt,
        unreadCount: 0,
        members: [...otherMemberIds, user.id]
      })
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
      const now = new Date()
      const messageResult = realm.create<Message>('Message', {
        authorId: user.id,
        authorName: user.profile.name,
        content: msg.content,
        createdAt: now,
        type: msg.type
      })

      const conversation = realm.objectForPrimaryKey<Conversation>('Conversation', conversationId)
      if (conversation != null) {
        conversation.lastMessageAuthor = messageResult.authorName
        conversation.lastMessageContent = messageResult.content
        conversation.lastMessageDate = messageResult.createdAt
      } else {
        throw new Error('conversation not found')
      }
    })
  }, [realm, user, conversationId])

  return [handleSend]
}
