import { Button, StyleSheet } from 'react-native'
import { Text, View } from '@/components/Themed'
import { useCallback } from 'react'
import { useApp } from '@realm/react'

export default function SignIn (): JSX.Element {
  const app = useApp()

  const handleLogin = useCallback(async () => {
    const credentials = Realm.Credentials.anonymous()
    await app.logIn(credentials)
  }, [app])

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
