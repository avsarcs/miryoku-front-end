import React, { useState, useRef } from 'react'
import Reply from './Reply';
import Users from '../dummyData/dummy-user.json'
import Replies  from '../dummyData/dummy-replies.json'
import FlagOverlay from './FlagOverlay';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';  

export default function Comment(props) {
    const { comment } = props;

    const commentID = parseInt(comment._id);

    const [userLikedComment, setUserLikedComment] = useState(
        props.user.likedComments.filter( commentID => parseInt(commentID) === parseInt(comment._id))[0] != null
    )

    // Represent a reply as an object (going to be stored in the database)
    const [ reply, setReply ] = useState({
        "parentID": comment._id,
        "body": "",
        "ownerID": props.user._id,
        "for": "comment",
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


    // Like comment
    // Written as a placeholder in front-end because server-side code is required to actually implement this functionality.
    function likeComment(e) {
        // Add the comment id to user's likedComments array

        setUserLikedComment(true)

        // Increment like
    }

    // Unlike comment
    // Written as a placeholder in front-end because server-side code is required to actually implement this functionality.
    function unlikeComment(e) {
        // Remove the comment id from user's likedComments array

        setUserLikedComment(false)

        // Decrement like
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
    const replies = Replies.filter( reply => parseInt(reply.parentID) === commentID).filter(reply => reply.for === "comment")
    const replyCount = replies.length

    // Keep track of whether the reply section is open or not
    const [ repliesOpen, setRepliesOpen ] = useState(false);

    // Fetch the necessary details (that will be shown on the comment box) of the User who wrote the comment.
    const { name, level } = Users.filter( user => parseInt(user._id) === parseInt( comment.commenterID ) )[0]

    // Part below is related to the flag overlay functionality
    const [isFlagOverlayOpen, setIsFlagOverlayOpen] = useState(false)

    const toggleFlagOverlay = () => {
        setIsFlagOverlayOpen((prevState) => !prevState)
    }

    return (
        <div className='comment-box'>
            <FlagOverlay
                isOpen={isFlagOverlayOpen}
                onClose={toggleFlagOverlay}
                forWhat={"comment"}
                _id={comment._id}
                suspectID={comment.commenterID}
                submitterID={props.user._id}/>

            <div className='commenter-details'>
                <div className='commenter-detail'> {name} </div>
                <div className='commenter-detail'> | Level {level} </div>
            </div>
            <div className='comment-body'>
                <ReactMarkdown
                    style={{"marginTop": "0", "marginBottom": "0", "paddingTop": "0", "paddingBottom": "0"}}>
                        {comment.body}
                </ReactMarkdown>
            </div>
            <div className='comment-like-container'>
                    { "👍" }
                    { comment.likes }
                    { props.hasAuth &&
                (<button type='button' className='like-button' onClick={userLikedComment ? unlikeComment : likeComment}>
                    {userLikedComment ? "Unlike" : "Like"}</button>)
                    }
                    <button
                        style={{"all": "unset", "cursor": "pointer"}}
                        onClick={toggleFlagOverlay}>
                            <i class="fas fa-flag"/>
                    </button>
            </div>
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