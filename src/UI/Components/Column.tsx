import React from 'react'
import classNames from 'classnames'

import { useStyles } from 'app/UI/ThemeProvider'

type Props = {
  size?: number
  sizeSm?: number
  sizeMd?: number
  sizeLg?: number
  sizeXl?: number
  children: React.ReactNode
}

export default (props: Props) => {
  const {
    children,
    size,
    sizeSm,
    sizeMd,
    sizeLg,
    sizeXl,
  } = props
  const { styles } = useStyles()
  const sizeClasses = [
    size ? styles[`col-${size}`] : null,
    sizeSm ? styles[`col-sm-${sizeSm}`] : null,
    sizeMd ? styles[`col-md-${sizeMd}`] : null,
    sizeLg ? styles[`col-lg-${sizeLg}`] : null,
    sizeXl ? styles[`col-xl-${sizeXl}`] : null,
  ].filter(sizeClass => !!sizeClass)

  return (
    <div className={classNames(sizeClasses.length > 0 ? sizeClasses : styles.col)}>
      {children}
    </div>
  )
}
