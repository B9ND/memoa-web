import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigator = useNavigate();

  useEffect(()=>{
    navigator('/')
    alert('없는 페이지입니다.')
  }, [])

  return (
    <>
    </>
  )
}

export default NotFound