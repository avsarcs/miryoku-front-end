import React from "react"
import Feed from "../components/Feed"

export default function Home(props) {

    if (props.hasAuth) {

        // JSX when the user is signed in.
        return (
            <>
                <Feed user={props.user} artworks={props.artworks}/>
            </>
        )
    } else {

        // JSX when the user is not signed in.
        return (
            <>
            <div className="stories">
            <div className="story-one">
                <h1>Grow as an artist</h1>
                <p>Miryoku is a feedback-driven<div className="jump-a-line"></div> artwork sharing platform.</p>
                <div className="buttons">
                    <button>Sign Up</button>
                    <button>Login</button>
                </div>
            </div>


            </div>
            </>
        )
    }
}