import React, { useState } from "react";
import StatsWidget from "../components/StatsWidget"
import Tabs from "../components/Tabs"
import Artworks from "../dummyData/dummy-artworks.json"
import ArtworkCard from "../components/ArtworkCard";
import Feedback from "../components/Feedback";
import Overlay from "../components/Overlay";

import Feedbacks from "../dummyData/dummy-feedbacks.json"
import Users from "../dummyData/dummy-user.json"

import { useNavigate, Link, useParams } from "react-router-dom"

export default function Profile(props) {
    
    const { 
        hasAuth,
        user
    } = props

    const { id } = useParams()

    const profileOwner = Users.filter((user) => parseInt(user._id) === parseInt(id))[0]

    const { profileStyle } = user

    const userArtworks = Artworks.filter((artwork) => parseInt(artwork.ownerID) === parseInt(profileOwner._id))
    const featuredFeedback = Feedbacks.filter( (feedback) => profileOwner.featuredFeedback.includes(feedback._id) )

    const featuredArtworksExist = profileOwner.featuredArtworks.length !== 0;
    const featuredFeedbackExist = profileOwner.featuredFeedback.length !== 0;

    const ownProfile = parseInt(user._id) === parseInt(id)

    const navigate = useNavigate()

    React.useEffect(() => {
        if (!hasAuth) navigate("/")
    }
        , [])

    // Part below until the return statement is related to the functionality of the overlay that lets the user customize their profile
    const [isCustomizeOverlayOpen, setIsCustomizeOverlayOpen] = useState(false)

    const toggleCustomizeOverlay = () => {
        setIsCustomizeOverlayOpen((prevState) => !prevState)
    }

    const [customProfileStyle, setCustomProfileStyle] = useState(user.profileStyle)

    const updateAboutStyleChange = (propertyName, newValue) => {
        setCustomProfileStyle( (prevProfileStyle) => {
            return {
                ...prevProfileStyle,
                "aboutStyle": {
                    ...prevProfileStyle.aboutStyle,
                    [propertyName]: newValue
                }
            }
        })
    }

    
    // TODO for when you are writing the back end
    React.useEffect(() => {
        // Update the user's profileStyle property through an API endpoint
    }, [customProfileStyle])



    return (
        <div className="profile-wrapper">

            <Overlay isOpen={isCustomizeOverlayOpen} onClose={toggleCustomizeOverlay}>
                <Tabs customClass="vertical">

                    <div label="Change Personal Info">

                    </div>

                    <div label="Change Background">

                    </div>

                    <div label="Choose Styles">

                    </div>

                    <div label="Featured Items">

                    </div>

                </Tabs>
                <div className="profile-overlay-bottom">
                    <button className="basic-button"><div className="basic-button-text">Apply changes</div></button>
                </div>
            </Overlay>

            <div className="profile-container">
                <div className="epic-name-ego-bloat" style={profileStyle.nameStyle}>
                    {profileOwner.name}
                </div>
                <div className="epic-user-about" style={profileStyle.aboutStyle}>
                    {profileOwner.about}
                </div>
                    {
                        ownProfile &&
                        (<Link className="profile-customize-button">
                            <label onClick={toggleCustomizeOverlay} className="cool-label profile-customize-button">Customize Profile <i className="fas fa-cog"/></label>
                        </Link>)
                        }
                <StatsWidget width="100%" user={profileOwner}></StatsWidget>

                <div className="skills-display">
                    { profileOwner.skills.map( (skill) => {
                        const skillKey = skill.toLowerCase() + "Xp"
                        return <label className="cool-label skill-label">{skill + " | " + profileOwner.xpBySkill[skillKey] + "xp"}</label>
                    } ) }
                </div>

                <Tabs customClass="dark-bg">
                    <div isVisible={featuredArtworksExist} label="Featured Artworks"> <div className="artwork-feature">
                            {
                                userArtworks.map((artwork) => {return (
                                    <ArtworkCard artwork={artwork} />
                                )})
                            }
                    </div> </div>
                    <div isVisible={featuredFeedbackExist} label="Featured Reviews (Feedbacks)"> <div className="feedback-feature">
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