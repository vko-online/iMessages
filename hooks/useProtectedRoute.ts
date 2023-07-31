import { useApp } from '@realm/react'
import { useSegments, useRootNavigationState, router } from 'expo-router'
import { useCallback, useEffect } from 'react'

export default function useProtectedRoute (): void {
  const rootSegment = useSegments()[0]
  const app = useApp()
  const navigationState = useRootNavigationState()

  const handleAuthStateChange = useCallback(() => {
    const loggedIn = app.currentUser?.isLoggedIn === true
    if (!loggedIn && rootSegment !== '(auth)') {
      router.replace('/sign-in')
    } else if (loggedIn && rootSegment !== '(app)') {
      router.replace('/')
    }
  }, [app, rootSegment])

  useEffect(() => {
    app.addListener(handleAuthStateChange)

    return () => {
      app.removeListener(handleAuthStateChange)
    }
  }, [app, handleAuthStateChange])

  useEffect(() => {
    if (navigationState?.key == null) return // navigator not ready yet

    handleAuthStateChange()
  }, [navigationState, handleAuthStateChange])
}
