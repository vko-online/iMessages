import { REALM_APP_ID, RealmProvider } from '@/services/realm'
import { AppProvider, UserProvider } from '@realm/react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { Slot, SplashScreen } from 'expo-router'
import { useEffect } from 'react'
import 'react-native-get-random-values'
import ProtectedNavigator from '@/components/ProtectedNavigator'
import SignIn from '@/components/SignIn'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router'

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
        <RealmProvider>
          {/* <ProtectedNavigator> */}
          <Slot />
          {/* </ProtectedNavigator> */}
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  )
}
