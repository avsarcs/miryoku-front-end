import React, { useState } from 'react'
import Reply from './Reply';
import Users from '../dummyData/dummy-user.json'
import Replies  from '../dummyData/dummy-replies.json'    

export default function Comment(props) {
    const { comment } = props;

    const commentID = parseInt(comment._id);

    // Fetch replies
    const replies = Replies.filter( reply => parseInt(reply.parentID) === commentID)
    const replyCount = replies.length

    // Keep track of whether the reply section is open or not
    const [ repliesOpen, setRepliesOpen ] = useState(false);

    // Fetch the necessary details (that will be shown on the comment box) of the User who wrote the comment.
    const { name, level } = Users.filter( user => parseInt(user._id) === parseInt( comment.commenterID ) )[0]

    return (
        <div className='comment-box'>
            <div className='commenter-details'>
                <div className='commenter-detail'> {name} </div>
                <div className='commenter-detail'> | Level {level} </div>
            </div>
            <div className='comment-body'>
                {comment.body}
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
                    ( replies.map( (reply) => <Reply key={reply._id} reply={reply} /> ) ) )
            }
        </div>
    )

}