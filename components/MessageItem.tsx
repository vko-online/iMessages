
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
