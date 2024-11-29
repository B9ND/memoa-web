/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import './style.css'

const ConetentsNotFound = ({title, subTitle, goTo}) => {
  return (
    <div className='notfound-container'>
      <div className="notfound-title">{title}</div>
      <Link to={goTo} className="notfound-subtitle">{subTitle}</Link>
    </div>
  )
}

export default ConetentsNotFound