
import { View } from '@/components/Themed'
import { Message } from '@/services/realm/schema'
import Bubble from './Bubble'
import { useUser } from '@realm/react'

interface MessageItemProps {
  data: Message
}
export default function MessageItem ({ data }: MessageItemProps): JSX.Element {
  const currentUser = useUser()
  return (
    <View>
      {/* <Text style={styles.title}>{data.content}</Text> */}
      <Bubble content={data.content} isAuthor={data.user._id.equals(currentUser.id)} date={data.createdAt} />
    </View>
  )
}
