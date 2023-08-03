import { FlatList, KeyboardAvoidingView, StyleSheet } from 'react-native'

import { useThemeColor } from '@/components/Themed'
import { useLocalSearchParams } from 'expo-router'
import MessageItem from '@/components/MessageItem'
import Composer from '@/components/Composer'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSendMessage } from '@/services/realm/hooks'
import { MessageType } from '@/types'
import { useCallback } from 'react'
import { Message } from '@/services/realm/schema'
import { useQuery } from '@/services/realm'

export default function Screen (): JSX.Element {
  const { conversationId } = useLocalSearchParams<{ conversationId: string }>()
  const backgroundColor = useThemeColor({ light: '#fff', dark: '#000' }, 'background')
  const [onSendMessage] = useSendMessage(conversationId)
  const rawMessages = useQuery(Message)

  const messages = rawMessages.filtered('@links.conversation._id == $0', conversationId)

  const handleSendMessage = useCallback((text: string) => {
    onSendMessage({
      content: text,
      files: [],
      type: MessageType.TEXT
    })
  }, [onSendMessage])

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={65} behavior='padding' style={[s.keyboardView, { backgroundColor }]}>
      <FlatList
        data={messages}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item }) => <MessageItem data={item} />}
        keyExtractor={(item) => item._id.toHexString()}
      />
      <SafeAreaView edges={['bottom']}>
        <Composer onSend={handleSendMessage} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const s = StyleSheet.create({
  keyboardView: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
