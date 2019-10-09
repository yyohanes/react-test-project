import React from 'react'
import {
  render,
  act,
  fireEvent,
  getByText,
} from '@testing-library/react'

import AutocompleteSearchBox from '..'

describe('AutocompleteSearchBox', () => {
  const testOptions = [
    {
      title: 'Test 1',
    },
    {
      title: 'Test 2',
    },
  ]

  test('Should not render suggestions if input is not focused', () => {
    const component = render(
      <AutocompleteSearchBox
        placeholder="Search"
        defaultValue="Test"
        options={testOptions}
        renderOption={option => (<p>{option.title}</p>)}
      />,
    )

    expect(component.container.querySelectorAll('.option-item').length).toBe(0)
  })

  test('Should render suggestions if options > 0 & input is focused', () => {
    const component = render(
      <AutocompleteSearchBox
        placeholder="Search"
        options={testOptions}
        renderOption={option => (<p className="option-item">{option.title}</p>)}
      />,
    )
    act(() => {
      component.getByPlaceholderText('Search').focus()
    })

    expect(component.container.querySelectorAll('.option-item').length).toBe(2)
    expect(component.container).toMatchSnapshot()
  })

  test('Should select correct auto-suggestion when navigating with ArrowUp or ArrowDown', () => {
    const component = render(
      <AutocompleteSearchBox
        placeholder="Search"
        options={testOptions}
        focusStyle="primary"
        renderOption={(option, idx, focusIndex) => (<p className={`option-item ${idx === focusIndex ? 'focused' : ''}`}>{option.title}</p>)}
      />,
    )
    const input = component.getByPlaceholderText('Search')
    act(() => {
      input.focus()
      fireEvent.keyDown(input, { key: 'ArrowDown', keyCode: 40 })
    })

    const expectedActiveElement = getByText(component.container, 'Test 1')
    const expectedActiveElement2 = getByText(component.container, 'Test 2')

    expect(expectedActiveElement.className).toBe('option-item focused')

    act(() => {
      fireEvent.keyDown(input, { key: 'ArrowDown', keyCode: 40 })
    })

    expect(expectedActiveElement.className).toBe('option-item ')
    expect(expectedActiveElement2.className).toBe('option-item focused')

    act(() => {
      fireEvent.keyDown(input, { key: 'ArrowUp', keyCode: 38 })
    })
    expect(expectedActiveElement2.className).toBe('option-item ')
    expect(expectedActiveElement.className).toBe('option-item focused')
  })
})
