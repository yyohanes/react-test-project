import React, { useState, ChangeEvent } from 'react'
import classNames from 'classnames'

import { useStyles } from 'app/UI/ThemeProvider'

type Props = {
  defaultValue?: string | number
  placeholder?: string
  onChange?: (changedValue: string) => void
}

export default React.forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { defaultValue = '', placeholder, onChange } = props
  const { styles } = useStyles()
  const [value, setValue] = useState(defaultValue)

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    if (onChange) {
      onChange(e.target.value)
    }
    setValue(e.target.value)
  }

  return (
    <input
      ref={ref}
      value={value}
      className={classNames([styles.formControl, styles.formControlLg])}
      type="text"
      placeholder={placeholder}
      onChange={handleOnChange}
    />
  )
})
