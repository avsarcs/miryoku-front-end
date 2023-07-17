import Tabs from "../components/Tabs";
import { isWebUri } from "valid-url";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import ReactQuill from "react-quill";
import rehypeSanitize from "rehype-sanitize";
import 'react-quill/dist/quill.snow.css';


export default function Create(props) {

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

    const { user } = props

    const [defaultTitleFontOption, setDefaultTitleFontOption] = useState(fontOptions[40])
    const [defaultBodyFontOption, setDefaultBodyFontOption] = useState(fontOptions[26])

    const [newArtwork, setNewArtwork] = useState({
        "title": "",
        "type": "",
        "tags": [],
        "ownerID": user._id,
        "description": "",
        "longDescription": "",
        "body": "",
        "titleStyle": {
            "fontFamily": defaultTitleFontOption.value + ", Verdana"
        },
        "bodyStyle": {
            "fontFamily": defaultBodyFontOption.value + ", Gill Sans"
        },
        "dateCreated": new Date().toISOString(),
        "dateUpdated": new Date().toISOString(),
        "rating": {
            "score": "5",
            "count": "1"
        }
    })

    const handleTitleFontCustomize = (option) =>  {
        setDefaultTitleFontOption(option)
        updateTitleStyle("fontFamily", option.value + ", Gill Sans")
    }

    const handleBodyFontCustomize = (option) =>  {
        setDefaultBodyFontOption(option)
        updateBodyStyle("fontFamily", option.value + ", Gill Sans")
    }

    function handleChange(e) {
        const { name, value, type, checked } = e.target
        console.log("handleChange called!")
        console.log("name: " + name)
        console.log("value: " + value)
        setNewArtwork( (prevNewArtwork) => {
            return {
            ...prevNewArtwork,
            [name]: type === "checkbox" ? checked : value
        } } )
    }

    function updateTitleStyle(name, value) {
        
        setNewArtwork( (prevNewArtwork) => {
            return {
                ...prevNewArtwork,
                "titleStyle": {
                    ...prevNewArtwork.titleStyle,
                    [name]: value
                }
            }
        } )
    }

    function updateBodyStyle(name, value) {
        setNewArtwork( (prevNewArtwork) => {
            return {
                ...prevNewArtwork,
                "bodyStyle": {
                    ...prevNewArtwork.bodyStyle,
                    [name]: value
                }
            }
        } )
    }

    useEffect( () => {
        for (let i = 0; i < fontOptions.length; i++) {
            console.log(fontOptions[i].label)
        }
        console.log("defaultBodyFontOption: " + defaultBodyFontOption.value)
        console.log("defaultTitleFontOption: " + defaultTitleFontOption.value)
    }
        ,[])


    const [artworkType, setArtworkType] = useState("Fiction")

    useEffect(() => {
        setNewArtwork((prevNewArtwork) => {
            return {
                ...prevNewArtwork,
                "type": artworkType
            }
        })
        console.log("New artwork type: " + artworkType)
    }, [artworkType])
    
    // Code for MD editors

    const [artworkBody, setArtworkBody] = useState(``)

    useEffect(() => {
        setNewArtwork((prevNewArtwork) => {
            return {
                ...prevNewArtwork,
                "body": artworkBody
            }
        }, [artworkBody])
    })

    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      
        [{ 'header': 1 }, { 'header': 2 }],      // superscript/subscript
      
        [{ 'size': ['small', false, 'large', 'huge'] }],                                         // remove formatting button
      ];

    const textMD = []

    textMD[0] = (<div style={{"backgroundColor": "white"}}>
            <ReactQuill
                theme="snow"
                value={artworkBody}
                modules={{toolbar: toolbarOptions}}
                style={{"fontFamily": newArtwork.bodyStyle.fontFamily}}
                onChange={setArtworkBody} />
        </div>)

    // End of code for MD editors

    // Code for entering non-writing types of artworks

    function getYouTubeVideoId(link) {
        const regex = /(?:\/embed\/|\/v\/|youtu\.be\/|\/watch\?v=|\/watch\?.+&v=)([^#\&\?\n\/<>"']+)/;
        const match = link.match(regex);
      
        if (match && match[1]) {
          return match[1];
        } else {
          return null;
        }

      }

    // Check the type, surround the link with the appropriate markdown
    function handleBodyChange(e) {
        const { value } = e.target

        switch ( newArtwork.type ) {
            case "Cinema":
                setNewArtwork((prevNewArtwork) => {
                    return {
                        ...prevNewArtwork,
                        "body": getYouTubeVideoId(value)
                    }
                })
                break;
            case "Painting":
                setNewArtwork((prevNewArtwork) => {
                    return {
                        ...prevNewArtwork,
                        "body": value
                    }
                })
                break;
            case "Music":
                setNewArtwork((prevNewArtwork) => {
                    return {
                        ...prevNewArtwork,
                        "body": getYouTubeVideoId(value)
                    }
                })
                break;
            default:
                break;
        }

    }

    const getYoutubeLink = []

    getYoutubeLink[0] = (<>
                                    <span className="sleek-text" style={{"fontSize": "1.3em"}}>Enter the YouTube link of your artwork: </span>
                                    <input name="title" className="changeable-text-long margin-left" rows={1} onChange={handleBodyChange}/>
                                </>)

    // End of code for entering non-writing types of artworks

    function pushNewArtworkToDatabase() {
        // Push new artwork to database.
    }

    return (
        <div className="all-container">
            <div className="artwork-container">
                <h2 className="fancy-title">Creating New Artwork</h2>
                <div className="title-textbox-wrapper margin-top sleek-text">
                    <span style={{"fontSize": "1.5em"}}>Title: </span>
                    <input maxLength={100} name="title" className="changeable-text-long margin-left" rows={1} onChange={handleChange}/>
                </div>
                <div className="description-textbox-wrapper margin-top sleek-text">
                    <div className="flex-column">
                        <span style={{"fontSize": "1.5em"}}>Description: </span>
                        <span className="faded-text">This description will appear on the cards on the Feed page. (Max. 240 characters)</span>
                    </div>
                    <textarea name="description" maxLength={240} className="create-description-textbox" rows={1} onChange={handleChange}/>
                </div>
                <div className="description-textbox-wrapper margin-top sleek-text">
                    <div className="flex-column">
                        <span style={{"fontSize": "1.5em"}}>Long Description: </span>
                        <span className="faded-text">This description will appear on the Artwork's page. (Max. 20k characters)</span>
                    </div>
                    <textarea name="longDescription" maxLength={20000} className="create-long-description-textbox" rows={1} onChange={handleChange}/>
                </div>

                <div className="margin-top sleek-text" style={{"width": "30%", "minWidth": "24em", "marginTop": "3em"}}>
                    <span style={{"fontSize": "1.5em"}}>Title Font: </span>
                        <Select
                            value={defaultTitleFontOption}
                            onChange={handleTitleFontCustomize}
                            options={fontOptions}
                            isSearchable={true}
                        />
                        <div className="margin-top" style={{"fontFamily": newArtwork.titleStyle.fontFamily}}>Preview</div>
                </div>

                <div className="margin-top sleek-text" style={{"width": "30%", "minWidth": "24em"}}>
                    <span style={{"fontSize": "1.5em"}}>Artwork Body Font: </span>
                    <Select
                        value={defaultBodyFontOption}
                        onChange={handleBodyFontCustomize}
                        options={fontOptions}
                        isSearchable={true}
                    />
                    <div className="margin-top" style={{"fontFamily": newArtwork.bodyStyle.fontFamily}}>Preview</div>
                </div>

                <h3 className="sleek-text" style={{"marginTop": "2em"}}>Pick the Artwork type</h3>
                <Tabs customClass="scrollableHorizontal">
                    <div onClick={() => { setArtworkType((prevArtworkType) => "Fiction") }} label="Fiction">
                        {
                            textMD
                        }
                    </div>
                    <div onClick={() => { setArtworkType((prevArtworkType) => "Poetry") }} label="Poetry">
                        {
                            textMD
                        }
                    </div>
                    <div onClick={() => { setArtworkType((prevArtworkType) => "Cinema") }} label="Cinema">
                        {
                            getYoutubeLink
                        }
                    </div>
                    <div onClick={() => { setArtworkType((prevArtworkType) => "Painting") }} label="Painting">
                        <div className="sleek-text faded-text margin-bottom">You may upload your painting to Imgur, DeviantArt or any other image hosting site you wish.</div>
                        <span className="sleek-text" style={{"fontSize": "1.3em"}}>Enter the image link of your painting: </span>
                        <input name="title" className="changeable-text-long margin-left" rows={1} onChange={handleBodyChange}/>
                        
                        <div className="sleek-text faded-text">Links that end with .jpg, .jpeg, .png, .apng or .webp are okay</div>
                    </div>
                    <div onClick={() => { setArtworkType((prevArtworkType) => "Music") }} label="Music">
                        {
                            getYoutubeLink
                        }
                    </div>
                    <div onClick={() => { setArtworkType((prevArtworkType) => "Other") }} label="Other">
                        {
                            textMD
                        }
                    </div>
                </Tabs>
                <button className="regular-button margin-bottom" type="button" onClick={pushNewArtworkToDatabase}>Submit</button>                
            </div>
        </div>
    )
}