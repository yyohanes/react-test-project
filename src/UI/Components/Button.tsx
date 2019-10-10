import React from 'react'
import classNames from 'classnames'

import { AvailableStyle } from 'app/UI/Theme'

type Props = {
  colorStyle?: AvailableStyle
  children: React.ReactNode
}

export default (props: Props) => {
  const { children, colorStyle } = props

  return (
    <button
      type="button"
      className={classNames(['btn', colorStyle && `btn-${colorStyle}`])}
    >
      {children}
    </button>
  )
}
