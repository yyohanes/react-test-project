import React, { useState, ChangeEvent } from 'react'
import classNames from 'classnames'

type Props = {
  defaultValue?: string | number
  placeholder?: string
  onInputChange?: (changedValue: string) => void
}

export default React.forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { defaultValue = '', placeholder, onInputChange } = props
  const [value, setValue] = useState(defaultValue)

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    if (onInputChange) {
      onInputChange(e.target.value)
    }
    setValue(e.target.value)
  }

  return (
    <input
      ref={ref}
      value={value}
      className={classNames(['form-control', 'form-control-lg'])}
      type="text"
      placeholder={placeholder}
      onChange={handleOnChange}
    />
  )
})
