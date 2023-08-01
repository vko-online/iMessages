import Realm from 'realm'
import { createRealmContext } from '@realm/react'
import { Conversation, Message, User as UserSchema } from './schema'

export const REALM_APP_ID = 'application-0-xwdnz'

export const realmConfig: Realm.Configuration = {
  schema: [Conversation, Message, UserSchema]
}
export const { RealmProvider, useRealm, useObject, useQuery } =
  createRealmContext(realmConfig)
