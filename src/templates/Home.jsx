import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserId, getUserName } from '../reducks/users/selectores'
import { signOut } from '../reducks/users/operations'

const Home = () => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const uid = getUserId(selector)
  const username = getUserName(selector)
  return (
    <>
      <h2>HOME</h2>
      <div>USER ID：{uid}</div>
      <div>USER NAME：{username}</div>
      <button onClick={() => dispatch(signOut())}>ログアウト</button>
    </>
  )
}

export default Home