import { Text, View, StyleSheet } from 'react-native'
import { useThemeColor } from './Themed'

interface Props {
  content: string
  date: Date
  isAuthor: boolean
}
export default function Bubble ({
  content,
  date,
  isAuthor
}: Props): JSX.Element {
  const backgroundColor = useThemeColor({ light: '#fff', dark: '#000' }, 'background')

  if (isAuthor) {
    return (
      <View
        style={{
          backgroundColor: '#dedede',
          padding: 10,
          // borderRadius: 5,
          marginTop: 5,
          left: 10,
          maxWidth: '50%',
          alignSelf: 'flex-start',
          // maxWidth: 500,
          // padding: 14,

          // alignItems:"center",
          borderRadius: 20
        }}
      >

        <Text style={{ fontSize: 16, color: '#000', justifyContent: 'center' }}>{content}</Text>
        <View style={styles.leftArrow} />
        <View style={[styles.leftArrowOverlap, { backgroundColor }]} />
      </View>
    )
  }
  return (
    <View
      style={{
        backgroundColor: '#0078fe',
        padding: 10,
        // marginLeft: '45%',
        right: 10,
        // borderRadius: 5,

        marginTop: 5,
        maxWidth: '50%',
        alignSelf: 'flex-end',
        borderRadius: 20
      }}
    >
      <Text style={{ fontSize: 16, color: '#fff' }}>{content}</Text>
      <View style={styles.rightArrow} />
      <View style={[styles.rightArrowOverlap, { backgroundColor }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  rightArrow: {
    position: 'absolute',
    backgroundColor: '#0078fe',
    // backgroundColor:"red",
    width: 20,
    height: 20,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -10
  },

  rightArrowOverlap: {
    position: 'absolute',
    backgroundColor: '#eeeeee',
    // backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20

  },

  /* Arrow head for recevied messages */
  leftArrow: {
    position: 'absolute',
    backgroundColor: '#dedede',
    // backgroundColor:"red",
    width: 20,
    height: 20,
    bottom: 0,
    borderBottomRightRadius: 25,
    left: -10
  },

  leftArrowOverlap: {
    position: 'absolute',
    // backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomRightRadius: 18,
    left: -20

  }
})
