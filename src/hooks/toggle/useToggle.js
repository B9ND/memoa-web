import { useCallback, useEffect, useRef, useState } from "react"
import memoaAxios from "../../libs/axios/instance";

const useToggle = ( apiReq, deps ) => {
  const [ state, setState ] = useState(Boolean);
  const didmount = useRef(false);
  const check = useRef(null);

  const callToggleApi = useCallback( async () => {
    try{
      await memoaAxios.post(...apiReq)
    }catch(err){
      console.log(err)
    }
  }, [deps])

  const toggleContent = () => {
    didmount.current = true
    setState(prev => !prev);
    if (check.current == null) {
      check.current = state
    }
  }

  useEffect(()=>{
    if (didmount.current) {
      const timer = setTimeout(() => {
        if (check.current != state) {
          callToggleApi()
        }
        check.current = null
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [state])


  return {
    check,
    state,
    setState,
    toggleContent,
  }
}

export default useToggle