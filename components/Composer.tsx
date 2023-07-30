import { StyleSheet, TouchableOpacity } from 'react-native'

import { View, useThemeColor } from '@/components/Themed'
import { MessageInput } from '@/types'
import { Input } from '@rneui/themed'
import { Ionicons } from '@expo/vector-icons'
import { systemIcon } from '@/constants/Colors'

interface ComposerProps {
  onSend: (msg: MessageInput) => void
}
export default function Composer ({ onSend }: ComposerProps): JSX.Element {
  const color = useThemeColor({ light: '#000', dark: '#fff' }, 'text')
  return (
    <View style={s.composer}>
      <View style={s.actions}>
        <TouchableOpacity style={s.action}>
          <Ionicons color={systemIcon} name='camera-outline' size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={s.action}>
          <Ionicons color={systemIcon} name='logo-apple-appstore' size={30} />
        </TouchableOpacity>
      </View>
      <Input
        containerStyle={s.inputContainer}
        inputContainerStyle={s.input}
        inputStyle={{ color }}
        errorStyle={s.error}
        underlineColorAndroid='transparent'
        rightIcon={<Ionicons color={systemIcon} name='arrow-up-circle' size={30} />}
      />
    </View>
  )
}

const s = StyleSheet.create({
  composer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actions: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  action: {
    marginLeft: 10
  },
  inputContainer: {
    flex: 1,
    padding: 0
  },
  input: {
    height: 40,
    paddingLeft: 10,
    // margin: 0,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#aaa'
  },
  error: {
    height: 0,
    margin: 0
  }
})
