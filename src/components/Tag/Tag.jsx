import { useState } from "react";
import "./index.css";
import { FaPlus } from "react-icons/fa6";

// eslint-disable-next-line
const Tag = ({ tagName, tagStyle }) => {
  const [choiced, setChoiced] = useState(false);

  const toggleChoice = () => {
    setChoiced(!choiced);
  };

  return tagStyle == "filter" ? (
    <>
      {choiced == true ? (
        <button className="tag-filter-choiced" onClick={()=>toggleChoice()}>
          <FaPlus color="white" />
          {tagName}
        </button>
      ) : (
        <button className="tag-filter" onClick={()=>toggleChoice()}>
          <FaPlus />
          {tagName}
        </button>
      )}
    </>
  ) : (
    <div className="tag">{tagName}</div>
  );
};

export default Tag;
