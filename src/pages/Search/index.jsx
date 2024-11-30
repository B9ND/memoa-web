import { useCallback, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Header from "../../components/Header";
import Post from "../../components/Post";
import Tag from "../../components/Tag";
import { MdSearch, MdFilterAlt } from "react-icons/md";
import memoaAxios from "../../libs/axios/instance";
import showToast from "../../libs/toast/toast";
import "./style.css";

const Search = () => {
  const [ toggleFilter, setToggleFilter ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ userInfo, setUserInfo ] = useState({})
  const [ filter, setFilter ] = useState({search: "", tags: [], page:0, size:10});
  const [ searchResult, setSearchResult ] = useState([]);
  const observerRef = useRef(null);
  const shouldLoadMore = useRef(true);

  const [ school, setSchool ] = useState('');
  const grade = [ 1, 2, 3 ];
  const [ subjects, setSubjects ] = useState([]);

  const getMe = async () => {
    try{
      await memoaAxios.get('/auth/me').then((res) => setUserInfo(res.data))
    }catch(err){
      console.log(err)
    }
  }

  const getSchool = async () => {
    try{
      await memoaAxios.get('/school/search',  {params:{search: userInfo.department.school}})
      .then((res)=>{
        const mySchoolData = res.data.find((school) => school.name === userInfo.department.school)
        setSchool(mySchoolData.name)
        setSubjects(mySchoolData.departments.reduce((result, department)=>{
          result[department.grade - 1] = department.subjects
          return result
        }, []))
      })
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getMe()
  }, [])

  useEffect(()=>{
    if(userInfo.department){
      getSchool()
    }
  }, [userInfo])
  
  const searchPost = async () => {
    try{
      shouldLoadMore.current = true;
      setFilter(prev => ({...prev, page: 0}));
      setSearchResult([]);
      await memoaAxios.get('/post', {params: {...filter, page: 0}}).then((res)=>{
        setSearchResult(res.data)
      })
    }catch(err){
      console.log(err)
    };
  };

  const loadNextPost = async () => {
    if (!shouldLoadMore.current || isLoading) return
    setIsLoading(true)
    try{
      await memoaAxios.get('/post', {params: filter}).then((res)=>{
        if (res.data.length < filter.size) {
          setSearchResult(prev => [...prev, ...res.data]);
          shouldLoadMore.current = false;
          if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
          }
        } else {
          setSearchResult(prev => [...prev, ...res.data]);
        }
      })
    }catch(err){
      console.log(err)
    }
    setIsLoading(false)
  }

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading && shouldLoadMore.current) {
      setFilter((prev) => ({...prev, page: prev.page + 1}));
    }
  }, [isLoading]);
  
  useEffect(() => {
    if(searchResult.length >= 10){ // 현재 0페이지이고 다음 페이지가 존재할 수 있을 때

      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      const observerTarget = document.querySelector("#observer");
      
      if (observerTarget && !observerRef.current && shouldLoadMore.current) { 
        observerRef.current = new IntersectionObserver(handleObserver, {
          root: null,
          rootMargin: '20px',
          threshold: 1
        });
        observerRef.current.observe(observerTarget);
      }
      
      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }}, [handleObserver, searchResult]);

  useEffect(()=>{
    if (filter.page > 0) {
      loadNextPost();
    }
  }, [filter.page])

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = () => {
    setToggleFilter(!toggleFilter);
  };

  return (
    <div className="head-main">
      <div className="search-main-container">
        <Header />
        <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <div className="search-bar">
            <input
              type="text"
              className="search-bar-input"
              placeholder="검색어를 입력해주세요."
              value={filter.search}
              onChange={(e) => handleInput(e)}
              name="search"
            />
            <button className="search-button" onClick={() =>
              filter.tags.length === 0 && filter.search.trim().length === 0
              ? showToast('검색어 / 태그를 넣어주세요!', "ERROR")
              : searchPost()
              }
            >
              <MdSearch className="semi-icon" color="white" />
            </button>
          </div>
          <button
            className={
              !toggleFilter
              ? "search-filter-close"
              : "search-filter"
            }
            onClick={() => handleFilter()}
          >
            <MdFilterAlt
              className="semi-icon"
              color={toggleFilter == true ? "white" : "#715AFF"}
            />
          </button>
        </div>

        <div className="search-info">
          <CSSTransition
            in={!toggleFilter}
            className={"search-filter-contain"}
            timeout={200}
          >
            <div className="search-filter-contain">
              <div className="search-filter-tags">
                학교
                <div className="search-filter-real-tag">
                    <Tag
                      tagPrint={school}
                      tagStyle="filter"
                      tagName="tags"
                      setFilter={setFilter}
                      filter={filter}
                    />
                </div>
              </div>
              <div className="search-filter-tags">
                학년
                <div className="search-filter-real-tag">
                  {grade.map((item, index) => (
                    <Tag
                      key={index}
                      tagPrint={item + "학년"}
                      tagStyle="filter"
                      tagName="tags"
                      setFilter={setFilter}
                      filter={filter}
                    />
                  ))}
                </div>
              </div>
              <div className="search-filter-tags">
                과목
                {filter.tags.some((tagname) => tagname.includes('학년'))
                || <span className="search-not-pick-grade">학년을 선택해주세요.</span>
                }
                <div className="search-filter-real-tag">
                  {
                  filter.tags
                    .filter((tag) => tag.includes('학년')) // 학년 선택 정보 추출
                    .map((item) => Number(item.substr(0,1))) // n학년 부분만 자르기
                    .map((grade) => subjects[grade-1]) // index 번호로 subjects에서 찾기
                    .map((subjects) => ( 
                      subjects.map((subject, index) => ( // subjects에 포함된 학년별 배열 표시해주기
                        <Tag
                          key={index}
                          tagPrint={subject}
                          tagStyle="filter"
                          tagName="tags"
                          setFilter={setFilter}
                          filter={filter}
                        />
                      ))
                    ))
                  }
                </div>
              </div>
            </div>
          </CSSTransition>
        </div>

        <Post post={searchResult}/>
        {isLoading && <p className="search-loading">메모를 불러오는 중...</p>}
        { shouldLoadMore.current && <div id="observer"/>}
      </div>
    </div>
  );
};

export default Search;
