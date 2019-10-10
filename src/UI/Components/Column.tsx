import React from 'react'
import classNames from 'classnames'

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
  const sizeClasses = [
    size ? `col-${size}` : null,
    sizeSm ? `col-sm-${sizeSm}` : null,
    sizeMd ? `col-md-${sizeMd}` : null,
    sizeLg ? `col-lg-${sizeLg}` : null,
    sizeXl ? `col-xl-${sizeXl}` : null,
  ].filter(sizeClass => !!sizeClass)

  return (
    <div className={classNames(sizeClasses.length > 0 ? sizeClasses : 'col')}>
      {children}
    </div>
  )
}
