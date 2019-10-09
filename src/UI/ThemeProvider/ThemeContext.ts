import { createContext } from 'react'

type TContext = {
  styles: any
}

const ThemeContext = createContext<TContext>({
  styles: {},
})

export default ThemeContext
