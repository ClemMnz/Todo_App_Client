import userService from '../../services/userService';
import {
 GET_USER
} from './types';

  export const getUser =({user, token})=> async (dispatch)=>{

    try{
      const res = await userService.getUser({user, token})

      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    }
    catch(err){
      console.log(err)
    }
  }