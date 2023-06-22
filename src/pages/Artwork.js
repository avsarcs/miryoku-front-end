import React, { useRef } from "react"
import Users from "../dummyData/dummy-user.json"
import ReactMarkdown from 'react-markdown'
import Tabs from "../components/Tabs";

import Artworks from "../dummyData/dummy-artworks.json"

import Comments from "../dummyData/dummy-comments.json"
import Comment from "../components/Comment";

import Feedbacks from "../dummyData/dummy-feedbacks.json"
import Feedback from "../components/Feedback"

import StarRating from "../components/StarRating";

import { useState } from "react";
import { useParams } from "react-router-dom"

export default function Artwork(props) {

    const { id } = useParams()
    console.log(id)
    const artwork = Artworks.filter((_artwork) => _artwork._id === id)[0]

    const titleStyle = artwork.titleStyle;
    const bodyStyle = artwork.bodyStyle;

    const bodyLines = artwork.body.split("\\n");

    const user = Users.filter( user => parseInt(user._id) === parseInt( artwork.ownerID ) )[0]

    // Configure the forms for new comment and new feedback
    const comments = Comments.filter( comment => parseInt(comment.artworkID) === parseInt(artwork._id));
    const feedbacks = Feedbacks.filter( feedback => parseInt(feedback.artworkID) === parseInt(artwork._id) )

    const [comment, setComment] = useState({
        "artworkID": artwork._id,
        "commenterID": props.hasAuth ? props.user._id : -1,
        "likes": 0,
        "dateCreated": (new Date()).toISOString(),
        "body": ""
    });

    const [feedback, setFeedback] = useState({
        "artworkID": artwork._id,
        "ownerID": props.hasAuth ? props.user._id : -1,
        "usefulness": {
            "rating": 0,
            "count": 0
        },
        "body": "",
        "dateCreated": (new Date()).toISOString(),
        "dateUpdated": (new Date()).toISOString()
    })

    const [commentButtonStyle, setCommentButtonStyle] = useState({
        "display": "none"
    })

    const [feedbackButtonStyle, setFeedbackButtonStyle] = useState({
        "display": "none"
    })

    const commentBarRef = useRef(null)

    const feedbackBarRef = useRef(null)

    const [commentBarStyle, setCommentBarStyle] = useState({
        "borderColor": "lightgray"
    })

    const [feedbackBarStyle, setFeedbackBarStyle] = useState({
        "borderColor": "lightgray"
    })

    // Make the comment and feedback bar grow or shrink accordingly as new lines are entered or deleted.
    function adjustTextareaHeight(textareaRef) {
        const textarea = textareaRef.current;
        if (textarea) {
          textarea.style.height = "auto";
          textarea.style.height = `${textarea.scrollHeight}px`;
        }
      }

    // Change comment object when the user writes new stuff.
    function handleComment(e) {

        const { value } = e.target
        setComment( (comment) => {
            return {
                ...comment,
                "body": value
            }
        });

        adjustTextareaHeight(commentBarRef)
    }

    function handleFeedback(e) {
        const { value } = e.target
        setFeedback( (feedback) => {
            return {
                ...feedback,
                "body": value
            }
        });

        if (feedbackBarRef.current) {
            feedbackBarRef.current.style.paddingBottom = "0"
        }
        adjustTextareaHeight(feedbackBarRef)
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

    function feedbackBarClicked(e) {

        setFeedbackBarStyle({
            "borderColor": "black"
        })

        setFeedbackButtonStyle({
            "display": "block"
        })
    }

    function feedbackBarUnclicked(e) {

        setFeedbackBarStyle({
            "borderColor": "lightgray"
        })

        setFeedbackButtonStyle({
            "display": "none"
        })
    }

    // Make stars glow orange

    function handleStarClick(rating) {
        console.log("[PLACEHOLDER] Take the rating and make the updates to the artwork's rating..")
    }

    const [userRating, setUserRating] = useState(parseInt(props.user.awRatings[artwork._id]))

    return (
        <div className="all-container">
            <div className="artwork-container">
                <div className="artwork-title" style={titleStyle}>{artwork.title}</div>
                <div className="artwork-info" style={titleStyle}>by {user.name} &emsp; &emsp; {artwork.type}📖
                    &emsp;&emsp; <div className="jump-a-line"/> {artwork.rating.score} / 5.0 ({artwork.rating.count})</div>
                <div className="artwork-tags">
                    {
                        artwork.tags.map( (tag) => (
                            <label key={tag} className="cool-label" style={{fontSize: "0.9em"}} >{tag}</label>
                        ) )
                    }
                </div>
                <span className="long-description">
                    {artwork.longDescription}
                </span>
                <div className="artwork-body" style={bodyStyle}>

                    {bodyLines.map((line, index) => {
                        if (line === "") {
                            return (<br key={index}/>)
                        }
                        else { return (
                        <div key={index}>
                            <ReactMarkdown>{line}</ReactMarkdown>
                        </div>
                        )}
                    }) }

                </div>
               { props.hasAuth &&
                    <StarRating starCount={5} currentUserRating={userRating} handleClick={handleStarClick} />
                }
                {
                    !(props.hasAuth) && (<i className="login-warning">Login to be able to rate the artwork, comment, reply to other people and more.</i>)
                }
                <div className="tabs-wrapper">
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
                                    <Comment key={comment._id} comment={comment} user={props.user} hasAuth={props.hasAuth}/>
                                )
                            )
                        }
                    </div>
                    <div label="Feedback">
                    {
                            props.hasAuth && (
                            <form>
                                <div className="feedback-submit-container">
                                    <textarea ref={feedbackBarRef} rows="1" id="feedbackTextArea" className="feedback-bar" name="feedbackText" style={feedbackBarStyle} value={feedback.body}
                                        placeholder="Give feedback.." onClick={feedbackBarClicked} onChange={handleFeedback}/>
                                    <div className="feedback-submit-buttons" style={feedbackButtonStyle}>
                                        <button className="feedback-button" onClick={feedbackBarUnclicked} type="button">Cancel</button>
                                        <button className="feedback-button" type="submit">Submit</button>
                                    </div>
                                </div>
                            </form>
                            )
                        }
                        {
                            feedbacks.map(
                                    feedback => (
                                        <Feedback key={feedback._id} feedback={feedback} user={props.user} hasAuth={props.hasAuth} />
                                    )
                                )
                         }
                    </div>
                </Tabs>
                </div>
            </div>
        </div>
    )
    
}