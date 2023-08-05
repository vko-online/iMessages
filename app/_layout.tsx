import 'react-native-get-random-values'
import { REALM_APP_ID, RealmProvider, useRealm } from '@/services/realm'
import { Realm, AppProvider, UserProvider, useApp } from '@realm/react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { Link, SplashScreen, Stack, useRouter } from 'expo-router'
import { useEffect } from 'react'
import SignIn from '@/components/SignIn'
import Loading from '@/components/Loading'
import { systemText } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native'
import { useColorScheme, Alert, Button } from 'react-native'
import { ContextMenuButton } from 'react-native-ios-context-menu'
import { User } from '@/services/realm/schema'
import { useCreateUser } from '@/services/realm/hooks'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router'

// eslint-disable-next-line
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index'
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout (): JSX.Element | null {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error != null) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <UserProvider fallback={SignIn}>
        <RealmProvider
          sync={{
            flexible: true,
            initialSubscriptions: {
              update (subs, realm) {
                subs.add(realm.objects('User'))
                subs.add(realm.objects('Conversation'))
                subs.add(realm.objects('Message'))
              }
            },
            onError: (_, error) => {
              console.error(error)
            }
          }}
          fallback={Loading}
        >
          <AppLayout />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  )
}

function AppLayout (): JSX.Element {
  const colorScheme = useColorScheme()
  const router = useRouter()
  const app = useApp()
  const realm = useRealm()
  useCreateUser()
  useEffect(() => {
    let subscription: Realm.App.Sync.Subscription
    async function addSubscription (): Promise<void> {
      await realm.subscriptions.update((mutableSubs, realm) => {
        // Create subscription for filtered results.
        subscription = mutableSubs.add(realm.objects<User>('User'))
      })
    }
    void addSubscription()
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
    return () => {
      if (subscription != null) {
        void realm.subscriptions.update((mutableSubs) => {
          mutableSubs.removeSubscription(subscription)
        })
      }
    }
  }, [realm])
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName='index'>
        <Stack.Screen
          name='index' options={{
            headerLargeTitle: true,
            title: 'Messages',
            headerLeft: () => (
              <ContextMenuButton
                isMenuPrimaryAction
                menuConfig={{
                  type: 'menu',
                  menuTitle: '',
                  menuItems: [{
                    actionKey: 'key-01',
                    actionTitle: 'Select Messages',
                    icon: {
                      type: 'IMAGE_SYSTEM',
                      imageValue: {
                        systemName: 'checkmark.circle'
                      }
                    }
                  }, {
                    actionKey: 'key-02',
                    actionTitle: 'Edit Pins',
                    icon: {
                      type: 'IMAGE_SYSTEM',
                      imageValue: {
                        systemName: 'pin'
                      }
                    }
                  }, {
                    actionKey: 'key-03',
                    actionTitle: 'Edit Name and Photo',
                    icon: {
                      type: 'IMAGE_SYSTEM',
                      imageValue: {
                        systemName: 'person.crop.circle'
                      }
                    }
                  }, {
                    menuTitle: '',
                    // Create an "Inline submenu" by adding `displayInline`
                    // in the menu options...
                    menuOptions: ['displayInline'],
                    menuItems: [{
                      actionKey: 'key-01-01',
                      actionTitle: 'Show Recently Deleted',
                      icon: {
                        type: 'IMAGE_SYSTEM',
                        imageValue: {
                          systemName: 'trash'
                        }
                      }
                    }, {
                      actionKey: 'action-logout',
                      actionTitle: 'Sign Out',
                      menuOptions: ['destructive'],
                      icon: {
                        type: 'IMAGE_SYSTEM',
                        imageValue: {
                          systemName: 'person.crop.circle.badge.xmark'
                        }
                      }
                    }]
                  }]
                }}
                onPressMenuItem={({ nativeEvent }) => {
                  if (nativeEvent.actionKey === 'action-logout') {
                    void app.currentUser?.logOut()
                    return
                  }
                  Alert.alert(
                    'onPressMenuItem Event',
                `actionKey: ${nativeEvent.actionKey} - actionTitle: ${nativeEvent.actionTitle}`
                  )
                }}
              >
                <Button title='Edit' />
              </ContextMenuButton>
            ),
            headerRight: () => (
              <Link href='/start-conversation'>
                <Ionicons size={24} name='create-outline' color={systemText} />
              </Link>
            )
          }}
        />
        <Stack.Screen name='conversation/[conversationId]' options={{ title: 'Chat' }} />
        {/* <Stack.Screen name='modal' options={{ presentation: 'modal' }} /> */}
        <Stack.Screen
          name='start-conversation'
          options={{
            presentation: 'formSheet',
            title: 'New Message',
            headerRight: () => <Button title='Cancel' onPress={() => router.back()} />
          }}
        />
      </Stack>
    </ThemeProvider>
  )
}
