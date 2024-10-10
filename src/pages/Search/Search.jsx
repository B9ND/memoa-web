import { useState } from "react"
import Header from "../../components/Header/Header"
import SearchBar from "../../components/SearchBar/SearchBar"
import { CSSTransition } from "react-transition-group";
import Tag from "../../components/Tag/Tag";
import './index.css'

const Search = () => {
  const [filter, setFilter] = useState(false)


  return (
    <div className="head-main">
        <Header />
        <SearchBar filter={filter} setFilter={setFilter} />
        <CSSTransition in={!filter} className={'search-filter-tags'} timeout={100}>
          <div className="search-filter-tags">
            <div className="search-filter-container">
              등급
              <div className="search-filter-grade">
                <Tag tagName={'초등'} tagStyle={'filter'}/>
                <Tag tagName={'중등'} tagStyle={'filter'}/>
                <Tag tagName={'고등'} tagStyle={'filter'}/>
              </div>
            </div>
          </div>
        </CSSTransition>
    </div>
  )
}

export default Search