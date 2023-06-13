import React from "react";
import levelBoundaries from "../dummyData/level-boundaries.json"

export default function StatsWidget(props) {

    const levelProgress = ( props.user.xp / levelBoundaries[props.user.level - 1] ) * 100

    return (
        <div className="stats-widget-container">
            Your current stats:<br />
            <span className="user-stat">| {props.user.title}</span>
            <span className="user-stat"><div className="jump-a-line"/>| Points: {props.user.points}</span>
            <span className="user-stat"><div className="jump-a-line"/>| Level: {props.user.level}</span>
            <span className="user-stat"><div className="jump-a-line"/> {props.user.xp} / {levelBoundaries[props.user.level - 1]} xp for the next level {`(${levelProgress.toFixed(0)}%)`} </span>

            {/* Progress Bar */}
            <div className="meter">
	            <span style={{width: `${levelProgress}%`}}></span>
            </div>
            
        </div>
    )
}