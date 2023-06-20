import React from 'react'
import Users from "../dummyData/dummy-user.json"

export default function Reply(props) {

    const { reply } = props;

    // Fetch the necessary details (that will be shown on the reply) of the User who wrote the reply.
    const { name, level } = Users.filter( user => parseInt(user._id) === parseInt( reply.ownerID ) )[0]

    return (
        <div className='reply-container'>
            <div className='reply-body'>{reply.body}</div>
            <div className='reply-details'>
                <div className='reply-detail'>{name}</div>
                <div className='reply-detail'>| Level {level}</div>
            </div>
        </div>
    )
}