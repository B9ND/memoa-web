/* eslint-disable react/prop-types */
import { useState } from "react";
import "./index.css";
import { FaPlus } from "react-icons/fa6";

const Tag = ({
  tagPrint,
  tagStyle,
  tagType = "button",
  tagName,
  RadioValue,
  setRadioValue,
}) => {
  const [choiced, setChoiced] = useState(false);

  const toggleChoice = () => {
    setChoiced(!choiced);
  };

  return tagStyle == "filter" ? (
    <>
      {RadioValue.tagName == tagPrint ? (
        <label className="tag-filter-choiced">
          <input
            className="filter-button"
            type="radio"
            onClick={() => {
              setRadioValue({ ...RadioValue, tagName: null })
              this.radiochecked = false
            }}
            name={tagName}
          />
          <FaPlus color="white" />
          {tagPrint}
        </label>
      ) : (
        <label className="tag-filter">
          <input
            className="filter-button"
            type="radio"
            onClick={() => setRadioValue({ ...RadioValue, tagName: tagPrint })}
            name={tagName}
          />
          <FaPlus color="#6D6D6E" />
          {tagPrint}
        </label>
      )}
    </>
  ) : (
    <>
      {choiced == true ? (
        <label>
          <input
            className="tag-choiced"
            onClick={() => toggleChoice()}
            type={tagType}
          />
          {tagPrint}
        </label>
      ) : (
        <label>
          <input
            className="tag"
            onClick={() => toggleChoice()}
            type={tagType}
          />
          {tagPrint}
        </label>
      )}
    </>
  );
};

export default Tag;
