import React, { useState } from 'react'
import Users from "../dummyData/dummy-user.json"

export default function Reply(props) {

    const { reply, user } = props;

    const [userLikedReply, setUserLikedReply] = useState(
        user.likedReplies.filter( replyID => parseInt(replyID) === parseInt(reply._id))[0] != null
    )

    function likeReply(e) {
        // Add the reply id to user's likedReplies array

        setUserLikedReply(true)
        
        // Increment like
    }

    function unlikeReply(e) {
        // Remove the reply id form user's likedReplies array

        setUserLikedReply(false)

        // Decrement like
    }

    // Fetch the necessary details (that will be shown on the reply) of the User who wrote the reply.
    const { name, level } = Users.filter( user => parseInt(user._id) === parseInt( reply.ownerID ) )[0]

    return (
        <div className='reply-container'>
            <div className='reply-details'>
                <div className='reply-detail'>{name}</div>
                <div className='reply-detail'>| Level {level}</div>
            </div>
            <div className='reply-body'>{reply.body}</div>
            <div className='reply-details'>
                <div className='reply-like-container'> { "👍" } { reply.likes }
                    <button type='button' className='reply-like-button' onClick={userLikedReply ? unlikeReply : likeReply}>
                    {userLikedReply ? "Unlike" : "Like"}</button>
                    </div>
            </div>
        </div>
    )
}