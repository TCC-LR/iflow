import { MagnifyingGlass } from 'phosphor-react'
import './SearchInput.css'

interface searchInput {
  placeholder: string
}

export function SearchInput(props: searchInput) {
  return (
    <div className="search-input">
      <MagnifyingGlass />
      <input type="text" placeholder={props.placeholder}></input>
    </div>
  )
}
