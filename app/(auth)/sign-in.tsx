import { Button, StyleSheet } from 'react-native'
import { useAuth } from '@/context/auth'
import { Text, View } from '@/components/Themed'
import { useEffect } from 'react'
import { useRealm } from '@/services/realm'
import { User } from '@/services/realm/schema'

export default function SignIn (): JSX.Element {
  const { signIn } = useAuth()
  const realm = useRealm()

  useEffect(() => {
    const existingUsers = realm.objects<User>('User')
    if (existingUsers.length === 0) {
      // add data to realm
      realm.write(() => {
        realm.create('User', { _id: new Realm.BSON.ObjectId(), name: 'Alice', messages: [], conversations: [] })
        realm.create('User', { _id: new Realm.BSON.ObjectId(), name: 'Jasper', messages: [], conversations: [] })
        realm.create('User', { _id: new Realm.BSON.ObjectId(), name: 'Maggie', messages: [], conversations: [] })
        realm.create('User', { _id: new Realm.BSON.ObjectId(), name: 'Sophie', messages: [], conversations: [] })
      })
    }
  }, [realm])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Auth</Text>
      <Button
        title='Sign In Anonymously' onPress={() => {
          void signIn()
        }}
      />
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
