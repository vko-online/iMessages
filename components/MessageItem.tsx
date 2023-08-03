
import { View } from '@/components/Themed'
import { Message } from '@/services/realm/schema'
import Bubble from './Bubble'
import { useUser } from '@realm/react'

interface MessageItemProps {
  data: Message
}
export default function MessageItem ({ data }: MessageItemProps): JSX.Element {
  const currentUser = useUser()
  const author = data.user[0]
  return (
    <View>
      {/* <Text style={styles.title}>{data.content}</Text> */}
      <Bubble content={data.content} isAuthor={author._id.equals(currentUser.id)} date={data.createdAt} />
    </View>
  )
}
