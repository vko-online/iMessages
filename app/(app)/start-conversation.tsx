import { StyleSheet } from 'react-native'

import { Text, View, useThemeColor } from '@/components/Themed'
import { ListItem, Avatar, Divider } from '@rneui/themed'
import { useQuery } from '@/services/realm'
import { useCallback, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { User } from '@/services/realm/schema'
import TagInput from '@/components/TagInput'

export default function StartConversationModalScreen (): JSX.Element {
  const [searchText, setSearchText] = useState<string>('')
  const [tags, setTags] = useState<readonly string[]>([])
  const users = useQuery<User>('User')
  const searchedUsers = searchText.length > 0 ? users.filtered('name CONTAINS[c] $0', searchText) : []
  const backgroundColor = useThemeColor({ light: '#fff', dark: '#000' }, 'background')
  const color = useThemeColor({ light: '#000', dark: '#fff' }, 'text')

  const handleChangeTags = (tgs: readonly string[]): void => {
    setTags(tgs)
    setSearchText('')
  }

  const handleChangeText = useCallback((text: string) => {
    setSearchText(text)

    const lastTyped = text.charAt(text.length - 1)
    const parseWhen = [',', ' ', ';', '\n']

    if (parseWhen.includes(lastTyped)) {
      setTags([...tags, text])
      setSearchText('')
    }
  }, [])
  return (
    <View style={s.container}>
      <View style={s.row}>
        <Text>To:</Text>
        {/* <Input
          style={{ color, margin: 0, padding: 0 }}
          underlineColorAndroid='transparent'
          errorStyle={s.error}
          value={searchText}
          onChangeText={setSearchText}
          inputContainerStyle={s.input}
          rightIcon={{ type: 'ionicons', name: 'add-circle-outline', color: systemText }}
        /> */}
        <TagInput
          value={tags}
          onChange={handleChangeTags}
          labelExtractor={(tag: string) => tag}
          text={searchText}
          onChangeText={handleChangeText}
          tagColor='#999'
          tagTextColor='#eee'
          inputProps={{
            keyboardType: 'default',
            autoFocus: true,
            style: {
              marginLeft: 5,
              fontSize: 14,
              marginVertical: 10
            }
          }}
          scrollViewProps={{
            horizontal: true,
            showsHorizontalScrollIndicator: false
          }}
          maxHeight={75}
        />
      </View>
      <FlatList
        data={searchedUsers.filter(v => !tags.includes(v.name))}
        renderItem={({ item }) => (
          <ListItem
            containerStyle={{ backgroundColor }} onPress={() => {
              handleChangeTags([...tags, item.name])
            }}
          >
            <Avatar
              rounded
              size={24}
              source={{ uri: 'https://randomuser.me/api/portraits/men/33.jpg' }}
            />
            <ListItem.Content>
              <ListItem.Title style={{ color }}>{item.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        )}
      />
      <Divider />
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    // flex: 1
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15
  },
  input: {
    borderBottomWidth: 0,
    padding: 0,
    margin: 0
  },
  error: {
    height: 0,
    margin: 0
  }
})
