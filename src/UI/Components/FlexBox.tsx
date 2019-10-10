import React from 'react'
import classNames from 'classnames'

type Props = {
  children: React.ReactNode
  fullWidth?: boolean
  fullHeight?: boolean
  flex?: boolean
  grow?: boolean
  shrink?: boolean
  direction?: 'column' | 'row'
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around'
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
}

export default (props: Props) => {
  const {
    flex,
    grow,
    shrink,
    children,
    direction,
    fullWidth,
    fullHeight,
    justifyContent,
    alignItems,
  } = props
  const classes = [
    flex ? 'd-flex' : null,
    direction ? `flex-${direction}` : null,
    grow ? 'flex-grow-1' : null,
    shrink ? 'flex-shrink-1' : null,
    alignItems ? `align-items-${alignItems}` : null,
    justifyContent ? `justify-content-${justifyContent}` : null,
  ]

  return (
    <div
      style={{
        width: fullWidth ? '100vw' : undefined,
        height: fullHeight ? '100vh' : undefined,
      }}
      className={classNames(classes.filter(classToAdd => !!classToAdd))}
    >
      {children}
    </div>
  )
}
