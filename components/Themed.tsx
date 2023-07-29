/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { useColorScheme, View as DefaultView } from 'react-native'
import { Text as DefaultText, TextProps as DefaultTextProps } from '@rneui/themed'

import Colors from '@/constants/Colors'

interface ThemeProps {
  lightColor?: string
  darkColor?: string
}

export type TextProps = ThemeProps & DefaultTextProps
export type ViewProps = ThemeProps & DefaultView['props']

export function useThemeColor (
  props: { light?: string, dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
): string {
  const theme = useColorScheme() ?? 'light'
  const colorFromProps = props[theme]

  if (colorFromProps != null) {
    return colorFromProps
  } else {
    return Colors[theme][colorName]
  }
}

export function Text (props: TextProps): JSX.Element {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return <DefaultText style={[{ color }, style]} {...otherProps} />
}

export function View (props: ViewProps): JSX.Element {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}
