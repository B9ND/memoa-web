/* eslint-disable */
const FixingBox = ({ userInfo, setUserInfo, isFix, whatFix }) => {
  let fixing = <div></div>;

  const handleSetting = (e) => {
    const { name, value } = e.target
    setUserInfo((prev)=>({...prev, [name]:value}))
  }

  switch (whatFix) {
    case "description":
      if (isFix == true) {
        fixing = (
          <textarea
            type="text"
            className="setting-intro-fixing"
            name={whatFix}
            placeholder={userInfo.description}
            value={userInfo.description}
            onChange={handleSetting}
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
            name={whatFix}
            placeholder={userInfo.email}
            onChange={handleSetting}
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
            name={whatFix}
            placeholder={userInfo.school}
            onChange={handleSetting}
          />
        );
      } else {
        fixing = <div className="setting-contain">{userInfo.school}</div>;
      }
      break;
    case "nickname":
      if (isFix == true) {
        fixing = (
          <input
            type="text"
            className="setting-user-name-fixing"
            name={whatFix}
            placeholder={userInfo.nickname}
            onChange={handleSetting}
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
