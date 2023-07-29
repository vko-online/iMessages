import { StyleSheet } from 'react-native'

import { View } from '@/components/Themed'
import { Message } from '@/types'
import Bubble from './Bubble'

interface MessageItemProps {
  data: Message
}
export default function MessageItem ({ data }: MessageItemProps): JSX.Element {
  return (
    <View>
      {/* <Text style={styles.title}>{data.content}</Text> */}
      <Bubble content={data.content} isAuthor={Math.random() > 0.5} date={new Date()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
})
