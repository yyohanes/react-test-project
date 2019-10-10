import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react'

import { AvailableStyle } from 'app/UI/Theme'
import SearchBox from '../SearchBox'
import Suggestions from './Suggestions'

const shortcutWhitelistedKeys = ['control', 'f']

type Props<OT, O = OT[]> = {
  defaultValue?: string | number
  options: OT[]
  renderOption: (option: OT, index: number, focusIndex: number) => React.ReactNode
  renderFooter?: (options: O) => React.ReactNode
  focusStyle?: AvailableStyle
  placeholder?: string
  isLoading?: boolean
  onInputChange?: (changedValue: string) => void
  onNearBottom?: () => void
  nearBottomThreshold?: number
  onSelect?: (option: OT) => void
}

export default <OT extends unknown>(props: Props<OT>) => {
  const {
    defaultValue,
    placeholder,
    options,
    onInputChange,
    focusStyle,
    renderFooter,
    renderOption,
    isLoading,
    onNearBottom,
    onSelect,
    nearBottomThreshold,
  } = props
  const [pressedKeys, setPressedKeys] = useState<string[]>([])
  const [focusIndex, setFocusIndex] = useState<number>(-1)
  const searchBoxRef = useRef<HTMLInputElement>(null)

  const isSearchShortcutPressed = shortcutWhitelistedKeys
    .filter(shortcut => pressedKeys.includes(shortcut)).length === 2
  const shouldShowSuggestion = options.length > 0 || isLoading

  // Keyboard event listeners
  const handleOnInputKeyDown = useCallback(e => {
    if (e.key.toLowerCase() === 'enter' && onSelect) {
      onSelect(options[focusIndex])
    }

    if (['arrowup', 'up'].includes(e.key.toLowerCase())) {
      e.preventDefault()

      setFocusIndex(_focusIndex => {
        if (_focusIndex <= 0) {
          return 0
        }
        return _focusIndex - 1
      })
    } else if (['arrowdown', 'down'].includes(e.key.toLowerCase())) {
      e.preventDefault()

      setFocusIndex(_focusIndex => {
        if (_focusIndex >= options.length - 1) {
          return _focusIndex
        }
        return _focusIndex + 1
      })
    }
  }, [options, onSelect, focusIndex])

  const handleOnSearchShortcut = e => {
    if (!shortcutWhitelistedKeys.includes(e.key.toLowerCase())) {
      return
    }

    if (e.type === 'keydown') {
      setPressedKeys(_pressedKeys => _pressedKeys
        .filter(pressedKey => pressedKey !== e.key.toLowerCase())
        .concat([e.key.toLowerCase()]))
    } else if (e.type === 'keyup') {
      setPressedKeys(_pressedKeys => _pressedKeys
        .filter(pressedKey => pressedKey !== e.key.toLowerCase()))
    }
  }

  // Attach Up/Down keyboard listener
  useEffect(() => {
    if (searchBoxRef.current) {
      searchBoxRef.current.addEventListener('keydown', handleOnInputKeyDown)
    }

    return function cleanup() {
      if (searchBoxRef.current) {
        searchBoxRef.current.removeEventListener('keydown', handleOnInputKeyDown)
      }
    }
  }, [handleOnInputKeyDown])

  // Check if pressed keys contain ctrl + f
  useEffect(() => {
    if (searchBoxRef.current && isSearchShortcutPressed) {
      searchBoxRef.current.focus()
    }
  }, [pressedKeys])

  // Attach ctrl+f listener
  useEffect(() => {
    document.addEventListener('keyup', handleOnSearchShortcut)
    document.addEventListener('keydown', handleOnSearchShortcut)

    return function cleanup() {
      document.removeEventListener('keyup', handleOnSearchShortcut)
      document.removeEventListener('keydown', handleOnSearchShortcut)
    }
  }, [handleOnSearchShortcut])

  return (
    <div className="autocomplete-search-box">
      <SearchBox
        ref={searchBoxRef}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onInputChange={onInputChange}
      />
      {shouldShowSuggestion && (
        <Suggestions
          renderOption={renderOption}
          focusIndex={focusIndex}
          options={options}
          focusStyle={focusStyle}
          renderFooter={renderFooter}
          onNearBottom={onNearBottom}
          nearBottomThreshold={nearBottomThreshold}
          onSelect={onSelect}
        />
      )}
    </div>
  )
}
