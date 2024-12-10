import React from 'react'
import Chats from './Chats'
import { Outlet } from 'react-router-dom'

const Master = ({chatend}) => {
    return (
        <>
            <Chats chatend={{chatend}}/>
            <Outlet />
        </>
    )
}

export default Master