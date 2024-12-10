import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <>
            <header>
                <div className="buttons">
                    <Link to={'/login'}>
                        Login
                    </Link>
                    <Link to={'/'}>
                        Register
                    </Link>
                </div>

            </header >
        </>
    )
}

export default Header