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
                <ul class="background">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <h1>Grow as an artist</h1>
                <p>Miryoku is a feedback-driven<div className="jump-a-line"></div> artwork sharing platform.</p>
                <div className="buttons">
                    <button>Sign Up</button>
                    <button>Login</button>
                </div>
            </div>
            <div className="story-two">
                <div className="artwork-container">
                    <div className="flex-column" style={{"alignItems": "center", "justifyContent": "center", "textAlign": "center"}}>
                        <div className="flex-column"
                        style={{"height": "30vh",
                                "justifyContent": "center"}}>Follow your dreams</div>
                        <div className="margin-bottom sleek-text slightly-larger">
                            <div className="margin-bottom">Miryoku aims to be a place where anyone dabbling with arts --whether they are an amateur/professional; painter, writer, cinematographer or anything else-- can come to flourish.<br/> </div>
                            <div className="margin-bottom">We believe that constant iteration and <strong>feedback</strong> create great work.<br/>
                            Therefore, we put together a system that will bring artists out of isolation.<br/>
                            </div>
                            <div className="margin-bottom">
                            For aspiring artists, working in isolation is not only boring but also ineffective.<br/>
                            To realistically assess the greatness of your craft, enjoy life and improve, you need a <strong>community</strong>.</div>
                            <div className="margin-bottom">This is exactly what Miryoku provides.</div>
                            <div className="margin-bottom">
                            Click to <u>create a profile</u> and share your artwork with others today.<br/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            </div>
            </>
        )
    }
}