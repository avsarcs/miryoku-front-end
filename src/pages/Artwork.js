import React, { useRef } from "react"
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

    const [comment, setComment] = useState({
        "artworkID": props.artwork._id,
        "commenterID": props.hasAuth ? props.user._id : -1,
        "dateCreated": (new Date()).toISOString(),
        "body": ""
    });

    const [commentButtonStyle, setCommentButtonStyle] = useState({
        "display": "none"
    })

    const commentBarRef = useRef(null)

    const [commentBarStyle, setCommentBarStyle] = useState({
        "borderColor": "lightgray"
    })

    // Make the comment bar grow or shrink accordingly as new lines are entered or deleted.
    React.useEffect(() => {
        const commentBar = commentBarRef.current

        const adjustCommentBarHeight = () => {
            commentBar.style.height = "auto"
            commentBar.style.height = `${commentBar.scrollHeight}px`
        }

        const handleInput = () => {
            adjustCommentBarHeight()
        }

        commentBar.addEventListener("input", handleInput)

        return () => {
            commentBar.removeEventListener("input", handleInput)
        }

    }, [])

    // Change comment string when the user writes new stuff.
    function handleComment(e) {

        const { value } = e.target
        setComment( (comment) => {
            return {
                ...comment,
                "body": value
            }
        });
    }

    // Show the submit comment button only if the comment bar is clicked.
    function commentBarClicked(e) {

        setCommentBarStyle({
            "borderColor": "black"
        })

        setCommentButtonStyle({
            "display": "block"
        })
    }

    function commentBarUnclicked(e) {

        setCommentBarStyle({
            "borderColor": "lightgray"
        })

        setCommentButtonStyle({
            "display": "none"
        })
    }

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
                            props.hasAuth && (
                            <form>
                                <div className="comment-submit-container">
                                    <textarea ref={commentBarRef} rows="1" id="commentTextArea" className="comment-bar" name="commentText" style={commentBarStyle} value={comment.body}
                                        placeholder="Write a comment.." onClick={commentBarClicked} onChange={handleComment}/>
                                    <div className="comment-submit-buttons" style={commentButtonStyle}>
                                        <button className="comment-button" onClick={commentBarUnclicked} type="button">Cancel</button>
                                        <button className="comment-button" type="submit">Submit</button>
                                    </div>
                                </div>
                            </form>
                            )
                        }
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