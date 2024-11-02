import { useEffect, useState } from "react"
import Header from "../../components/Header"
import './style.css'
import FixingBox from "../../components/FixingBox"
import memoaAxios from "../../libs/axios/instance"
import { useNavigate } from "react-router-dom"
import { ImPencil } from "react-icons/im";
import { MdClose } from "react-icons/md";

const Setting = () => {

  const navigate = useNavigate();

  const [ isFixing, setIsFixing ] = useState(false);
  const [ userInfo, setUserInfo ] = useState({
    email: "",
    nickname: "",
    description: "",
    profileImage: "",
  })

  const getMe = async () => {
    try{
      await memoaAxios.get('/auth/me').then((res) => setUserInfo(res.data))
    }catch(err){
      navigate('/login')
      console.log('로그인하세요', err)
    }
  }

  const patchMe = async () => {
    try{
      await memoaAxios.patch('/auth/me', userInfo).then(() => getMe())
    }catch(err){
      console.log(err)
    }
  }

  const handleProfileImg = (e) => {
    const { files } = e.target;
    const uploadFile = files[0];

    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = ()=> {
      setUserInfo((prev) => ({...prev, profileImage: reader.result}));
    }
  }

  const deleteProfileImg = () => {
    setUserInfo((prev) => ({...prev, ['profileImage']: 'https://memoa-s3.s3.ap-northeast-2.amazonaws.com/profile.jpg'}))
  }

  useEffect(()=>{
    getMe()
  },[])

  return (
      <div className="head-main">
        <Header/>
        <div className="page-name">설정</div>
        <div className="setting-main">
          <div className="settings">
            <div className="setting-container">
              <div className="setting-profile">
                <div className="setting-profile-img-container">
                  {isFixing && (
                  <>
                    <button className="setting-profile-img-delete" onClick={deleteProfileImg}><MdClose color="white" className="mini-icon"/></button>
                    <label htmlFor="file" className="setting-profile-img-insert">
                        <div className="setting-profile-img-insert"><ImPencil color="white" className="normal-icon"/></div>
                    </label>
                    <input type="file" id="file" accept="image/*" onChange={handleProfileImg}/>
                  </>
                  )
                }
                <img alt="" className="setting-profile-img" src={userInfo.profileImage}/>
                </div>
                <div className="setting-user-info">
                  <FixingBox userInfo={userInfo} setUserInfo={setUserInfo} isFix={isFixing} whatFix={userInfo.nickname} />
                  <FixingBox userInfo={userInfo} setUserInfo={setUserInfo} isFix={isFixing} whatFix={'description'} />
                </div>
              </div>
              <div className="setting-at">
                <div className="setting-heading">이메일</div>
                <div className="setting-view-email">{userInfo.email}</div>
              </div>
              <div className="setting-at">
                <div className="setting-heading">학교</div>
                <FixingBox userInfo={userInfo} setUserInfo={setUserInfo} isFix={isFixing} whatFix={'school'}/>
              </div>
              <div className="setting-at">
                <div className="setting-heading">학과</div>
                <FixingBox userInfo={userInfo} setUserInfo={setUserInfo} isFix={isFixing} whatFix={'department'}/>
              </div>
              <div className="setting-fix">
                <button className="setting-fix-button" onClick={()=>{setIsFixing(!isFixing); if(isFixing){patchMe()}}}>{isFixing == false ? '수정하기' : '수정 완료'}</button>
              </div>
            </div>
            <div className="setting-footer">
              서비스 정책
              <span style={{display:'flex', margin:'0'}}>
                <a href="" className="setting-terms">이용약관</a>
                <a href="" className="setting-privacy">개인정보취급방침</a>
              </span>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Setting