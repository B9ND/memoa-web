import Header from "../../components/Header"
import Ads from "../../components/Ads"
import Board from '../../components/Board'
import { useCallback, useEffect, useRef, useState } from "react"
import memoaAxios from "../../libs/axios/instance"
import './style.css'
import Tag from "../../components/Tag"
import BoardSkeleton from "../../components/BoardSkeleton"

const Home = () => {
  const [ selecter, setSelecter ] = useState({search: "", tags: [], page:0, size:10});
  const [ userInfo, setUserInfo ] = useState({})
  const [ searchResult, setSearchResult ] = useState([]);
  const [ subjects, setSubjects ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false);
  const observerRef = useRef(null);
  const shouldLoadMore = useRef(true);
  const boardRef = useRef(null);

  const getMe = async () => {
    try{
      await memoaAxios.get('/auth/me').then((res) => setUserInfo(res.data))
    }catch(err){
      console.log(err)
    }
  }

  const getSchool = async () => {
    try{
      await memoaAxios.get('/school/search',  {params:{search: userInfo.department.school}}).then((res)=>{
        const mySchoolData = res.data.find((school) => school.name === userInfo.department.school)
        setSelecter(prev => ({...prev, tags:[...prev.tags, mySchoolData.name]}))
        setSubjects([...mySchoolData.departments.find((department) => department.name === userInfo.department.name).subjects])
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

  useEffect(()=>{
    if(selecter.tags.length >= 1){
      searchBorad()
      boardRef.current.scrollTo({top:0, behavior: 'smooth'})
    }
  },[selecter.tags])

  const searchBorad = async () => {
    try{
      shouldLoadMore.current = true;
      setSelecter(prev => ({...prev, page: 0}));
      setSearchResult([]);
      await memoaAxios.get('/post', {params: {...selecter, page: 0}}).then((res)=>{
        setSearchResult(res.data)
      })
    }catch(err){
      console.log(err)
    };
  }

  const loadNextPost = async () => {
    if (!shouldLoadMore.current || isLoading) return
    setIsLoading(true)
    try{
      await memoaAxios.get('/post', {params: selecter}).then((res)=>{
        if (res.data.length < selecter.size) {
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
      setSelecter((prev) => ({...prev, page: prev.page + 1}));
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
    if (selecter.page > 0) {
      loadNextPost();
    }
  }, [selecter.page])

  return (
      <div className="head-main" ref={boardRef}>
        <Header />
        <div className="home-main">
          <div className="selecter-container">
            <div className="selecter-tags">
              <div className="selecter-tag-title">학년 선택</div>
                {[1,2,3].map((i) => <Tag key={i} tagPrint={`${i}학년`} tagName='tags' canActive={true} filter={selecter} setFilter={setSelecter}/>)}
            </div>
            <div className="selecter-tags">
              <div className="selecter-tag-title">과목</div>
              {subjects.map((item, index)=>(<Tag key={index} tagPrint={item} tagName='tags' canActive={true} filter={selecter} setFilter={setSelecter}/>))}
            </div>
          </div>
          <div className='boards' >
            <div className="board-container">
              { searchResult.length == 0
              ? Array.from({length:5}).map((_, index)=><BoardSkeleton key={index}/>)
              : searchResult.map((board, index)=>(<Board detail={board} key={index}/>))}
              {isLoading && <p className="selecter-loading">메모를 불러오는 중...</p>}
              { shouldLoadMore.current && <div id="observer"/>}
            </div>
          </div>
          <Ads />
        </div>
      </div>
  )
}

export default Home