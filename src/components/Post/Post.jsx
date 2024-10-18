import "./index.css";
import { MdOutlineComment, MdBookmarkBorder } from "react-icons/md";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const Post = () => {
  const userInfo = [
    {
      email: "Web@gmail.com",
      nickname: "지존진교",
      profileImage: "../src/assets/base-profile.png",
    },
    {
      email: "cugar@gmail.com",
      nickname: "cugar",
      profileImage:
        "https://i.pinimg.com/736x/8b/e6/6b/8be66bf6dbf168d4c4ecb99c04a3d112.jpg",
    },
  ];
  
  const titleList = [
    {
      id: 0,
      title: "제목",
      content: "내용내용",
      author: "지존진교",
      tags: ["초등", "1학년", "국어", "한국사", "고라니"],
      createdAt: "2024-10-17",
      images: ["../src/assets/boardImg.png"],
    },
  ];


  return (
    <>
      <div className="all-container">
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 900: 1, 1000: 2, 1300: 3 }}
          style={{
            width: "100%",
          }}
        >
          <Masonry gutter={"30px"} columnsCount={2}>
            {titleList.map((post, index) => {
              const user = userInfo.find(
                (user) => user.nickname === post.author
              );
              return (
                <div key={index} className="post-container">
                  <div className="post-head">
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      style={{ width: "30px", height: "30px" }}
                    />
                    <div
                      className="user-name"
                      style={{ fontSize: "14px", fontWeight: "500" }}
                    >
                      {post.author}
                    </div>
                    <div className="post-dot">•</div>
                    <div className="post-date">{post.createdAt}</div>
                  </div>
                  <div className="main-img">
                    <img src={post.images[0]}></img>
                  </div>
                  <div className="post-footer">
                    <div className="icons">
                      <div className="post-state">
                        <div className="post-comment">
                          <MdOutlineComment
                            style={{
                              width: "22px",
                              height: "22px",
                              color: "gray",
                            }}
                          />
                        </div>
                      </div>
                      <div className="post-state-two">
                        <MdBookmarkBorder
                          style={{
                            width: "25px",
                            height: "25px",
                            color: "gray",
                          }}
                        />
                      </div>
                    </div>
                    <div className="post-board">
                      <div className="post-tag">
                        {post.tags.map((tag, idx) => (
                          <div key={idx}>{tag}</div>
                        ))}
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
