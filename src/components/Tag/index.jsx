/* eslint-disable react/prop-types */
import { useState } from "react";
import "./style.css";
import { FaPlus } from "react-icons/fa6";

const Tag = ({ tagName, tagPrint, tagStyle, filter, setFilter, canActive }) => {
  const [choiced, setChoiced] = useState(false);

  const toggleChoice = () => {
    setChoiced(!choiced);
    if (filter[tagName].includes(tagPrint)) {
      const result = filter[tagName].filter((v) => v !== tagPrint);
      setFilter((prev) => {
        return { ...prev, [tagName]: result };
      });
    } else {
      setFilter((prev) => {
        const t = tagName;
        return { ...prev, [t]: [...(prev[t] || []), tagPrint] };
      });
    }
  };

  const preventEnter = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  };

  return tagStyle == "filter" ? (
    <button
      className={choiced == true ? "tag-filter-choiced" : "tag-filter"}
      onClick={() => toggleChoice()}
      onKeyDown={preventEnter}
    >
      <FaPlus color={choiced == true ? "white" : "#6D6D6E"} />
      {tagPrint}
    </button>
  ) : (
    <>
      {canActive === true ? (
        <button
          className={choiced == true ? "tag-choiced" : "tag"}
          onClick={() => toggleChoice()}
          onKeyDown={preventEnter}
        >
          {tagPrint}
        </button>
      ) : (
        <button className="tag-notActive">{tagPrint}</button>
      )}
    </>
  );
};

export default Tag;
