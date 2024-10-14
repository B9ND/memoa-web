import "./index.css";
import { MdOutlineComment, MdBookmarkBorder } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const Post = () => {
  const titleList = [
    {
      id: 1,
      name: "지존진교",
      profileImg: "../src/assets/profile-img.png",
      title: "국어 고1 천재 1-2 노트필기 공유합니다",
      day: "2024.08.33",
      mainImg: "../src/assets/main-img.png",
      commentCount: 999,
      heartCount: 999,
      isBookmark: false,
      subTag: "국어",
      rankTag: "고등",
      gradeTag: "1학년",
    },
    {
      id: 2,
      name: "지존진교",
      profileImg: "../src/assets/profile-img.png",
      title: "오늘은 하루 순공 12시간을 하면서 깨달은 바를 기록하겠습니다.",
      day: "2024.09.09",
      mainImg: "../src/assets/profile-img-two.png",
      commentCount: 999,
      heartCount: 999,
      isBookmark: false,
      subTag: "수학",
      rankTag: "고등",
      gradeTag: "1학년",
    },
    {
      id: 3,
      name: "지존진교",
      profileImg: "../src/assets/profile-img.png",
      title: "과학 꿀팁 공유합니다!",
      day: "2024.09.10",
      mainImg: "../src/assets/image.png",
      commentCount: 10,
      heartCount: 100,
      isBookmark: false,
      subTag: "과학",
      rankTag: "고등",
      gradeTag: "1학년",
    },
    {
      id: 4,
      name: "지존진교",
      profileImg: "../src/assets/profile-img.png",
      title: "⭐️ 프리드리히 니체 명언 ⭐️",
      day: "2024.08.09",
      mainImg: "../src/assets/boardImg.png",
      commentCount: 998,
      heartCount: 999,
      isBookmark: false,
      subTag: "국어",
      rankTag: "고등",
      gradeTag: "1학년",
    },
    {
      id: 1,
      name: "지존진교",
      profileImg: "../src/assets/profile-img.png",
      title: "국어 고1 천재 1-2 노트필기 공유합니다",
      day: "2024.08.33",
      mainImg: "../src/assets/main-img.png",
      commentCount: 999,
      heartCount: 999,
      isBookmark: false,
      subTag: "국어",
      rankTag: "고등",
      gradeTag: "1학년",
    },
    {
      id: 2,
      name: "지존진교",
      profileImg: "../src/assets/profile-img.png",
      title: "오늘은 하루 순공 12시간을 하면서 깨달은 바를 기록하겠습니다.",
      day: "2024.09.09",
      mainImg: "../src/assets/profile-img-two.png",
      commentCount: 999,
      heartCount: 999,
      isBookmark: false,
      subTag: "수학",
      rankTag: "고등",
      gradeTag: "1학년",
    },
    {
      id: 3,
      name: "지존진교",
      profileImg: "../src/assets/profile-img.png",
      title: "과학 꿀팁 공유합니다!",
      day: "2024.09.10",
      mainImg: "../src/assets/image.png",
      commentCount: 10,
      heartCount: 100,
      isBookmark: false,
      subTag: "과학",
      rankTag: "고등",
      gradeTag: "1학년",
    },
    {
      id: 4,
      name: "지존진교",
      profileImg: "../src/assets/profile-img.png",
      title: "⭐️ 프리드리히 니체 명언 ⭐️",
      day: "2024.08.09",
      mainImg: "../src/assets/boardImg.png",
      commentCount: 998,
      heartCount: 999,
      isBookmark: false,
      subTag: "국어",
      rankTag: "고등",
      gradeTag: "1학년",
    },
    {
      id: 1,
      name: "지존진교",
      profileImg: "../src/assets/profile-img.png",
      title: "국어 고1 천재 1-2 노트필기 공유합니다",
      day: "2024.08.33",
      mainImg: "../src/assets/main-img.png",
      commentCount: 999,
      heartCount: 999,
      isBookmark: false,
      subTag: "국어",
      rankTag: "고등",
      gradeTag: "1학년",
    },
    {
      id: 2,
      name: "지존진교",
      profileImg: "../src/assets/profile-img.png",
      title: "오늘은 하루 순공 12시간을 하면서 깨달은 바를 기록하겠습니다.",
      day: "2024.09.09",
      mainImg: "../src/assets/profile-img-two.png",
      commentCount: 999,
      heartCount: 999,
      isBookmark: false,
      subTag: "수학",
      rankTag: "고등",
      gradeTag: "1학년",
    },
    {
      id: 3,
      name: "지존진교",
      profileImg: "../src/assets/profile-img.png",
      title: "과학 꿀팁 공유합니다!",
      day: "2024.09.10",
      mainImg: "../src/assets/image.png",
      commentCount: 10,
      heartCount: 100,
      isBookmark: false,
      subTag: "과학",
      rankTag: "고등",
      gradeTag: "1학년",
    },
    {
      id: 4,
      name: "지존진교",
      profileImg: "../src/assets/profile-img.png",
      title: "⭐️ 프리드리히 니체 명언 ⭐️",
      day: "2024.08.09",
      mainImg: "../src/assets/boardImg.png",
      commentCount: 998,
      heartCount: 999,
      isBookmark: false,
      subTag: "국어",
      rankTag: "고등",
      gradeTag: "1학년",
    },
    {
      id: 1,
      name: "지존진교",
      profileImg: "../src/assets/profile-img.png",
      title: "국어 고1 천재 1-2 노트필기 공유합니다",
      day: "2024.08.33",
      mainImg: "../src/assets/main-img.png",
      commentCount: 999,
      heartCount: 999,
      isBookmark: false,
      subTag: "국어",
      rankTag: "고등",
      gradeTag: "1학년",
    },
    {
      id: 2,
      name: "지존진교",
      profileImg: "../src/assets/profile-img.png",
      title: "오늘은 하루 순공 12시간을 하면서 깨달은 바를 기록하겠습니다.",
      day: "2024.09.09",
      mainImg: "../src/assets/profile-img-two.png",
      commentCount: 999,
      heartCount: 999,
      isBookmark: false,
      subTag: "수학",
      rankTag: "고등",
      gradeTag: "1학년",
    },
    {
      id: 3,
      name: "지존진교",
      profileImg: "../src/assets/profile-img.png",
      title: "과학 꿀팁 공유합니다!",
      day: "2024.09.10",
      mainImg: "../src/assets/image.png",
      commentCount: 10,
      heartCount: 100,
      isBookmark: false,
      subTag: "과학",
      rankTag: "고등",
      gradeTag: "1학년",
    },
    {
      id: 4,
      name: "지존진교",
      profileImg: "../src/assets/profile-img.png",
      title: "⭐️ 프리드리히 니체 명언 ⭐️",
      day: "2024.08.09",
      mainImg: "../src/assets/boardImg.png",
      commentCount: 998,
      heartCount: 999,
      isBookmark: false,
      subTag: "국어",
      rankTag: "고등",
      gradeTag: "1학년",
    },
    {
      id: 1,
      name: "지존진교",
      profileImg: "../src/assets/profile-img.png",
      title: "국어 고1 천재 1-2 노트필기 공유합니다",
      day: "2024.08.33",
      mainImg: "../src/assets/main-img.png",
      commentCount: 999,
      heartCount: 999,
      isBookmark: false,
      subTag: "국어",
      rankTag: "고등",
      gradeTag: "1학년",
    },
    {
      id: 2,
      name: "지존진교",
      profileImg: "../src/assets/profile-img.png",
      title: "오늘은 하루 순공 12시간을 하면서 깨달은 바를 기록하겠습니다.",
      day: "2024.09.09",
      mainImg: "../src/assets/profile-img-two.png",
      commentCount: 999,
      heartCount: 999,
      isBookmark: false,
      subTag: "수학",
      rankTag: "고등",
      gradeTag: "1학년",
    },
    {
      id: 3,
      name: "지존진교",
      profileImg: "../src/assets/profile-img.png",
      title: "과학 꿀팁 공유합니다!",
      day: "2024.09.10",
      mainImg: "../src/assets/image.png",
      commentCount: 10,
      heartCount: 100,
      isBookmark: false,
      subTag: "과학",
      rankTag: "고등",
      gradeTag: "1학년",
    },
    {
      id: 4,
      name: "지존진교",
      profileImg: "../src/assets/profile-img.png",
      title: "⭐️ 프리드리히 니체 명언 ⭐️",
      day: "2024.08.09",
      mainImg: "../src/assets/boardImg.png",
      commentCount: 998,
      heartCount: 999,
      isBookmark: false,
      subTag: "국어",
      rankTag: "고등",
      gradeTag: "1학년",
    },
    {
      id: 5,
      name: "지존진교",
      profileImg: "../src/assets/profile-img.png",
      title: "🙋‍♀️ 오늘 스카 가기 전 what's in my bag 💼",
      day: "2024.08.09",
      mainImg: "../src/assets/main-img-three.png",
      commentCount: 100,
      heartCount: 100,
      isBookmark: false,
      subTag: "국어",
      rankTag: "고등",
      gradeTag: "1학년",
    },
  ];
  return (
    <>
      <div className="all-container">
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 900: 1, 1000: 2, 1300: 3 }}
          style={{
            width: "fit-content",
          }}
        >
          <Masonry gutter={"30px"} style={{width:"1020px"}}>
            {titleList.map((post, index) => {
              return (
                <div key={index} className="post-container">
                  <div className="post-head">
                    <img src={post.profileImg} />
                    <div className="user-name">{post.name}</div>
                    <div className="post-dot">•</div>
                    <span>{post.day}</span>
                  </div>
                  <div className="main-img">
                    <img src={post.mainImg} />
                  </div>
                  <div className="post-footer">
                    <div className="icons">
                      <div className="post-state">
                        <div className="post-comment">
                          <MdOutlineComment
                            style={{ width: "24px", height: "24px" }}
                          />
                          <span>
                            {post.commentCount >= 999
                              ? "999+"
                              : post.commentCount}
                          </span>
                        </div>
                        <div className="post-heart">
                          <FaRegHeart
                            style={{ width: "24px", height: "24px" }}
                          />
                          <span>
                            {post.heartCount >= 999 ? "999+" : post.heartCount}
                          </span>
                        </div>
                      </div>
                      <div className="post-state-two">
                        <MdBookmarkBorder
                          style={{ width: "28px", height: "28px" }}
                        />
                      </div>
                    </div>
                    <div className="post-board">
                      <div className="post-tag">
                        <div>{post.subTag}</div>
                        <div>{post.rankTag}</div>
                        <div>{post.gradeTag}</div>
                      </div>
                    </div>
                    <div className="post-title">{post.title}</div>
                  </div>
                </div>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
};

export default Post;
