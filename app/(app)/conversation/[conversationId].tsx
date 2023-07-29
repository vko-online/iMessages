import { FlatList, StyleSheet } from 'react-native'

import { View } from '@/components/Themed'
import { useLocalSearchParams } from 'expo-router'
import { findConversationById } from '@/data/messages'
import MessageItem from '@/components/MessageItem'

export default function Screen (): JSX.Element {
  const { conversationId } = useLocalSearchParams<{ conversationId: string }>()
  const conversation = findConversationById(conversationId)
  return (
    <View style={styles.container}>
      <FlatList
        data={conversation?.messages}
        renderItem={({ item }) => <MessageItem data={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
