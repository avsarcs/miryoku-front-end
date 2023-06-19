import React from "react";
import Users from "../dummyData/dummy-user.json"

export default function ArtworkCard(props) {

    const user = Users.filter( user => parseInt(user._id) === parseInt( props.artwork.ownerID ) )[0]

    return (
        <div className="artwork-card">
            <div className="card-artwork-info">
                <h1> {props.artwork.title} </h1>
                <span> {props.artwork.description} </span>
            </div>
            <div className="card-bottom-details">
                <div className="detail">by {user.name}</div>
                <div className="detail">{props.artwork.type}</div>
                <div className="detail">{props.artwork.rating.score} / 5.0 ({props.artwork.rating.count})</div>
            </div>
        </div>
    )
}