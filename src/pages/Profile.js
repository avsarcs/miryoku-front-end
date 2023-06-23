import React from "react";
import StatsWidget from "../components/StatsWidget"
import Tabs from "../components/Tabs"
import Artworks from "../dummyData/dummy-artworks.json"
import ArtworkCard from "../components/ArtworkCard";
import Feedback from "../components/Feedback";
import Feedbacks from "../dummyData/dummy-feedbacks.json"
import { useNavigate, Link } from "react-router-dom"

export default function Profile(props) {
    
    const { 
        hasAuth,
        user
    } = props

    const { profileStyle } = user

    const userArtworks = Artworks.filter((artwork) => parseInt(artwork.ownerID) === parseInt(user._id))
    const featuredFeedback = Feedbacks.filter( (feedback) => user.featuredFeedback.includes(feedback._id) )

    const navigate = useNavigate()

    React.useEffect(() => {
        if (!hasAuth) navigate("/")
    }
        , [])

    return (
        <div className="profile-wrapper">
            <div className="profile-container">
                <div className="epic-name-ego-bloat" style={profileStyle.nameStyle}>
                    {user.name}
                </div>
                <div className="epic-user-about">
                    {user.about}
                </div>
                <StatsWidget width="100%" user={user}></StatsWidget>

                <div className="skills-display">
                    { user.skills.map( (skill) => {
                        const skillKey = skill.toLowerCase() + "Xp"
                        return <label className="cool-label skill-label">{skill + " | " + user.xpBySkill[skillKey] + "xp"}</label>
                    } ) }
                </div>

                <Tabs customClass="profile">
                    <div label="Featured Artworks"> <div className="artwork-feature">
                            {
                                userArtworks.map((artwork) => {return (
                                    <ArtworkCard artwork={artwork} />
                                )})
                            }
                    </div> </div>
                    <div label="Featured Reviews (Feedbacks)"> <div className="feedback-feature">
                        {
                            featuredFeedback.map((feedback) => {return (
                                <Feedback isLinked={true} key={feedback._id} feedback={feedback} user={user} hasAuth={hasAuth} />
                            )})
                        }
                    </div></div>
                    <div label="Activity"></div>
                </Tabs>
            </div>
        </div>
    )
}