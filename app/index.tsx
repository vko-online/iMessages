import { FlatList } from 'react-native'
import { Divider } from '@rneui/themed'

import { conversations } from '@/data/messages'
import ConversationItem from '@/components/ConversationItem'
import { Conversation } from '@/services/realm/schema'
import { useQuery } from '@/services/realm'
import { useUser } from '@realm/react'

// const { height: windowHeight } = Dimensions.get('window')

export default function Screen (): JSX.Element {
  const _conversations = useQuery(Conversation)
  const currentUser = useUser()

  console.log('_conversations', _conversations)
  console.log('currentUser', currentUser)

  return (
    <FlatList
      data={conversations}
      // ListHeaderComponent={() => <SearchBar platform='ios' />}
      contentInsetAdjustmentBehavior='automatic'
      // stickyHeaderHiddenOnScroll
      // stickyHeaderIndices={[0]}
      // StickyHeaderComponent={(props) => <SearchBar platform='ios' {...props} />}
      renderItem={({ item }) => <ConversationItem data={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <Divider style={{ height: 1 }} />}
    />
  )
}
