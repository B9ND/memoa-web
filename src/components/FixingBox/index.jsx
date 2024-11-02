/* eslint-disable */
const FixingBox = ({ userInfo, setUserInfo, isFix, whatFix }) => {
  const { email, description, school, department, nickname } = userInfo;

  const handleSetting = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };
  return isFix ? (
    whatFix == "description" ? (
      <textarea
        type="text"
        className="setting-description-fixing"
        name="description"
        placeholder={description}
        value={description}
        onChange={handleSetting}
      />
    ) : (
      <input
        type="text"
        className={
          whatFix == nickname
            ? "setting-user-name-fixing"
            : "setting-contain-fixing"
        }
        name={whatFix == nickname ? "nickname" : whatFix}
        placeholder={whatFix}
        value={whatFix}
        onChange={handleSetting}
      />
    )
  ) : (
    <div
      className={
        whatFix == "description"
          ? "setting-description"
          : whatFix == nickname
          ? "setting-user-name"
          : "setting-contain"
      }
    >
      {whatFix == "description" ? description : whatFix}
    </div>
  );
};

export default FixingBox;
