import React, { useEffect, useRef, useState } from "react";
import StatsWidget from "../components/StatsWidget"
import Tabs from "../components/Tabs"
import Artworks from "../dummyData/dummy-artworks.json"
import ArtworkCard from "../components/ArtworkCard";
import Feedback from "../components/Feedback";
import Overlay from "../components/Overlay";
import Select from "react-select"
import { Checkbox, FormControlLabel, Slider } from "@mui/material";

import Feedbacks from "../dummyData/dummy-feedbacks.json"
import Users from "../dummyData/dummy-user.json"

import { useNavigate, Link, useParams } from "react-router-dom"
import userEvent from "@testing-library/user-event";
import { ChromePicker } from "react-color";

export default function Profile(props) {

    const { 
        hasAuth,
        user
    } = props

    const { id } = useParams()

    const profileOwner = Users.filter((user) => parseInt(user._id) === parseInt(id))[0]

    const { profileStyle } = user

    const userArtworks = Artworks.filter((artwork) => parseInt(artwork.ownerID) === parseInt(profileOwner._id))
    const userFeedback = Feedbacks.filter( (feedback) => parseInt(profileOwner._id) === parseInt(feedback.ownerID) )

    const featuredArtworksExist = profileOwner.featuredArtworks.length !== 0;
    const userHasFeedback = userFeedback.length !== 0;

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

    const [customProfile, setCustomProfile] = useState(user)

    const updateProfile = (e) => {
      
        const { name, value } = e.target

        setCustomProfile( (prevProfile) => {
            return {
                ...prevProfile,
                [name]: value
            }
        })

    }

    

const fontOptions = [
        { value: 'Sofia Sans', label: 'Sofia Sans' },
        { value: 'Montserrat', label: 'Montserrat' },
        { value: 'Unbounded', label: 'Unbounded' },
        { value: 'Oswald', label: 'Oswald' },
        { value: 'Quicksand', label: 'Quicksand' },
        { value: 'Barlow', label: 'Barlow' },
        { value: 'Josefin Sans', label: 'Josefin Sans' },
        { value: 'Pacifico', label: 'Pacifico' },
        { value: 'Lobster', label: 'Lobster' },
        { value: 'Roboto', label: 'Roboto' },
        { value: 'Open Sans', label: 'Open Sans' },
        { value: 'Source Sans Pro', label: 'Source Sans Pro' },
        { value: 'Ubuntu', label: 'Ubuntu' },
        { value: 'Lato', label: 'Lato' },
        { value: 'Nunito Sans', label: 'Nunito Sans' },
        { value: 'PT Sans', label: 'PT Sans' },
        { value: 'Raleway', label: 'Raleway' },
        { value: 'Merriweather', label: 'Merriweather' },
        { value: 'Playfair Display', label: 'Playfair Display' },
        { value: 'Cabin', label: 'Cabin' },
        { value: 'Inconsolata', label: 'Inconsolata' },
        { value: 'Droid Sans', label: 'Droid Sans' },
        { value: 'Fira Sans', label: 'Fira Sans' },
        { value: 'Work Sans', label: 'Work Sans' },
        { value: 'Poppins', label: 'Poppins' },
        { value: 'Montserrat Alternates', label: 'Montserrat Alternates' },
        { value: 'Alegreya Sans', label: 'Alegreya Sans' },
        { value: 'Cairo', label: 'Cairo' },
        { value: 'Bitter', label: 'Bitter' },
        { value: 'Muli', label: 'Muli' },
        { value: 'Exo', label: 'Exo' },
        { value: 'Rubik', label: 'Rubik' },
        { value: 'Oxygen', label: 'Oxygen' },
        { value: 'Crimson Text', label: 'Crimson Text' },
        { value: 'Abel', label: 'Abel' },
        { value: 'Quattrocento Sans', label: 'Quattrocento Sans' },
        { value: 'Fjalla One', label: 'Fjalla One' },
        { value: 'Archivo', label: 'Archivo' },
        { value: 'Josefin Slab', label: 'Josefin Slab' },
        { value: 'Noto Sans', label: 'Noto Sans' },
        { value: 'Varela Round', label: 'Varela Round' },
        { value: 'Maven Pro', label: 'Maven Pro' },
        { value: 'Pacifico', label: 'Pacifico' },
        { value: 'Amatic SC', label: 'Amatic SC' },
        { value: 'Shadows Into Light', label: 'Shadows Into Light' },
        { value: 'Cabin Condensed', label: 'Cabin Condensed' },
        { value: 'Karla', label: 'Karla' },
        { value: 'Archivo Black', label: 'Archivo Black' },
        { value: 'Fira Mono', label: 'Fira Mono' },
        { value: 'Signika', label: 'Signika' },
        { value: 'Asap', label: 'Asap' },
        { value: 'Dosis', label: 'Dosis' },
        { value: 'Anton', label: 'Anton' },
        { value: 'Catamaran', label: 'Catamaran' },
        { value: 'Cormorant', label: 'Cormorant'}
    ]


    const [defaultAboutFontOption, setDefaultAboutFontOption] = useState(

        fontOptions
        .filter
        ( (_option) => 
            {   return _option.value ===
                    customProfile
                    .profileStyle
                    .aboutStyle
                    .fontFamily
                    .split(",")[0]
            }
        )[0]

    )

    const [titleOutlineChecked, setTitleOutlineChecked] = useState( customProfile.profileStyle.nameStyle.textShadow.length !== 0 )

    const handleTitleOutlineCheckbox = (e) => {
        setTitleOutlineChecked(e.target.checked)
        toggleTitleOutline()
    }

    const toggleTitleOutline = () => {

        if ( customProfile.profileStyle.nameStyle.textShadow.length !== 0 ) {
            updateNameStyle("textShadow", "")
        }
        else {
            updateNameStyle("textShadow","-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black")
        }

    }

    const handleTitleFontCustomize = (option) =>  {
        updateNameStyle("fontFamily", option.value + ", Gill Sans")
    }

    const handleAboutFontCustomize = (option) => {

        setDefaultAboutFontOption(option)
        updateAboutStyle("fontFamily", option.value + ", Gill Sans")

    }

    const [aboutFontSliderValue, setAboutFontSliderValue] = useState(parseFloat(customProfile.profileStyle.aboutStyle.fontSize.split("em")[0]))

    const handleAboutFontSize = (e) => {
        const { value } = e.target

          setAboutFontSliderValue(value)
          const newSize = value + "em"
          updateAboutStyle("fontSize", newSize)
      };

    
    // Code for making the sliders work

    const [titleSpacingValue, setTitleSpacingValue] = useState(parseFloat(customProfile.profileStyle.nameStyle.letterSpacing.split("em")[0]))

    const handleTitleSpacingSlider = (e) => {
        const { value } = e.target

        setTitleSpacingValue(value)
        const newSpacing = value + "em"
        updateNameStyle("letterSpacing", newSpacing)
    }

    const [titleFontSliderValue, setTitleFontSliderValue] = useState(parseFloat(customProfile.profileStyle.nameStyle.fontSize.split("em")[0]))
    
    const handleTitleFontSize = (e) => {
        const { value } = e.target

        setTitleFontSliderValue(value)
        const newSize = value + "em"
        updateNameStyle("fontSize", newSize)

    }

    // End of code for making the sliders work

    // Code for adding / removing featured artworks

    const toggleFeaturedArtwork = (e) => {

        const { id } = e.target

        const newArtworkID = id

        let operationDone = false
        const { featuredArtworks } = customProfile

        for (let artworkID of featuredArtworks) {
            if (parseInt(artworkID) === parseInt(newArtworkID)) {
                setCustomProfile( (prevProfile) => {
                    return {
                            ...prevProfile,
                            "featuredArtworks": featuredArtworks.filter((id) => parseInt(id) !== parseInt(newArtworkID))
                    }
                })
                operationDone = true
            }
        }

        if (!operationDone) {
            setCustomProfile( (prevProfile) => {
                return {
                        ...prevProfile,
                        "featuredArtworks": featuredArtworks.concat(newArtworkID)
                }
            })
        }
    }

    // End of code for adding / removing featured artworks

    const replaceProfileBackground = (e) => {
        const { id } = e.target

        let newProfileStyle

        switch (id) {

            case "profile-bg-1":
                newProfileStyle = {
                    "backgroundImage": "url('../img/profile-bg-1.webp')"
                }
                break
            case "profile-bg-2":
                newProfileStyle = {
                    "backgroundImage": "url('../img/profile-bg-2.webp')"
                }
                break
        
            case "profile-bg-3":
                newProfileStyle = {
                    "backgroundImage": "url('../img/profile-bg-3.png')"
                }
                break
        
            case "profile-bg-4":
                newProfileStyle = {
                    "backgroundImage": "url('../img/profile-bg-4.webp')"
                }
                break
        
            case "profile-bg-5":
                newProfileStyle = {
                    "backgroundImage": "url('../img/profile-bg-5.webp')"
                }
                break
            default:
                break
        }

        newProfileStyle = {
            ...customProfile.profileStyle,
            "backgroundColor": "",
            "background": "",
            "backgroundImage": "",
            ...newProfileStyle
        }

        setCustomProfile( (prevProfile) => {
            return {
                ...prevProfile,
                "profileStyle": newProfileStyle
                }
            }
        )

    }

    const replaceAboutBackground = (e) => {

        const { id } = e.target

        let newAboutStyle
        
        console.log("You triggered replaceAboutStyle!")
        console.log("id: " + id)

        switch (id) {
            case "about-bg-1":

                newAboutStyle = {
                    "backgroundColor": "#ffffff",
                    "opacity": 0.8,
                    "backgroundImage": "linear-gradient(135deg, #ececec 25%, transparent 25%), linear-gradient(225deg, #ececec 25%, transparent 25%), linear-gradient(45deg, #ececec 25%, transparent 25%), linear-gradient(315deg, #ececec 25%, #ffffff 25%)",
                    "backgroundPosition": "11px 0, 11px 0, 0 0, 0 0",
                    "backgroundSize": "22px 22px",
                    "backgroundRepeat": "repeat"
                  }

                break;
            case "about-bg-2":

                newAboutStyle = {
                    "backgroundColor": "#ffffff",
                    "backgroundImage": "radial-gradient(ellipse farthest-corner at 23px 23px, #ececec, #ececec 50%, #ffffff 50%)",
                    "backgroundSize": "23px 23px"
                  }

                break;
            case "about-bg-3":

                newAboutStyle = {
                    "backgroundColor": "#ffffff",
                    "backgroundImage": "repeating-radial-gradient(circle at 0 0, transparent 0, #ffffff 19px), repeating-linear-gradient(#ececec55, #ececec)"
                  }

                break;
            case "about-bg-4":

                newAboutStyle = {
                    "backgroundColor": "#ffffff",
                    "background": "linear-gradient(135deg, #e3e3e355 25%, transparent 25%) -22px 0/ 44px 44px, linear-gradient(225deg, #e3e3e3 25%, transparent 25%) -22px 0/ 44px 44px, linear-gradient(315deg, #e3e3e355 25%, transparent 25%) 0px 0/ 44px 44px, linear-gradient(45deg, #e3e3e3 25%, #ffffff 25%) 0px 0/ 44px 44px"
                  }
                  

                break;
            case "about-bg-5":

                newAboutStyle = {
                    "backgroundColor": "#ffffff",
                    "backgroundImage": "linear-gradient(45deg, #ececec 50%, #ffffff 50%)",
                    "backgroundSize": "19px 19px"
                  }                  

                break;
            default:
                break;
        }

        newAboutStyle = {
            ...newAboutStyle,
            "fontSize": customProfile.profileStyle.aboutStyle.fontSize,
            "padding": "1em",
            "border": "2px solid black",
            "fontFamily": customProfile.profileStyle.aboutStyle.fontFamily
        }


        setCustomProfile( (prevProfile) => {
            return {
                    ...prevProfile,
                    "profileStyle": {
                        ...prevProfile.profileStyle,
                        "aboutStyle": {
                            ...newAboutStyle
                        }
                    }
            }
        })
    }

    // Handle function of Title font selection dropdown menu
    const handleTitleFontSelection = (option) => {
        updateNameStyle("fontFamily", option.value)
    }

    const updateAboutStyle = (name, value) => {
        
        // const { name, value } = e.target

        setCustomProfile( (prevProfile) => {
            return {
                    ...prevProfile,
                    "profileStyle": {
                        ...prevProfile.profileStyle,
                        "aboutStyle": {
                            ...prevProfile.profileStyle.aboutStyle,
                            [name]: value
                        }
                    }
            }
        })
    }

    const updateProfileStyle = (name, value) => {
        
        // const { name, value } = e.target

        setCustomProfile( (prevProfile) => {
            return {
                    ...prevProfile,
                    "profileStyle": {
                        ...prevProfile.profileStyle,
                        [name]: value
                    }
            }
        })
    }

    const updateNameStyle = (name, value) => {

        setCustomProfile( (prevProfile) => {
            return {
                    ...prevProfile,
                    "profileStyle": {
                        ...prevProfile.profileStyle,
                        "nameStyle": {
                            ...prevProfile.profileStyle.nameStyle,
                            [name]: value
                        }
                    }
            }
        })
    }

    const addFeaturedFeedback = (_id) => {

        setCustomProfile( (prevProfile) => {
            return {
                ...prevProfile,
                featuredFeedback: [...prevProfile.featuredFeedback, _id]
            }
        })
    }

    const removeFeaturedFeedback = (_id) => {

        setCustomProfile( (prevProfile) => {
            return {
                ...prevProfile,
                featuredFeedback: prevProfile.featuredFeedback.filter( id => id !== _id)
            }
        })
    }

    const addFeaturedArtwork = (_id) => {

        setCustomProfile( (prevProfile) => {
            return {
                ...prevProfile,
                featuredArtworks: [...prevProfile.featuredArtworks, _id]
            }
        })
    }

    const removeFeaturedArtwork = (_id) => {

        setCustomProfile( (prevProfile) => {
            return {
                ...prevProfile,
                featuredArtworks: prevProfile.featuredArtworks.filter( id => id !== _id)
            }
        })
    }

    const [selectedAboutBox, setSelectedAboutBox] = useState(null)
    
    // TODO for when you are writing the back end

    // Make this the onClick property of the "Apply changes button"
    // Apply the changes reflected in the "customProfile" state to the user's real profile through an API endpoint.
    const applyChanges = () => {

    }

    return (
        <div className="profile-wrapper" style={profileStyle}>

            <Overlay isOpen={isCustomizeOverlayOpen} onClose={toggleCustomizeOverlay}>
                <form>
                    <Tabs customClass="vertical">

                    <div label="Change Personal Info">
                            <div className="overlay-personal-info sleek-text">
                                <div className="overlay-customize-wrapper">
                                    <div className="overlay-profile-general">
                                        <div className="overlay-form-label">Current name:</div>
                                        { user.nameChanged ?
                                            <textarea readOnly className="changeable-text margin-left" rows={1}>{customProfile.name}</textarea> :
                                            <textarea name="name" onChange={updateProfile}
                                            className="changeable-text margin-left" rows={1}>{customProfile.name}</textarea> }
                                    </div>
                                </div>
                                <div className="faded-text">
                                    <div style={{"marginTop": "1em"}}>{customProfile.nameChanged ? "You cannot change your name since you've already changed it once" : "You can change your name only once"}</div>
                                </div>
                                <div className="overlay-customize-wrapper flex-column">
                                    <div className="overlay-profile-desc-label">
                                        About:
                                    </div>
                                    <textarea name="about" onChange={updateProfile} className="changeable-text about-customize">
                                        {customProfile.about}
                                    </textarea>
                                </div>
                                <div className="overlay-customize-wrapper">
                                    <div className="overlay-profile-general">
                                        <div className="overlay-form-label">Current email:</div>
                                            <textarea name="email" onChange={updateProfile} className="changeable-text email-customize margin-left" rows={1}>{customProfile.email}</textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div label="About Section">
                            <div className="overlay-profile-styles">
                                <div className="overlay-customize-wrapper flex-column">
                                    <h2>About Section</h2>
                                    <div>Background</div>
                                    <div className="backgrounds-display">

                                        <div onClick={replaceAboutBackground} id="about-bg-1" className="background-box about-style-1">

                                        </div>

                                        <div onClick={replaceAboutBackground} id="about-bg-2" className="background-box about-style-2">

                                        </div>

                                        <div onClick={replaceAboutBackground} id="about-bg-3" className="background-box about-style-3">

                                        </div>

                                        <div onClick={replaceAboutBackground} id="about-bg-4" className="background-box about-style-4">

                                        </div>

                                        <div onClick={replaceAboutBackground} id="about-bg-5" className="background-box about-style-5">

                                        </div>
                                        
                                    </div>

                                    <div className="margin-top margin-bottom">Font</div>
                                    
                                    <Select
                                        value={defaultAboutFontOption}
                                        onChange={handleAboutFontCustomize}
                                        options={fontOptions}
                                        isSearchable={true}
                                    />

                                    <div className="margin-top margin-bottom">Font Size</div>
                                
                                        <Slider
                                            style={{"width": "20em"}}
                                            value={aboutFontSliderValue}
                                            min={1}
                                            max={2.5}
                                            step={0.005}
                                            onChange={handleAboutFontSize}
                                            aria-labelledby="slider-label"
                                        />

                                    <div className="margin-top flex-column">
                                        <div className="margin-bottom">Preview:</div>
                                        <div style={customProfile.profileStyle.aboutStyle} className="about-customize-preview">This is how your about section will look like</div>
                                    </div>

                                    

                                </div>
                            </div>
                        </div>

                        <div label="Title and Background">
                            <div className="overlay-customize-wrapper flex-column">
                                <h2>Profile Background</h2>
                                
                                <div className="large-backgrounds-display">

                                    <div onClick={replaceProfileBackground} id="profile-bg-1" className="large-background-box profile-bg-1">

                                    </div>

                                    <div onClick={replaceProfileBackground} id="profile-bg-2" className="large-background-box profile-bg-2">

                                    </div>

                                    <div onClick={replaceProfileBackground} id="profile-bg-3" className="large-background-box profile-bg-3">

                                    </div>

                                    <div onClick={replaceProfileBackground} id="profile-bg-4" className="large-background-box profile-bg-4">

                                    </div>

                                    <div onClick={replaceProfileBackground} id="profile-bg-5" className="large-background-box profile-bg-5">

                                    </div>

                                </div>

                                <h2>Title</h2>

                                    <div className="margin-top margin-bottom">Font</div>
                                    <Select
                                        value={defaultAboutFontOption}
                                        onChange={handleTitleFontCustomize}
                                        options={fontOptions}
                                        isSearchable={true}
                                    />

                                    <div className="margin-top margin-bottom">Size</div>
                                    <Slider
                                        style={{"width": "20em"}}
                                        value={titleFontSliderValue}
                                        min={3}
                                        max={5}
                                        step={0.005}
                                        onChange={handleTitleFontSize}
                                        aria-labelledby="Font Size of Title"
                                    />

                                    <div className="margin-top margin-bottom">Letter Spacing</div>

                                    <Slider
                                        style={{"width": "20em"}}
                                        value={titleSpacingValue}
                                        min={0.04}
                                        max={0.3}
                                        step={0.0005}
                                        onChange={handleTitleSpacingSlider}
                                        aria-labelledby="Letter Spacing of Title"
                                    />

                                    <strong className="margin-top margin-bottom">Color</strong>
                                    <ChromePicker style={{"zIndex": "-10"}}
                                        color={customProfile.profileStyle.nameStyle.color}
                                        onChange={(newColor) => {
                                            updateNameStyle("color", newColor.hex)
                                        }}
                                    />

                                    <strong className="margin-top">Enable outline?</strong>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={titleOutlineChecked}
                                                onChange={handleTitleOutlineCheckbox}
                                                color="primary"
                                            />
                                        }
                                    />

                                    <div className="margin-bottom">Preview:</div>

                                    <div className="margin-top flex-column"
                                    style={{
                                            
                                        }}>
                                        
                                        <div
                                            style={{...customProfile.profileStyle.nameStyle,
                                                "fontSize": customProfile.profileStyle.nameStyle.fontSize,
                                                "backgroundImage": customProfile.profileStyle.backgroundImage,
                                                "textAlign": "center"}}
                                            className="title-customize-preview">
                                                {customProfile.name}
                                            </div>
                                    </div>
                                </div>
                        </div>
                        
                        <div label="Featured Artworks">
                            <div className="overlay-customize-wrapper flex-column">
                                <div className="faded-text">Click on an artwork to change its state</div>
                                <h3>Featured Artworks</h3>
                                {
                                    customProfile.featuredArtworks.length ? "" : <div className="faded-text">None</div>
                                }
                                <div className="large-backgrounds-display artwork-selection" style={{"maxHeight": "300px"}}>
                                    {
                                        customProfile.featuredArtworks.map( (featuredArtworkID) => {
                                            return (<label
                                                id={featuredArtworkID}
                                                className="name-display-simple"
                                                onClick={toggleFeaturedArtwork}>
                                                {Artworks.find((artwork) => parseInt(artwork._id) === parseInt(featuredArtworkID)).title}
                                            </label>)
                                        } )
                                    }
                                </div>
                                <h3>Other Artworks</h3>
                                <div className="large-backgrounds-display artwork-selection" style={{"maxHeight": "300px"}}>
                                    {
                                        Artworks
                                            .filter( artwork => parseInt(artwork.ownerID) === parseInt(customProfile._id))
                                            .filter( artwork => !customProfile.featuredArtworks.includes(
                                                artwork._id
                                            ) )
                                            .map( (artwork) => {
                                                return (
                                                    <label
                                                        id={artwork._id}
                                                        className="name-display-simple"
                                                        onClick={toggleFeaturedArtwork}>
                                                            {artwork.title}
                                                    </label>
                                                )
                                            })
                                    }
                                </div>
                            </div>
                        </div>

                    </Tabs>
                    <div className="profile-overlay-bottom">
                        <button type="submit" className="basic-button"><div className="basic-button-text">Apply changes</div></button>
                    </div>
                </form>
            </Overlay>

            <div className="profile-container" >
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
                                profileOwner.featuredArtworks.map( (featuredArtworkID) => {
                                            return (<ArtworkCard
                                                artwork={Artworks.find((artwork) => parseInt(artwork._id) === parseInt(featuredArtworkID))}
                                            />)
                                        } )
                            }
                    </div> </div>
                    <div isVisible={userHasFeedback} label="Reviews (Feedbacks)"> <div className="feedback-feature">
                        {
                            userFeedback.map((feedback) => {return (
                                <Feedback isOutside={true} key={feedback._id} feedback={feedback} user={user} hasAuth={hasAuth} />
                            )})
                        }
                    </div></div>
                    <div label="Activity"></div>
                </Tabs>
            </div>
        </div>
    )
}