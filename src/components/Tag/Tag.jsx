/* eslint-disable react/prop-types */
import { useState } from "react";
import "./index.css";
import { FaPlus } from "react-icons/fa6";

const Tag = ({ tagPrint, tagStyle }) => {
  const [choiced, setChoiced] = useState(false);

  const toggleChoice = () => {
    setChoiced(!choiced);
  };

  return tagStyle == "filter" ? (
    <>
    {choiced == true ? (
        <button className="tag-filter-choiced" onClick={() => toggleChoice()}>
          <FaPlus color="white" />
          {tagPrint}
          </button>
    ) : (
      <button className="tag-filter" onClick={() => toggleChoice()}>
          <FaPlus color='#6D6D6E' />
          {tagPrint}
        </button>
    )}
    </>
  ) : (
    <>
      {choiced == true ? (
        <label>
          <button
            className="tag-choiced"
            onClick={() => toggleChoice()}
          />
          {tagPrint}
        </label>
      ) : (
        <label>
          <button
            className="tag"
            onClick={() => toggleChoice()}
          />
          {tagPrint}
        </label>
      )}
    </>
  )
};

export default Tag;
