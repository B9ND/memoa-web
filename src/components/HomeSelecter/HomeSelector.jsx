import "./index.css";

/* eslint-disable */
const HomeSelector = ({ setBoard, board }) => {

  const boardchange = (boardName) => {
    setBoard(boardName);
  };

  return (
    <div className="selecters">
      <button
        className={board == "follow" ? "selecter" : "selected"}
        onClick={() => boardchange("follow")}
      >
        팔로우
      </button>
      <button
        className={board == "new" ? "selecter" : "selected"}
        onClick={() => boardchange("new")}
      >
        최신순
      </button>
    </div>
  );
};

export default HomeSelector;
