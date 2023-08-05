import { FlatList } from 'react-native'
import { Divider } from '@rneui/themed'

import ConversationItem from '@/components/ConversationItem'
import { Conversation } from '@/services/realm/schema'
import { useQuery, useRealm } from '@/services/realm'
import { useUser } from '@realm/react'
import { useEffect } from 'react'

// const { height: windowHeight } = Dimensions.get('window')

export default function Screen (): JSX.Element {
  const rawConversations = useQuery(Conversation)
  const currentUser = useUser()
  const realm = useRealm()

  const conversations = rawConversations

  useEffect(() => {
    let subscription: Realm.App.Sync.Subscription
    async function addSubscription (): Promise<void> {
      await realm.subscriptions.update((mutableSubs, realm) => {
        // Create subscription for filtered results.
        subscription = mutableSubs.add(realm.objects<Conversation>('Conversation'))
      })
    }
    void addSubscription()
    return () => {
      if (subscription != null) {
        void realm.subscriptions.update((mutableSubs) => {
          mutableSubs.removeSubscription(subscription)
        })
      }
    }
  }, [realm, currentUser.id])

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
