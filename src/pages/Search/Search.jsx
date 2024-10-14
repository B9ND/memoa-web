import { useEffect, useState } from "react"
import Header from "../../components/Header/Header"
import SearchBar from "../../components/SearchBar/SearchBar"
import { CSSTransition } from "react-transition-group";
import Tag from "../../components/Tag/Tag";
import './index.css'

const Search = () => {
  const [toggleFilter, setToggleFilter] = useState(false)
  const [searchMod, setSearchMod] = useState('인기순')
  const [filter, setFilter] = useState({school : null, grade:null, subject:null})

  const toggleSearchMod = () => {
    searchMod == '인기순' ? setSearchMod('최신순') : setSearchMod('인기순')
  }
  useEffect(()=>{
    console.log(filter)
  }, [filter])
  return (
    <div className="head-main">
        <Header />
        <SearchBar filter={toggleFilter} setFilter={setToggleFilter} />
        <div className="search-info">
          <CSSTransition in={!toggleFilter} className={'search-filter-contain'} timeout={200}>
            <div className="search-filter-contain">
              <div className="search-filter-tags">
                등급
                <div className="search-filter-real-tag">
                  <Tag tagPrint={'초등'} tagStyle={'filter'} tagName={'school'} setRadioValue={setFilter} RadioValue={filter}/>
                  <Tag tagPrint={'중등'} tagStyle={'filter'} tagName={'school'} setRadioValue={setFilter} RadioValue={filter}/>
                  <Tag tagPrint={'고등'} tagStyle={'filter'} tagName={'school'} setRadioValue={setFilter} RadioValue={filter}/>
                </div>
              </div>
              <div className="search-filter-tags">
                학년
                <div className="search-filter-real-tag">
                  <Tag tagPrint={'1학년'} tagStyle={'filter'} tagName={'grade'} setRadioValue={setFilter} RadioValue={filter}/>
                  <Tag tagPrint={'2학년'} tagStyle={'filter'} tagName={'grade'} setRadioValue={setFilter} RadioValue={filter}/>
                  <Tag tagPrint={'3학년'} tagStyle={'filter'} tagName={'grade'} setRadioValue={setFilter} RadioValue={filter}/>
                  <Tag tagPrint={'4학년'} tagStyle={'filter'} tagName={'grade'} setRadioValue={setFilter} RadioValue={filter}/>
                  <Tag tagPrint={'5학년'} tagStyle={'filter'} tagName={'grade'} setRadioValue={setFilter} RadioValue={filter}/>
                  <Tag tagPrint={'6학년'} tagStyle={'filter'} tagName={'grade'} setRadioValue={setFilter} RadioValue={filter}/>
                </div>
              </div>
              <div className="search-filter-tags">
                과목
                <div className="search-filter-real-tag">
                  <Tag tagPrint={'국어'} tagStyle={'filter'} tagName={'subject'} setRadioValue={setFilter} RadioValue={filter}/>
                  <Tag tagPrint={'수학'} tagStyle={'filter'} tagName={'subject'} setRadioValue={setFilter} RadioValue={filter}/>
                  <Tag tagPrint={'영어'} tagStyle={'filter'} tagName={'subject'} setRadioValue={setFilter} RadioValue={filter}/>
                  <Tag tagPrint={'사회'} tagStyle={'filter'} tagName={'subject'} setRadioValue={setFilter} RadioValue={filter}/>
                  <Tag tagPrint={'과학'} tagStyle={'filter'} tagName={'subject'} setRadioValue={setFilter} RadioValue={filter}/>
                  <Tag tagPrint={'한국사'} tagStyle={'filter'} tagName={'subject'} setRadioValue={setFilter} RadioValue={filter}/>
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