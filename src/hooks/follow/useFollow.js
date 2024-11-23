import { useEffect, useState } from 'react'
import memoaAxios from '../../libs/axios/instance';

const useFollow = () => {
  const [ followings, setFollowings ] = useState([]);
  const [ followers, setFollowers ] = useState([]);

  const getFollowings = async (username) => {
    try{
      await memoaAxios.get('/follow/followings', {params: {user : username}})
      .then((res) => setFollowings(res.data))
    }catch(err){
      console.log(err)
    }
  }
  
  const getFollowers = async (username) => {
    try{
      await memoaAxios.get('/follow/followers', {params: {user : username}})
      .then((res) => setFollowers(res.data))
    }catch(err){
      console.log(err)
    }
  }
  
  useEffect(()=>{
    getFollowings()
    getFollowers()
  }, [])

  return {
    getFollowings,
    getFollowers,
    followings,
    followers,
  }
}
export default useFollow;