import React from "react";
import { useState } from "react";

export default function Feedback(props) {

    const [feedback, setFeedback] = useState("")

    const handleChange = (e) => {
        const { value } = e.target
        setFeedback((prevFeedback) => value)
    }

    const submitFeedback = () => {
        // Actually submit the feedback (back-end)
    }

    return (
        <div className="all-container">
                <div className="flex-column" style={{"alignItems": "center", "justifyContent": "center"}}>
                <div className="flex-column fancy-title" style={{"height": "30vh", "justifyContent": "center"}}>We want to hear from you :)</div>
                <div className="sleek-text margin-bottom">Share your insights, suggestions and complaints!</div>
                <textarea className="big-textbox margin-bottom" style={{"width": "40vw"}} onChange={handleChange}></textarea>
                <button type="submit" className="bordered-everywhere-button" >Submit</button>
                </div>
        </div>
    )
}