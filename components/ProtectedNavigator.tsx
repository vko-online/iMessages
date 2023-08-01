import useProtectedRoute from '@/hooks/useProtectedRoute'
import { PropsWithChildren } from 'react'

export default function ProtectedNavigator (props: PropsWithChildren): JSX.Element {
  useProtectedRoute()
  return (
    <>
      {props.children}
    </>
  )
}
