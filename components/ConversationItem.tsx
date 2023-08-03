import { StyleSheet, Dimensions } from 'react-native'

import { Text, View, useThemeColor } from '@/components/Themed'
import { Conversation } from '@/services/realm/schema'
import { Avatar, ListItem } from '@rneui/themed'
import { Link } from 'expo-router'

const { width } = Dimensions.get('screen')

interface ConversationItemProps {
  data: Conversation
}
export default function ConversationItem ({ data }: ConversationItemProps): JSX.Element {
  const backgroundColor = useThemeColor({ light: '#fff', dark: '#000' }, 'background')
  const color = useThemeColor({ light: '#000', dark: '#fff' }, 'text')

  return (
    <Link href={`/(app)/conversation/${data._id.toHexString()}`}>
      <ListItem containerStyle={{ backgroundColor }} style={[s.item]}>
        <Avatar
          rounded
          source={{ uri: 'https://randomuser.me/api/portraits/men/33.jpg' }}
        />
        <ListItem.Content style={{ backgroundColor }}>
          <View style={s.itemHeader}>
            <ListItem.Title style={{ flex: 1, color }}>
              {data.lastMessageAuthor}
            </ListItem.Title>
            <Text>Wednesday</Text>
            <ListItem.Chevron />
          </View>
          <ListItem.Subtitle style={{ color }} numberOfLines={2}>
            {data.lastMessageContent}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      {/* <View style={s.item}>
        <Avatar rounded title={data.lastMessageAuthor.slice(0, 1)} containerStyle={{ backgroundColor: 'blue' }} />
        <View style={s.itemBody}>
          <View style={s.itemHeader}>
            <Text h4>{data.lastMessageAuthor}</Text>
            <View style={s.itemDate}>
              <Text>Wednesday</Text>
              <Ionicons size={18} name='chevron-forward' />
            </View>
          </View>
          <Text numberOfLines={2}>{data.lastMessageContent}</Text>
        </View>
      </View> */}
    </Link>
  )
}

const s = StyleSheet.create({
  item: {
    width
  },
  itemAvatar: {
    backgroundColor: 'blue'
  },
  itemHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemBody: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column'
  },
  itemDate: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  row: {
    alignSelf: 'stretch',
    flexDirection: 'column'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
