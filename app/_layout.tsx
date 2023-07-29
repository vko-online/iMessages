import { RealmProvider } from '@/services/realm'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { Slot, SplashScreen } from 'expo-router'
import { useEffect } from 'react'
import { AuthProvider } from '@/context/auth'
import 'react-native-get-random-values'

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
    <RealmProvider>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </RealmProvider>
  )
}
