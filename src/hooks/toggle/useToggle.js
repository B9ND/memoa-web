import { useEffect, useRef, useState } from "react"

const useToggle = () => {
  const [ state, setState ] = useState(false);
  const [ apiReq, setApiReq ] = useState();
  const didmount = useRef(false);
  const check = useRef(null);

  
  const toggleContent = (callApi) => {
    didmount.current = true
    setState(prev => !prev);
    if(!apiReq){
      setApiReq(callApi)
    }
    if (check.current === null) {
      check.current = state
    }
  }

  useEffect(()=>{
    if (didmount.current) {
      const timer = setTimeout(() => {
        if (check.current != state) {
          apiReq
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