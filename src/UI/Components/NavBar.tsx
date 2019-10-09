import React from 'react'
import classNames from 'classnames'

import { useStyles, AvailableStyle } from 'app/UI/ThemeProvider'

type Props = {
  title?: string
  colorStyle?: AvailableStyle
  children?: React.ReactNode
}
const NavBar = (props: Props) => {
  const { title, children, colorStyle } = props
  const { styles } = useStyles()

  return (
    <nav className={classNames([styles.navbar, styles.navbarDark, styles[`bg-${colorStyle}`]])}>
      {children || <NavBarBrand>{title}</NavBarBrand>}
    </nav>
  )
}


type NavBarBrandProps = {
  children: React.ReactNode
}
export const NavBarBrand = (props: NavBarBrandProps) => {
  const { children } = props
  const { styles } = useStyles()

  return (
    <a className={styles.navbarBrand} href="/">
      {children}
    </a>
  )
}

export default NavBar
