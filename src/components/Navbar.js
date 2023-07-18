import React from "react"
import { Link } from "react-router-dom"

export default function Navbar(props) {

    const { user } = props

    return (
        <>
            <nav className="top-navbar">
                    <Link to="/" className="navbar-title">Miryoku</Link>
                <div className="navbar-links">
                    <Link to="/feedback" className="navbar-link">Send Us Feedback</Link>
                    <Link to="/rules" className="navbar-link">Code of Conduct</Link>
                    <Link to="/about" className="navbar-link">About</Link>
                    {props.hasAuth ? <> <Link className="navbar-link">Sign Out</Link>
                                        <Link to={"/profile/" + user._id} className="navbar-link">Your Profile</Link></> : <Link className="navbar-link">Login</Link>}
                </div>
            </nav>
        </>
    )
}