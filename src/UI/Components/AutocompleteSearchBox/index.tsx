import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react'
import classNames from 'classnames'

import { useStyles, AvailableStyle } from 'app/UI/ThemeProvider'
import ListGroup, { ListGroupItem } from '../ListGroup'
import SearchBox from '../SearchBox'
import moduleStyles from './styles.module.scss'

const shortcutWhitelistedKeys = ['control', 'f']

type Props<OT, O = OT[]> = {
  defaultValue?: string | number
  options: O
  renderOption: (option: OT, index: number, focusIndex: number) => React.ReactNode
  renderFooter?: (options: O) => React.ReactNode
  focusStyle?: AvailableStyle
  placeholder?: string
  onChange?: (changedValue: string) => void
}

export default <OT extends unknown>(props: Props<OT>) => {
  const {
    renderOption,
    defaultValue,
    placeholder,
    options,
    focusStyle,
    onChange,
    renderFooter,
  } = props
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false)
  const [pressedKeys, setPressedKeys] = useState<string[]>([])
  const [focusIndex, setFocusIndex] = useState<number>(-1)
  const searchBoxRef = useRef<HTMLInputElement>(null)
  const { styles } = useStyles()

  const isSearchShortcutPressed = shortcutWhitelistedKeys
    .filter(shortcut => pressedKeys.includes(shortcut)).length === 2

  // Keyboard event listeners
  const handleOnInputKeyDown = useCallback(e => {
    if (['arrowup', 'up'].includes(e.key.toLowerCase())) {
      e.preventDefault()

      setFocusIndex(_focusIndex => {
        if (_focusIndex <= 0) {
          return options.length - 1
        }
        return _focusIndex - 1
      })
    } else if (['arrowdown', 'down'].includes(e.key.toLowerCase())) {
      e.preventDefault()

      setFocusIndex(_focusIndex => {
        if (_focusIndex >= options.length - 1) {
          return 0
        }
        return _focusIndex + 1
      })
    }
  }, [options])

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

  const handleOnInputFocus = () => {
    setIsInputFocused(true)
  }

  const handleOnInputBlur = () => {
    setIsInputFocused(false)
  }

  // Reset focus index on options change
  useEffect(() => {
    setFocusIndex(-1)
  }, [options])

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
    if (searchBoxRef.current) {
      searchBoxRef.current.addEventListener('focus', handleOnInputFocus)
      searchBoxRef.current.addEventListener('blur', handleOnInputBlur)
    }

    document.addEventListener('keyup', handleOnSearchShortcut)
    document.addEventListener('keydown', handleOnSearchShortcut)

    return function cleanup() {
      if (searchBoxRef.current) {
        searchBoxRef.current.removeEventListener('focus', handleOnInputFocus)
        searchBoxRef.current.removeEventListener('blur', handleOnInputBlur)
      }

      document.removeEventListener('keyup', handleOnSearchShortcut)
      document.removeEventListener('keydown', handleOnSearchShortcut)
    }
  }, [handleOnSearchShortcut])

  return (
    <div className={moduleStyles.autocompleteSearchBox}>
      <SearchBox
        ref={searchBoxRef}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
      />
      {isInputFocused && options.length > 0 ? (
        <div className={classNames([moduleStyles.autocompleteSuggestions, styles.my2])}>
          <ListGroup>
            {options.map((option, idx) => (
              <ListGroupItem key={idx} colorStyle={focusIndex === idx ? focusStyle : undefined}>
                {renderOption(option, idx, focusIndex)}
              </ListGroupItem>
            ))}
            {renderFooter && (
              <ListGroupItem key="footer" colorStyle="secondary">
                {renderFooter(options)}
              </ListGroupItem>
            )}
          </ListGroup>
        </div>
      ) : null}
    </div>
  )
}
