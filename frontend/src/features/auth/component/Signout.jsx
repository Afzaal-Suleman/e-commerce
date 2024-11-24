import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { signout } from '../authApi';

const Signout = () => {
  const user = useSelector((state) => state.user.loggedInUser.accessToken);


  const dispatch = useDispatch();
  dispatch(signout(user))
  return (
    <Navigate to='/'></Navigate>
  )
}

export default Signout