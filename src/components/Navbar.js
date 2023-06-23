import React from "react"
import { Link } from "react-router-dom"

export default function Navbar(props) {
    return (
        <>
            <nav className="top-navbar">
                    <Link to="/" className="navbar-title">Miryoku</Link>
                <div className="navbar-links">
                    <Link className="navbar-link">Send Us Feedback</Link>
                    <Link className="navbar-link">Code of Conduct</Link>
                    <Link className="navbar-link">About</Link>
                    {props.hasAuth ? <Link to="/profile" className="navbar-link">Your Profile</Link> : <Link className="navbar-link">Login</Link>}
                </div>
            </nav>
        </>
    )
}