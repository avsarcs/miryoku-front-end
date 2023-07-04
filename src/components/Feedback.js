import React, { useState, useRef } from 'react'
import Reply from './Reply';
import Users from '../dummyData/dummy-user.json'
import Replies  from '../dummyData/dummy-replies.json'
import Artworks from '../dummyData/dummy-artworks.json'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Link } from "react-router-dom"
import StarRating from './StarRating';

export default function Feedback(props) {
    const { feedback } = props;

    const feedbackID = parseInt(feedback._id);

    const currentUserRating = parseInt(props.user.feedbackRatings[feedback._id])

    const artwork = Artworks.filter( (artwork) => parseInt(feedback.artworkID) === parseInt(artwork._id) )[0]

    // Represent a reply as an object (going to be stored in the database)
    const [ reply, setReply ] = useState({
        "parentID": props._id,
        "body": "",
        "ownerID": props.user._id,
        "for": "feedback",
        "dateCreated": (new Date()).toISOString(),
        "dateUpdated": (new Date()).toISOString()
    })

    // Configuring the reply bar stylistically
    const [replyButtonStyle, setReplyButtonStyle] = useState({
        "display": "none"
    })

    const replyBarRef = useRef(null)

    const [replyBarStyle, setReplyBarStyle] = useState({
        "borderColor": "lightgray"
    })

    // Make the reply bar grow or shrink accordingly as new lines are entered or deleted.
    React.useEffect(() => {
        const replyBar = replyBarRef.current

        const adjustReplyBarHeight = () => {
            replyBar.style.height = "auto"
            replyBar.style.height = `${replyBar.scrollHeight}px`
        }

        const handleInput = () => {
            adjustReplyBarHeight()
        }

        if (replyBar) {
            replyBar.addEventListener("input", handleInput)
        }

        return () => {
            if (replyBar) {
                replyBar.removeEventListener("input", handleInput)
            }
        }

    }, [])

    function handleFeedbackRating(newRating) {
        // Chnage the feedbackRatings attribute of the User.
    }

    // Change reply object when the user writes new stuff.
    function handleReply(e) {

        const { value } = e.target
        setReply( (reply) => {
            return {
                ...reply,
                "body": value
            }
        });
    }

    // Show the submit reply button only if the reply bar is clicked.
    function replyBarClicked(e) {

        setReplyBarStyle({
            "borderColor": "black"
        })

        setReplyButtonStyle({
            "display": "block"
        })
    }

    function replyBarUnclicked(e) {

        setReplyBarStyle({
            "borderColor": "lightgray"
        })

        setReplyButtonStyle({
            "display": "none"
        })
    }

    // Fetch replies
    const replies = Replies.filter( reply => parseInt(reply.parentID) === feedbackID).filter(reply => reply.for === "feedback")
    const replyCount = replies.length

    // Keep track of whether the reply section is open or not
    const [ repliesOpen, setRepliesOpen ] = useState(false);

    // Fetch the necessary details (that will be shown on the comment box) of the User who wrote the comment.
    const { name, level } = Users.filter( user => parseInt(user._id) === parseInt( feedback.ownerID ) )[0]

    return (
        <div className='feedback-box'>
            <div className='feedback-details'>
                <div className='feedback-detail'> {name} </div>
                <div className='feedback-detail'> | Level {level} </div>
            </div>
            <div className='feedback-body'>
                {
                    props.isOutside ?
                        (<Link style={{"all": "unset", "cursor": "pointer"}} target="_blank" to={"/artwork/" + feedback.artworkID}>
                            <div className='faded-text'>Written for {artwork.title}</div>
                        </Link>)
                        :
                        (<></>)
                }

                    <ReactMarkdown>{feedback.body}</ReactMarkdown>
                    
            </div>
            {/* This is where the user will rate the usefulness of the feedback */}
            {
                props.hasAuth && (
                    <form>
                        <div className="reply-submit-container">
                            <textarea ref={replyBarRef} rows="1" id="replyTextArea" className="reply-bar" name="replyText" style={replyBarStyle} value={reply.body}
                                placeholder="Write a reply.." onClick={replyBarClicked} onChange={handleReply}/>
                            <div className="reply-submit-buttons" style={replyButtonStyle}>
                                <button className="reply-button" onClick={replyBarUnclicked} type="button">Cancel</button>
                                <button className="reply-button" type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                    )
            }
            <div className='usefulness-rating-container'>
                { parseInt(feedback.usefulness.count) !== 0 && (<div className="usefulness-stat">This feedback has a usefulness rating of {feedback.usefulness.rating} out of 10
                    {" (" + feedback.usefulness.count + (parseInt(feedback.usefulness.count) === 1 ? " person" : " people" ) + " voted)"}</div>)}
                {
                    props.hasAuth && (<>
                    <div className='rating-call-to-action'>How helpful do you find {parseInt(feedback.usefulness.count) === 0 ? " this feedback?" : " it?"}</div>
                    <StarRating starCount={10} currentUserRating={currentUserRating} handleClick={handleFeedbackRating} />
                    </>
                    )
                }
            </div>
            {
                // Render the reply toggle button only if there is any.
                replyCount > 0 && (
                    <button className='toggle-replies-button' onClick={
                        () => {
                            setRepliesOpen( repliesOpen => !repliesOpen )
                        }
                    }>  {repliesOpen ? "Hide " : "Show "} {replyCount} {replyCount > 1 ? "replies" : "reply"}</button>
                )
            }

            {

                // Render the replies only if there is any and the replies have been opened.
                replyCount > 0 && ( repliesOpen &&
                    ( replies.map( (reply) => <Reply key={reply._id} reply={reply} user={props.user} hasAuth={props.hasAuth} /> ) ) )
            }
        </div>
    )

}