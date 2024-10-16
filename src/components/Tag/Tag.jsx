/* eslint-disable react/prop-types */
import { useState } from "react";
import "./index.css";
import { FaPlus } from "react-icons/fa6";

const Tag = ({ tagPrint, tagStyle, setFilter, tagName, filter }) => {
  const [choiced, setChoiced] = useState(false);

  const toggleChoice = () => {
    setChoiced(!choiced);
    if(filter[tagName].includes(tagPrint)){
      const result = filter[tagName].filter((v)=>v!==tagPrint)
      setFilter((prev)=>{
        return{...prev, [tagName]:result}
      }
      )}
    else{
      setFilter((prev)=>{
        const t = tagName
        return{...prev, [t]:[...(prev[t] || []), tagPrint]}
        })
    }
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
          <button
            className="tag-choiced"
            onClick={() => toggleChoice()}
          >
          {tagPrint}
          </button>
      ) : (
          <button
            className="tag"
            onClick={() => toggleChoice()}
          >
          {tagPrint}
          </button>
      )}
    </>
  )
};

export default Tag;
