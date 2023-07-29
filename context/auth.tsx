import { router, useRootNavigationState, useSegments } from 'expo-router'
import React, { PropsWithChildren, useEffect } from 'react'
import { realmApp, signInAnonymously, signOut } from '@/services/realm'

const AuthContext = React.createContext<IAuthContext>({
  signIn: async () => await Promise.resolve(),
  signOut: async () => await Promise.resolve(),
  user: null
})

interface IAuthContext {
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  user: typeof realmApp.currentUser | null
}

// This hook can be used to access the user info.
export function useAuth (): IAuthContext {
  return React.useContext(AuthContext)
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute (user: typeof realmApp.currentUser): void {
  const rootSegment = useSegments()[0]
  const navigationState = useRootNavigationState()

  React.useEffect(() => {
    if (navigationState?.key == null) return
    // if (user == null) return
    const loggedIn = user?.isLoggedIn === true

    console.log('loggedIn', loggedIn)
    console.log('rootSegment', rootSegment)
    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !loggedIn &&
      rootSegment !== '(auth)'
    ) {
      // Redirect to the sign-in page.
      console.log('cakked')
      // signInAnonymously()
      router.replace('/sign-in')
    } else if (loggedIn && rootSegment !== '(app)') {
      // Redirect away from the sign-in page.
      router.replace('/')
    }
  }, [user, rootSegment, navigationState])
}

export function AuthProvider (props: PropsWithChildren): JSX.Element {
  const [currentUser, setCurrentUser] = React.useState<typeof realmApp.currentUser | null>(null)
  useProtectedRoute(currentUser)
  // useEffect(() => {
  //   if (currentUser !== realmApp.currentUser) {
  //     setCurrentUser(realmApp.currentUser)
  //   }
  // }, [realmApp.currentUser])

  useEffect(() => {
    if (realmApp.currentUser !== currentUser) {
      setCurrentUser(realmApp.currentUser)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signIn: async () => {
          const user = await signInAnonymously()
          setCurrentUser(user)
        },
        signOut: async () => {
          await signOut()
          setCurrentUser(null)
        },
        user: currentUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
