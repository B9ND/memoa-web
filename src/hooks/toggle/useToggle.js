import { useCallback, useEffect, useRef, useState } from "react"
import memoaAxios from "../../libs/axios/instance";

const useToggle = () => {
  const [ state, setState ] = useState(false);
  const [ apiReqArray, setApiReqArray ] = useState([])
  const didmount = useRef(false);
  const check = useRef(null);

  
  const toggleContent = (apiReq) => {
    didmount.current = true
    setState(prev => !prev);
    if ( apiReqArray.length == 0 ) {
      setApiReqArray(apiReq)
    }
    if (check.current === null) {
      check.current = state
    }
  }

  const callToggleApi = useCallback( async () => {
    try{
      await memoaAxios.post(...apiReqArray)
    }catch(err){
      console.log(err)
    }
  }, [apiReqArray])

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