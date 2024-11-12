import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Header from "../../components/Header";
import Post from "../../components/Post";
import Tag from "../../components/Tag";
import { MdSearch, MdFilterAlt, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import memoaAxios from "../../libs/axios/instance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style.css";

const Search = () => {
  const [ toggleFilter, setToggleFilter ] = useState(false);
  const [ page, setPage ] = useState(0)
  const [ filter, setFilter ] = useState({search: "", tags: [], page:page, size:10});
  const [ searchResult, setSearchResult ] = useState([]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = () => {
    setToggleFilter(!toggleFilter);
  };

  const searchPost = async () => {
    console.log(filter)
    try{
      await memoaAxios.get('/post', {params: filter}).then((res)=>{
        setSearchResult(res.data)
      })
    }catch(err){
      console.log(err)
    };
  };

  const school = [ "중등", "고등" ];
  const grade = [ 1, 2, 3 ];
  const subject = ["국어", "사회", "수학", "영어", "과학", "한국사"];

  // const searchResult = [
  //   {
  //     id: 0,
  //     title: "string",
  //     content: "string",
  //     author: "string",
  //     authorProfileImage: "src/assets/base-profile.png",
  //     tags: ["string"],
  //     createdAt: "2024-11-03",
  //     images: ["string"],
  //   },
  //   {
  //     id: 1,
  //     title: "string",
  //     content: "string",
  //     author: "박재민",
  //     authorProfileImage: "src/assets/base-profile.png",
  //     tags: ["string"],
  //     createdAt: "2024-11-03",
  //     images: ["string"],
  //   },
  // ];

  return (
    <div className="head-main">
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
            filter.tags.length === 0 && filter.search.trim().length === 0 ?
            toast.error('검색어 / 태그를 넣어주세요!')
            : searchPost()
            }
          >
            <MdSearch className="semi-icon" color="white" />
          </button>
        </div>
        <button
          className={
            toggleFilter == false ? "search-filter-close" : "search-filter"
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
              등급
              <div className="search-filter-real-tag">
                {school.map((s, i) => (
                  <Tag
                    key={i}
                    tagPrint={s}
                    tagStyle="filter"
                    tagName="tags"
                    setFilter={setFilter}
                    filter={filter}
                  />
                ))}
              </div>
            </div>
            <div className="search-filter-tags">
              학년
              <div className="search-filter-real-tag">
                {grade.map((g, i) => (
                  <Tag
                    key={i}
                    tagPrint={g + "학년"}
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
              <div className="search-filter-real-tag">
                {subject.map((s, i) => (
                  <Tag
                    key={i}
                    tagPrint={s}
                    tagStyle="filter"
                    tagName="tags"
                    setFilter={setFilter}
                    filter={filter}
                  />
                ))}
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>

      <Post post={searchResult}/>

      {searchResult && <div className="search-page-controller">
        <MdKeyboardArrowLeft style={{
          width: '28px',
          height: '28px',
          cursor: 'pointer',
          color: page == 0 || "white"
          }}
        />
        <div className="search-page-viewer">
          <span className="search-current-page">{page <= 10 ? `0${page}` : page}</span>
        </div>
        <MdKeyboardArrowRight style={{width:'28px', height:'28px', cursor:'pointer'}} />
      </div>}
      <ToastContainer />
    </div>
  );
};

export default Search;
