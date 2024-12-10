import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const UserMaster = () => {
  return (
    <>
        <Header/>
        <Outlet/>
    </>
  )
}

export default UserMaster