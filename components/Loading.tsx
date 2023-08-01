import { ActivityIndicator, StyleSheet } from 'react-native'
import { View } from './Themed'

export default function Loading (): JSX.Element {
  return (
    <View style={s.activityContainer}>
      <ActivityIndicator size='large' />
    </View>
  )
}

const s = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
