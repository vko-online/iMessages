import { FlatList, KeyboardAvoidingView, StyleSheet } from 'react-native'

import { useThemeColor } from '@/components/Themed'
import { useLocalSearchParams } from 'expo-router'
import { findConversationById } from '@/data/messages'
import MessageItem from '@/components/MessageItem'
import Composer from '@/components/Composer'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Screen (): JSX.Element {
  const { conversationId } = useLocalSearchParams<{ conversationId: string }>()
  const conversation = findConversationById(conversationId)
  const backgroundColor = useThemeColor({ light: '#fff', dark: '#000' }, 'background')

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={65} behavior='padding' style={[s.keyboardView, { backgroundColor }]}>
      <FlatList
        data={conversation?.messages}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item }) => <MessageItem data={item} />}
        keyExtractor={(item) => item.id}
      />
      <SafeAreaView edges={['bottom']}>
        <Composer onSend={() => {}} />
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
