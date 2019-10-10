import React, { useEffect, useRef } from 'react'
import classNames from 'classnames'

import { AvailableStyle } from 'app/UI/Theme'
import ListGroup, { ListGroupItem } from '../ListGroup'
import './styles.module.scss'

type Props<OT, O = OT[]> = {
  focusIndex: number
  options: O
  renderOption: (option: OT, index: number, focusIndex: number) => React.ReactNode
  renderFooter?: (options: O) => React.ReactNode
  focusStyle?: AvailableStyle
  onNearBottom?: () => void,
  onSelect?: (option: OT) => void,
}

export default <OT extends unknown>(props: Props<OT>) => {
  const {
    renderOption,
    options,
    focusStyle,
    renderFooter,
    focusIndex,
    onNearBottom,
    onSelect,
  } = props
  const resultsWrapper = useRef<HTMLDivElement>(null)
  const activeItem = useRef<HTMLDivElement>(null)

  const handleOnClick = (option: OT) => {
    if (onSelect) {
      onSelect(option)
    }
  }

  const handleOnResultsScroll = () => {
    if (resultsWrapper.current && onNearBottom) {
      const distanceToBottom = resultsWrapper.current.scrollHeight - (resultsWrapper.current.scrollTop + resultsWrapper.current.offsetHeight)
      if (distanceToBottom <= 120) {
        onNearBottom()
      }
    }
  }

  useEffect(() => {
    if (activeItem.current && resultsWrapper.current) {
      if (activeItem.current.offsetTop + 30 > resultsWrapper.current.offsetHeight + resultsWrapper.current.scrollTop) {
        activeItem.current.scrollIntoView(false)
      } else if (activeItem.current.offsetTop < resultsWrapper.current.scrollTop) {
        activeItem.current.scrollIntoView()
      }
    }
  }, [focusIndex])

  useEffect(() => {
    if (resultsWrapper.current) {
      resultsWrapper.current.addEventListener('scroll', handleOnResultsScroll)
    }

    return function cleanup() {
      if (resultsWrapper.current) {
        resultsWrapper.current.removeEventListener('scroll', handleOnResultsScroll)
      }
    }
  }, [])

  return (
    <div className={classNames(['autocomplete-search-box__suggestions', 'my-2'])}>
      <ListGroup>
        <div ref={resultsWrapper} className="autocomplete-search-box__results">
          {options.map((option, idx) => (
            // We cannot focus to each issue (we want to preserve input focus). So keyboard event will be handled in parent
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div
              tabIndex={-1}
              role="button"
              onClick={() => handleOnClick(option)}
              key={idx}
              ref={focusIndex === idx ? activeItem : undefined}
            >
              <ListGroupItem colorStyle={focusIndex === idx ? focusStyle : undefined}>
                {renderOption(option, idx, focusIndex)}
              </ListGroupItem>
            </div>
          ))}
        </div>
        {renderFooter && (
          <ListGroupItem key="footer" colorStyle="secondary">
            {renderFooter(options)}
          </ListGroupItem>
        )}
      </ListGroup>
    </div>
  )
}
