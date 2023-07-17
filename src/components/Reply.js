import React, { useState } from 'react'
import Users from "../dummyData/dummy-user.json"
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'; 
import FlagOverlay from './FlagOverlay';

export default function Reply(props) {

    const { reply, user } = props;

    const [userLikedReply, setUserLikedReply] = useState(
        reply.for === "comment" ? user.likedCommentReplies.filter( replyID => parseInt(replyID) === parseInt(reply._id))[0] != null
            : user.likedFbReplies.filter( replyID => parseInt(replyID) === parseInt(reply._id))[0] != null
    )

    function likeReply(e) {
        // Add the reply id to user's likedCommentReplies or likedFbReplies array

        setUserLikedReply(true)
        
        // Increment like
    }

    function unlikeReply(e) {
        // Remove the reply id form user's likedCommentReplies or likedFbReplies array

        setUserLikedReply(false)

        // Decrement like
    }

    // Fetch the necessary details (that will be shown on the reply) of the User who wrote the reply.
    const { name, level } = Users.filter( user => parseInt(user._id) === parseInt( reply.ownerID ) )[0]

    // Part below is related to the flag overlay functionality
    const [isFlagOverlayOpen, setIsFlagOverlayOpen] = useState(false)

    const toggleFlagOverlay = () => {
        setIsFlagOverlayOpen((prevState) => !prevState)
    }

    return (
        <div className='reply-container'>
            <FlagOverlay
                isOpen={isFlagOverlayOpen}
                onClose={toggleFlagOverlay}
                forWhat={"reply"}
                _id={reply._id}
                suspectID={reply.ownerID}
                submitterID={user._id}/>

            <div className='reply-details'>
                <div className='reply-detail'>{name}</div>
                <div className='reply-detail'>| Level {level}</div>
            </div>
            <div className='reply-body'>
                {reply.body}
            </div>
            <div className='reply-details'>
                <div className='reply-like-container'> { "👍" } { reply.likes }
                    { props.hasAuth && (<button type='button' className='reply-like-button margin-right' onClick={userLikedReply ? unlikeReply : likeReply}>
                    {userLikedReply ? "Unlike" : "Like"}</button>)}
                    <button
                        style={{"all": "unset", "cursor": "pointer"}}
                        onClick={toggleFlagOverlay}>
                            <i class="fas fa-flag"/>
                    </button>
                    </div>
            </div>
        </div>
    )
}