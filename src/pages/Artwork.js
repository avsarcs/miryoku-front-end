import React from "react"
import Users from "../dummyData/dummy-user.json"
import ReactMarkdown from 'react-markdown'
import Tabs from "../components/Tabs";
import Comments from "../dummyData/dummy-comments.json"
import Comment from "../components/Comment";
import { useState } from "react";

export default function Artwork(props) {

    const titleStyle = props.artwork.titleStyle;
    const bodyStyle = props.artwork.bodyStyle;

    const bodyLines = props.artwork.body.split("\\n");

    const user = Users.filter( user => parseInt(user._id) === parseInt( props.artwork.ownerID ) )[0]

    const comments = Comments.filter( comment => parseInt(comment.artworkID) === parseInt(props.artwork._id));

    const [commentsOpen, setCommentsOpen] = useState(false)

    return (
        <div className="all-container">
            <div className="artwork-container">
                <div className="artwork-title" style={titleStyle}>{props.artwork.title}</div>
                <div className="artwork-info" style={titleStyle}>by {user.name} &emsp; &emsp; {props.artwork.type}📖
                    &emsp;&emsp; <div className="jump-a-line"/> {props.artwork.rating.score} / 5.0 ({props.artwork.rating.count})</div>
                <div className="artwork-tags">
                    {
                        props.artwork.tags.map( (tag) => (
                            <label className="cool-label" style={{fontSize: "0.9em"}} >{tag}</label>
                        ) )
                    }
                </div>
                <span className="long-description">
                    {props.artwork.longDescription}
                </span>
                <div className="artwork-body" style={bodyStyle}>

                    {bodyLines.map((line) => {
                        if (line === "") {
                            return (<br/>)
                        }
                        else { return (
                        <div>
                            <ReactMarkdown>{line}</ReactMarkdown>
                        </div>
                        )}
                    }) }

                </div>
                <Tabs>
                    <div label="Comments">
                        {
                            comments.map(
                                comment => (
                                    <Comment comment={comment}/>
                                )
                            )
                        }
                    </div>
                    <div label="Feedback">
                        These are feedback.
                    </div>
                </Tabs>

            </div>
        </div>
    )
    
}