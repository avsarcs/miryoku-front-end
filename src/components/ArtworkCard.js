import React from "react";

export default function ArtworkCard(props) {
    return (
        <div className="artwork-card">
            <div className="card-artwork-info">
                <h1> {props.artwork.title} </h1>
                <span> {props.artwork.description} </span>
            </div>
            <div className="card-bottom-details">

            </div>
        </div>
    )
}