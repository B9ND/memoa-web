import { useState } from "react";
import Tag from "../Tag/Tag";
import "./index.css";

/* eslint-disable */
const HomeSelector = ({ setBoard, board }) => {
  const [ selecter, setSelecter ] = useState({'select':[]})
  
  return (
    <div className="selecter-container">
      학년 선택
      <div className="selecter-tags">
        <Tag tagPrint={'1학년'} tagName={'select'} canActive={true} filter={selecter} setFilter={setSelecter}/>
        <Tag tagPrint={'2학년'} tagName={'select'} canActive={true} filter={selecter} setFilter={setSelecter}/>
        <Tag tagPrint={'3학년'} tagName={'select'} canActive={true} filter={selecter} setFilter={setSelecter}/>
      </div>
    </div>
  );
};

export default HomeSelector;
