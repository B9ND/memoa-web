/* eslint-disable */
const FixingBox = ({ userInfo, setUserInfo, isFix, whatFix }) => {
  let fixing = <div></div>;

  const handleSetting=(e)=>{
    setUserInfo({...userInfo, [whatFix]:e.target.value})
  }

  // console.log()
  switch (whatFix) {
    case "intro":
      if (isFix == true) {
        fixing = (
          <textarea
            type="text"
            className="setting-intro-fixing"
            placeholder={userInfo.description}
            value={userInfo.description}
            onChange={()=>handleSetting}
          />
        );
      } else {
        fixing = <div className="setting-intro">{userInfo.description}</div>;
      }
      break;
    case "email":
      if (isFix == true) {
        fixing = (
          <input
            type="text"
            className="setting-contain-fixing"
            placeholder={userInfo.email}
          />
        );
      } else {
        fixing = <div className="setting-contain">{userInfo.email}</div>;
      }
      break;
    case "school":
      if (isFix == true) {
        fixing = (
          <input
            type="text"
            className="setting-contain-fixing"
            placeholder={userInfo.school}
          />
        );
      } else {
        fixing = <div className="setting-contain">{userInfo.school}</div>;
      }
      break;
    case "name":
      if (isFix == true) {
        fixing = (
          <input
            type="text"
            className="setting-user-name-fixing"
            placeholder={userInfo.nickname}
          />
        );
      } else {
        fixing = <div className="setting-user-name">{userInfo.nickname}</div>;
      }
      break;
    default:
      break;
  }
  return <>{fixing}</>;
};

export default FixingBox;
