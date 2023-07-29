import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  StyleProp,
  ViewStyle,
  Platform,
  ScrollViewProps,
  TextStyle
} from 'react-native'

const windowWidth = Dimensions.get('window').width

interface RequiredProps<T> {
  /**
   * An array of tags, which can be any type, as long as labelExtractor below
   * can extract a string from it
   */
  value: readonly T[]
  /**
   * A handler to be called when array of tags change. The parent should update
   * the value prop when this is called if they want to enable removal of tags
   */
  onChange: (items: readonly T[]) => void
  /**
   * Function to extract string value for label from item
   */
  labelExtractor: (tagData: T) => string | React.ReactNode
  /**
   * The text currently being displayed in the TextInput following the list of
   * tags
   */
  text: string
  /**
   * This callback gets called when the user types in the TextInput. The parent
   * should update the text prop when this is called if they want to enable
   * input. This is also where any parsing to detect new tags should occur
   */
  onChangeText: (text: string) => void
}
interface OptionalProps {
  /**
   * If false, text input is not editable and existing tags cannot be removed.
   */
  editable?: boolean
  /**
   * Background color of tags
   */
  tagColor?: string
  /**
   * Text color of tags
   */
  tagTextColor?: string
  /**
   * Styling override for container surrounding tag text
   */
  tagContainerStyle?: StyleProp<ViewStyle>
  /**
   * Styling override for tag's text component
   */
  tagTextStyle?: StyleProp<ViewStyle>
  /**
   * Width override for text input's default width when it's empty and showing placeholder
   */
  inputDefaultWidth?: number
  /**
   * Color of text input
   */
  inputColor?: string
  /**
   * Any misc. TextInput props (autoFocus, placeholder, returnKeyType, etc.)
   */
  inputProps?: TextInputProps
  /**
   * Max height of the tag input on screen (will scroll if max height reached)
   */
  maxHeight?: number
  /**
   * Callback that gets passed the new component height when it changes
   */
  onHeightChange?: (height: number) => void
  /**
   * Any ScrollView props (horizontal, showsHorizontalScrollIndicator, etc.)
  */
  scrollViewProps?: ScrollViewProps
}
type Props<T> = RequiredProps<T> & OptionalProps
interface State {
  inputWidth: number
  wrapperHeight: number
}

function getInputWidth (
  text: string,
  spaceLeft: number,
  inputDefaultWidth: number,
  wrapperWidth: number
): number {
  if (text === '') {
    return inputDefaultWidth
  } else if (spaceLeft >= 100) {
    return spaceLeft - 10
  } else {
    return wrapperWidth
  }
}

export default function TagInput<T> ({
  editable = true,
  tagColor = '#dddddd',
  tagTextColor = '#777777',
  inputDefaultWidth = 90,
  inputColor = '#777777',
  maxHeight = 75,
  labelExtractor,
  onChange,
  onChangeText,
  text,
  value,
  inputProps,
  onHeightChange,
  scrollViewProps,
  tagContainerStyle,
  tagTextStyle
}: Props<T>): JSX.Element {
  const tagInputRef = useRef<TextInput>(null)
  const scrollViewRef = useRef<ScrollView>(null)
  const wrapperWidth = windowWidth
  const [state, setState] = useState<State>({
    inputWidth: inputDefaultWidth,
    wrapperHeight: 36
  })
  const spaceLeft = 0
  const [contentHeight, setContentHeight] = useState(0)
  // scroll to bottom

  useEffect(() => {
    const _inputWidth = getInputWidth(
      text,
      spaceLeft,
      inputDefaultWidth,
      wrapperWidth
    )
    if (_inputWidth !== state.inputWidth) {
      setState({
        ...state,
        inputWidth: _inputWidth
      })
    }
    const newWrapperHeight = Math.min(
      maxHeight,
      contentHeight
    )
    if (newWrapperHeight !== state.wrapperHeight) {
      setState({
        ...state,
        wrapperHeight: newWrapperHeight
      })
    }
  }, [text, inputDefaultWidth, maxHeight])

  useEffect(() => {
    onHeightChange?.(state.wrapperHeight)
  }, [state.wrapperHeight])

  const measureWrapper = useCallback((event: { nativeEvent: { layout: { width: number } } }) => {
    const inputWidth = getInputWidth(
      text,
      spaceLeft,
      inputDefaultWidth,
      event.nativeEvent.layout.width
    )
    if (inputWidth !== state.inputWidth) {
      setState({
        ...state,
        inputWidth
      })
    }
  }, [state, text, spaceLeft, inputDefaultWidth])

  const onBlur = useCallback((event: { nativeEvent: { text: string } }): void => {
    onChangeText(event.nativeEvent.text)
  }, [onChangeText])

  const focus = useCallback(() => {
    tagInputRef.current?.focus()
  }, [tagInputRef.current])

  const removeIndex = useCallback((index: number) => {
    const tags = [...value]
    tags.splice(index, 1)
    onChange(tags)
  }, [value, onChange])

  const scrollToEnd = useCallback(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 0)
  }, [scrollViewRef.current])

  const onKeyPress = useCallback((event: { nativeEvent: { key: string } }) => {
    if (text !== '' || event.nativeEvent.key !== 'Backspace') {
      return
    }
    const tags = [...value]
    tags.pop()
    onChange(tags)
    scrollToEnd()
    focus()
  }, [text, value, onChange, scrollToEnd, focus])

  const onLayoutLastTag = useCallback((endPosOfTag: number) => {
    const margin = 3
    const spaceLeft = wrapperWidth - endPosOfTag - margin - 10
    const _inputWidth = getInputWidth(
      text,
      spaceLeft,
      inputDefaultWidth,
      wrapperWidth
    )
    if (_inputWidth !== state.inputWidth) {
      setState({
        ...state,
        inputWidth: _inputWidth
      })
    }
  }, [state.inputWidth, text, inputDefaultWidth, wrapperWidth])

  const onScrollViewContentSizeChange = useCallback((w: number, h: number) => {
    if (contentHeight === h) {
      return
    }
    const nextWrapperHeight = Math.min(maxHeight, h)
    if (nextWrapperHeight !== state.wrapperHeight) {
      setState({
        ...state,
        wrapperHeight: nextWrapperHeight
      })
      scrollToEnd()
    } else if (contentHeight < h) {
      scrollToEnd()
    }
    setContentHeight(h)
  }, [state, maxHeight, contentHeight, scrollToEnd, setContentHeight])

  const tags = value.map((tag, index) => (
    <Tag
      index={index}
      label={labelExtractor(tag)}
      isLastTag={value.length === index + 1}
      onLayoutLastTag={onLayoutLastTag}
      removeIndex={removeIndex}
      tagColor={tagColor}
      tagTextColor={tagTextColor}
      tagContainerStyle={tagContainerStyle}
      tagTextStyle={tagTextStyle}
      key={index}
      editable={editable}
    />
  ))
  return (
    <TouchableWithoutFeedback
      onPress={focus}
      style={styles.container}
      onLayout={measureWrapper}
    >
      <View style={[styles.wrapper, { height: state.wrapperHeight }]}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.tagInputContainerScroll}
          onContentSizeChange={onScrollViewContentSizeChange}
          keyboardShouldPersistTaps='handled'
          {...scrollViewProps}
        >
          <View style={styles.tagInputContainer}>
            {tags}
            <View style={[
              styles.textInputContainer,
              { width: state.inputWidth }
            ]}
            >
              <TextInput
                ref={tagInputRef}
                blurOnSubmit={false}
                onKeyPress={onKeyPress}
                value={text}
                style={[styles.textInput, {
                  width: state.inputWidth,
                  color: inputColor
                }]}
                onBlur={Platform.OS === 'ios' ? onBlur : undefined}
                onChangeText={onChangeText}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder='Start typing'
                returnKeyType='done'
                keyboardType='default'
                editable={editable}
                underlineColorAndroid='rgba(0,0,0,0)'
                {...inputProps}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  )
}

interface TagProps {
  index: number
  label: string | React.ReactNode
  isLastTag: boolean
  editable: boolean
  onLayoutLastTag: (endPosOfTag: number) => void
  removeIndex: (index: number) => void
  tagColor: string
  tagTextColor: string
  tagContainerStyle?: StyleProp<ViewStyle>
  tagTextStyle?: StyleProp<TextStyle>
}

function Tag ({
  index,
  label,
  isLastTag,
  editable,
  onLayoutLastTag,
  removeIndex,
  tagColor,
  tagTextColor,
  tagContainerStyle,
  tagTextStyle
}: TagProps): JSX.Element {
  const curPos = useRef<number>()

  useEffect(() => {
    if (curPos.current != null) {
      onLayoutLastTag(curPos.current)
    }
  }, [isLastTag])

  let tagLabel
  if (React.isValidElement(label)) {
    tagLabel = label
  } else {
    tagLabel = (
      <Text style={[
        styles.tagText,
        { color: tagTextColor },
        tagTextStyle
      ]}
      >
        {label}
      </Text>
    )
  }

  const onPress = useCallback(() => {
    removeIndex(index)
  }, [removeIndex, index])

  const handleLayoutLastTag = useCallback((
    event: { nativeEvent: { layout: { x: number, width: number } } }
  ) => {
    const layout = event.nativeEvent.layout
    curPos.current = layout.width + layout.x
    if (isLastTag) {
      onLayoutLastTag(curPos.current)
    }
  }, [isLastTag, onLayoutLastTag])

  return (
    <TouchableOpacity
      disabled={!editable}
      onPress={onPress}
      onLayout={handleLayoutLastTag}
      style={[
        styles.tag,
        { backgroundColor: tagColor },
        tagContainerStyle
      ]}
    >
      {tagLabel}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 2,
    alignItems: 'flex-start'
  },
  tagInputContainerScroll: {
    height: 36,
    flex: 1
  },
  tagInputContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  textInput: {
    height: 36,
    fontSize: 16,
    flex: 0.6,
    marginBottom: 6,
    padding: 0
  },
  textInputContainer: {
    height: 36
  },
  tag: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: 3,
    padding: 4,
    height: 24,
    borderRadius: 2
  },
  tagText: {
    padding: 0,
    margin: 0
  }
})
