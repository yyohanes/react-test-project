import { useContext } from 'react'

import ThemeContext from './ThemeContext'

export default function useStyles() {
  const { styles } = useContext(ThemeContext)

  return {
    styles,
  }
}
