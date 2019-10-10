import React from 'react'
import classNames from 'classnames'

import { AvailableStyle } from 'app/UI/Theme'

type Props = {
  title?: string
  colorStyle?: AvailableStyle
  children?: React.ReactNode
}
const NavBar = (props: Props) => {
  const { title, children, colorStyle } = props

  return (
    <nav
      className={classNames(['navbar', 'navbar-dark', `bg-${colorStyle}`])}
    >
      {children || <NavBarBrand>{title}</NavBarBrand>}
    </nav>
  )
}


type NavBarBrandProps = {
  children: React.ReactNode
}
export const NavBarBrand = (props: NavBarBrandProps) => {
  const { children } = props

  return (
    <a className="navbar-brand" href="/">
      {children}
    </a>
  )
}

export default NavBar
