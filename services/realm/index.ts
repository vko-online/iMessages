import Realm from 'realm'
import { createRealmContext } from '@realm/react'
import { Conversation, Message, User } from './schema'

export const realmApp = new Realm.App({
  id: 'application-0-xwdnz'
})
const credentials = Realm.Credentials.anonymous()

export async function signInAnonymously (): ReturnType<typeof realmApp.logIn> {
  return await realmApp.logIn(credentials)
}

export async function signOut (): Promise<void> {
  await realmApp.currentUser?.logOut()
}

export const realmConfig: Realm.Configuration = {
  schema: [Conversation, Message, User]
}
export const { RealmProvider, useRealm, useObject, useQuery } =
  createRealmContext(realmConfig)
