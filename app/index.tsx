import { FlatList } from 'react-native'
import { Divider } from '@rneui/themed'

import ConversationItem from '@/components/ConversationItem'
import { Conversation } from '@/services/realm/schema'
import { useQuery } from '@/services/realm'
import { useUser } from '@realm/react'

// const { height: windowHeight } = Dimensions.get('window')

export default function Screen (): JSX.Element {
  const rawConversations = useQuery(Conversation)
  const currentUser = useUser()

  const conversations = rawConversations.filtered('@links.members._id == $0', currentUser.id)

  return (
    <FlatList
      data={conversations}
      // ListHeaderComponent={() => <SearchBar platform='ios' />}
      contentInsetAdjustmentBehavior='automatic'
      // stickyHeaderHiddenOnScroll
      // stickyHeaderIndices={[0]}
      // StickyHeaderComponent={(props) => <SearchBar platform='ios' {...props} />}
      renderItem={({ item }) => <ConversationItem data={item} />}
      keyExtractor={(item) => item._id.toHexString()}
      ItemSeparatorComponent={() => <Divider style={{ height: 1 }} />}
    />
  )
}
