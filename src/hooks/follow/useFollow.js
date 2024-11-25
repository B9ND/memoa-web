import { useState } from 'react'
import memoaAxios from '../../libs/axios/instance';

const useFollow = ( ) => {
  const [ followings, setFollowings ] = useState([]);
  const [ followers, setFollowers ] = useState([]);

  const getFollowings = async (username) => {
    try{
      await memoaAxios.get('/follow/followings', {params: {nickname : username}})
      .then((res) => setFollowings(res.data))
    }catch(err){
      console.log(err)
    }
  }
  
  const getFollowers = async (username) => {
    try{
      await memoaAxios.get('/follow/followers', {params: {nickname : username}})
      .then((res) => setFollowers(res.data))
    }catch(err){
      console.log(err)
    }
  }
  return {
    getFollowings,
    getFollowers,
    followings,
    followers,
  }
}
export default useFollow;