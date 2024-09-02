import "../styles/Sidebar.css";
import {ReactComponent as ArrowSvg} from "../assets/icon/arrowLeft.svg"
import {ReactComponent as HomeSvg} from "../assets/icon/home.svg"
import {ReactComponent as CircleSvg} from "../assets/icon/circle.svg"
import {ReactComponent as PlusSvg} from "../assets/icon/plus.svg"
import {ReactComponent as SearchSvg} from "../assets/icon/search.svg"
import {ReactComponent as ProfileSvg} from "../assets/icon/profile.svg"
import {ReactComponent as BookMarkSvg} from "../assets/icon/bookmark.svg"
import {ReactComponent as PeopleSvg} from "../assets/icon/people.svg"
import {ReactComponent as SettingSvg} from "../assets/icon/setting.svg"
import {ReactComponent as HelpSvg} from "../assets/icon/help.svg"

const Sidebar = () => {
  
  return (
    <div className="container">
      <div className="sidebar">

        <div className="arrow-btn">
          <ArrowSvg/>
        </div>


        <div className="profile">
            <CircleSvg/>
            <div className="user-info">
              <div>지존진교</div>
              <span>oygnijoes0209@gmail.com</span>
            </div>
        </div>


        <div className="writeBtn">
          <PlusSvg/>
          <div>글 작성하기</div>
        </div>

        <div className="menu">

          <div className="selectOne">

              <div className="menu-lay">
                <div className="comment">
                  <HomeSvg />
                  <span>홈</span>
                </div>
              </div>

              <div className="menu-lay">
                <div className="comment">
                  <SearchSvg/>
                  <span>검색</span>
                </div>
              </div>

              <div className="menu-lay">
                <div className="comment">
                  <ProfileSvg/>
                  <span>프로필</span>
                </div>
              </div>

              <div className="menu-lay">
                <div className="comment" id="book-mark">
                    <BookMarkSvg/>
                  <span>북마크</span>
                </div>
              </div>

              <div className="menu-lay">
                <div className="comment">
                  <PeopleSvg/>
                  <span>내 학교</span>
                </div>
              </div>
              
          </div>

          <div className="selectTwo">

            <div className="menu-lay">
              <div className="comment">
                <SettingSvg/>
                <span>설정</span>
              </div>
            </div>

            <div className="menu-lay">
              <div className="comment">
                <HelpSvg/>
                <span>도움말</span>
              </div>
            </div>

          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Sidebar;