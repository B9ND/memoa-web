import { useState } from "react"
import Header from "../../components/Header/Header"
import SearchBar from "../../components/SearchBar/SearchBar"
import { CSSTransition } from "react-transition-group";
import Tag from "../../components/Tag/Tag";
import './index.css'

const Search = () => {
  const [toggleFilter, setToggleFilter] = useState(false)
  const [searchMod, setSearchMod] = useState('인기순')
  const [filter, setFilter] = useState({school : [], grade:[], subject:[], input:''})

  const toggleSearchMod = () => {
    searchMod == '인기순' ? setSearchMod('최신순') : setSearchMod('인기순')
  }

  const school = ['초등', '중등', '고등']
  const grade = [1,2,3,4,5,6]
  const subject = ['국어','사회','수학','영어','과학','한국사']

  return (
    <div className="head-main">
        <Header />
        <SearchBar filter={toggleFilter} setFilter={setToggleFilter} inputFilter={filter.input} setInputFilter={setFilter} />
        <div className="search-info">
          <CSSTransition in={!toggleFilter} className={'search-filter-contain'} timeout={200}>
            <div className="search-filter-contain">
              <div className="search-filter-tags">
                등급
                <div className="search-filter-real-tag">
                  {school.map((s, i)=>( <Tag key={i} tagPrint={s} tagStyle={'filter'} tagName={'school'} setFilter={setFilter} filter={filter} /> ))}
                </div>
              </div>
              <div className="search-filter-tags">
                학년
                <div className="search-filter-real-tag">
                  {grade.map((g, i)=>(<Tag key={i} tagPrint={g+'학년'} tagStyle={'filter'} tagName={'grade'} setFilter={setFilter} filter={filter} />))}
                </div>
              </div>
              <div className="search-filter-tags">
                과목
                <div className="search-filter-real-tag">
                  {subject.map((s, i)=>(<Tag key={i} tagPrint={s} tagStyle={'filter'} tagName={'subject'} setFilter={setFilter} filter={filter} />))}
                </div>
              </div>
            </div>
          </CSSTransition>
          <div className={searchMod == '인기순' ? "search-mod-popular" : "search-mod-last"} onClick={()=>toggleSearchMod()}>
            {searchMod == '인기순' ? "인기순" : "최신순"}
          </div>
        </div>
    </div>
  )
}

export default Search