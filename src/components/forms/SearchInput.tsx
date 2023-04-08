import { useState, useEffect } from 'react'
import { useDebounceValue } from '../../hooks/useDebounceValue'
import { FaSearch } from 'react-icons/fa'

interface Props {
  onDebounce: (value: string) => void
}

export const SearchInput = ({ onDebounce }: Props) => {
  const [textValue, setTextValue] = useState('')

  const { debouncedValue } = useDebounceValue(textValue, 750)

  useEffect(() => {
    onDebounce(debouncedValue)
  }, [debouncedValue, onDebounce])

  return (
    <div>
      <div>
        <input
          placeholder="Buscar pokémon"
          autoCapitalize="none"
          value={textValue}
          onChange={(e) => {
            setTextValue(e.target.value)
          }}
        />
        <FaSearch name="search-outline" color="grey" size={30} />
      </div>
    </div>
  )
}
