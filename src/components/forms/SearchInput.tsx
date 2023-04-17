import { useState, useEffect } from 'react'
import { useDebounceValue } from '../../hooks/useDebounceValue'
import { FaSearch } from 'react-icons/fa'

interface Props {
  onDebounce: (value: string) => void
  placeholder?: string
  callback?: () => void
}

export const SearchInput = ({ onDebounce, placeholder, callback }: Props) => {
  const [textValue, setTextValue] = useState('')

  const { debouncedValue } = useDebounceValue(textValue, 750)

  useEffect(() => {
    onDebounce(debouncedValue)
  }, [debouncedValue, onDebounce])

  return (
    <div className="search-form">
      <div className="search-form__wrapper">
        <input
          placeholder={placeholder}
          autoCapitalize="none"
          value={textValue}
          className="search-form__input"
          onChange={(e) => {
            setTextValue(e.target.value)
          }}
        />
        <div className="search-form__button">
          <FaSearch
            name="search-outline"
            color="white"
            size={15}
            onClick={callback}
          />
        </div>
      </div>
    </div>
  )
}
