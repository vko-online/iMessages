import { Button, StyleSheet } from 'react-native'
import { Text, View } from '@/components/Themed'
import { useCallback, useEffect } from 'react'
import { useRealm } from '@/services/realm'
import { User } from '@/services/realm/schema'
import { useApp } from '@realm/react'

export default function SignIn (): JSX.Element {
  const app = useApp()
  const realm = useRealm()

  const handleLogin = useCallback(async () => {
    const credentials = Realm.Credentials.anonymous()
    await app.logIn(credentials)
  }, [app])

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
        title='Sign In Anonymously'
        onPress={() => {
          void handleLogin()
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
