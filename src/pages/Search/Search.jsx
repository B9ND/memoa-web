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
            <div className="search-filter-container">
              학년
              <div className="search-filter-grade">
                <Tag tagName={'1학년'} tagStyle={'filter'}/>
                <Tag tagName={'2학년'} tagStyle={'filter'}/>
                <Tag tagName={'3학년'} tagStyle={'filter'}/>
                <Tag tagName={'4학년'} tagStyle={'filter'}/>
                <Tag tagName={'5학년'} tagStyle={'filter'}/>
                <Tag tagName={'6학년'} tagStyle={'filter'}/>
              </div>
            </div>
            <div className="search-filter-container">
              과목
              <div className="search-filter-grade">
                <Tag tagName={'국어'} tagStyle={'filter'}/>
                <Tag tagName={'수학'} tagStyle={'filter'}/>
                <Tag tagName={'영어'} tagStyle={'filter'}/>
                <Tag tagName={'사회'} tagStyle={'filter'}/>
                <Tag tagName={'과학'} tagStyle={'filter'}/>
                <Tag tagName={'한국사'} tagStyle={'filter'}/>
              </div>
            </div>
          </div>
        </CSSTransition>
    </div>
  )
}

export default Search