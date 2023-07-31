import Realm, { DefaultFunctionsFactory, DefaultUserProfileData, User } from 'realm'
import { createRealmContext } from '@realm/react'
import { Conversation, Message, User as UserSchema } from './schema'

export const REALM_APP_ID = 'application-0-xwdnz'
export const realmApp = new Realm.App({
  id: REALM_APP_ID
})

export const realmConfig: Realm.Configuration = {
  schema: [Conversation, Message, UserSchema],
  // sync crashes when user is not logged in
  // Error: Exception in HostFunction: Cannot write to class User when no flexible sync subscription has been created.

  sync: {
    user: realmApp.currentUser as User<DefaultFunctionsFactory, SimpleObject, DefaultUserProfileData>,
    flexible: true,
    initialSubscriptions: {
      update (subs, realm) {
        subs.add(realm.objects<Conversation>('Conversation'))
        subs.add(realm.objects<Message>('Message'))
        subs.add(realm.objects<UserSchema>('User'))
      }
    }
  }
}
export const { RealmProvider, useRealm, useObject, useQuery } =
  createRealmContext(realmConfig)
