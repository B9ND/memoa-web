import { MdSearch } from "react-icons/md";
import './index.css'

const SearchBar = () => {
  return (
    <div>
      <div className="search-bar">
        <input type="text" className="search-bar-input" />
        <button className="search-button">
          <MdSearch className="normal-icon" color="white"/>
        </button>
      </div>
    </div>
  )
}

export default SearchBar