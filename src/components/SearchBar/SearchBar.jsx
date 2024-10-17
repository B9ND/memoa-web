import { MdSearch, MdFilterAlt } from "react-icons/md";
import './index.css'

/* eslint-disable */
const SearchBar = ({filter, setFilter, inputFilter, setInputFilter}) => {
  const handleInput = (e) => {
    const {name, value} = e.target
    setInputFilter((prev) => ( { ...prev,[name]:value } ))
    console.log(inputFilter)
  }

  const toggleFilter = () =>{
    setFilter(!filter)
  }

  return (
    <div style={{display:'flex', width:'100%', justifyContent:'center'}}>
      <div className="search-bar">
        <input type="text" className="search-bar-input" placeholder="검색어를 입력해주세요." value={inputFilter} onChange={()=>handleInput()} name="input" />
        <button className="search-button">
          <MdSearch className="semi-icon" color="white"/>
        </button>
      </div>
      <button className={filter == false ? 'search-filter-close': 'search-filter'} onClick={()=>toggleFilter()}>
          <MdFilterAlt className="semi-icon" color={filter == true ?  'white' : '#715AFF'}/>
        </button>
    </div>
  )
}

export default SearchBar