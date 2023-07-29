import { systemText } from '@/constants/Colors'
import { useAuth } from '@/context/auth'
import { Ionicons } from '@expo/vector-icons'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Link, Stack, useRouter } from 'expo-router'
import { Alert, Button, useColorScheme } from 'react-native'
import { ContextMenuButton } from 'react-native-ios-context-menu'

// eslint-disable-next-line
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index'
}

export default function AppLayout (): JSX.Element {
  const colorScheme = useColorScheme()
  const router = useRouter()
  const { signOut } = useAuth()
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
                    void signOut()
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
