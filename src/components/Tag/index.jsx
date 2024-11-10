/* eslint-disable react/prop-types */
import { useState } from "react";
import "./style.css";
import { FaPlus } from "react-icons/fa6";

const Tag = ({ tagName, tagPrint, tagStyle, filter, setFilter, canActive, setDefault}) => {
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
    <button className={choiced == true ? "tag-filter-choiced" : "tag-filter"} onClick={() => toggleChoice()}>
      <FaPlus color={choiced == true ? "white" : '#6D6D6E' }/>
      {tagPrint}
    </button>
  ) : (
    <>
    {canActive === true ? (
      <button
        className={choiced == true ? "tag-choiced" : "tag"}
        onClick={() => toggleChoice()}
      >
        {tagPrint}
      </button>
      ) : (
        <button
        className={setDefault ? "tag-choiced" : "tag-notActive"}
      >
        {tagPrint}
      </button>
      )
    }
    </>
  )
};

export default Tag;
