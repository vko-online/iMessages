import { useRealm } from './index'
import { User } from './schema'

export default async function startSeed (): Promise<void> {
  const realm = useRealm()

  const existingUsers = realm.objects<User>('User')
  if (existingUsers.length === 0) {
    // add data to realm
    realm.write(() => {
      realm.create('User', { name: 'Alice', messages: [], conversations: [] })
      realm.create('User', { name: 'Jasper', messages: [], conversations: [] })
      realm.create('User', { name: 'Maggie', messages: [], conversations: [] })
      realm.create('User', { name: 'Sophie', messages: [], conversations: [] })
    })
  }
}
