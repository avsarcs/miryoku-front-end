import React from "react";
import StatsWidget from "./StatsWidget";
import ArtworkCard from "./ArtworkCard";

export default function Feed(props) {

    const [searchData, setSearchData] = React.useState({
        searchText: "",
        includeMusic: false,
        includeDrawing: false,
        includeFiction: false,
        includePoetry: false,
        includeOther: false,
        before: "",
        after: "",
        tags: []
    })

    const TAG_LIMIT = 5

    const [tagsJSX, setTagsJSX] = React.useState([])
    const [tag, setTag] = React.useState("")

    const [filterMenuOpen, setFilterMenuOpen] = React.useState(false)

    const [tagLimitWarning, setTagLimitWarning] = React.useState(false)

    // Updates searchData as the user enters text into the search bar or enables filters.
    function handleChange(e) {

        const { name, value, type, checked } = e.target

        setSearchData( (prevSearchData) => {
            return {
                ...prevSearchData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    // Handles tag input change
    function handleTagChange(e) {
        setTag(e.target.value)
    }

    // Updates searchData.tags as user enters or deletes tags
    function handleTagClick(e) {

        const cleanTag = tag.trim().toLowerCase()

        if (cleanTag && searchData.tags.length < TAG_LIMIT) {
            setSearchData( (prevSearchData) => {
                    return {
                        ...prevSearchData,
                        tags: [...prevSearchData.tags, cleanTag]
                    }
                })   
        }

        if (searchData.tags.length >= TAG_LIMIT) {
            setTagLimitWarning(true)
        }

            setTag("")       
    }

    // Removes tag when a tag label is clicked.
    function removeTag(tag) {

        const tagIndex = searchData.tags.indexOf(tag)

        setSearchData((prevSearchData) => {
            return {
                ...prevSearchData,
                tags: prevSearchData.tags.slice(0, tagIndex).concat( prevSearchData.tags.slice(tagIndex + 1) )
            }
        })
    }       
    

    // Maps all the tags to JSX elements
    React.useEffect( () => {
        setTagsJSX( () => {
            return searchData.tags.map( (tag, index) => {
                const cleanTag = tag.trim().toLowerCase()
                return (
                    <label className="cool-label tag-label" onClick={() => removeTag(cleanTag)} name={cleanTag} key={index}>{cleanTag}</label>
                )
            } )
        } )
    }, [searchData])


    return (
        <div className="feed-container">
            <div className="desc-and-widget-container">
                <div className="desc-container">
                    <h1>Discover artworks</h1>
                    <h2>Help others by giving them feedback.</h2>
                    <div className="toggle-filter-menu"></div>
                </div>
                <StatsWidget width="50%" user={props.user} />
            </div>

            <div className="feed-body">
                <div className="search-container">

                <form>

                <div className="search-components">

                    <input className="search-bar" name="searchText" value={searchData.searchText} onChange={handleChange} type="text" placeholder="Search..."/>

                    
                    <div className="buttons-next-to-search-bar">
                        <button className="search-button submit" type="submit"><i className="gg-search"></i></button>
                        <button className="search-button filter" type="button" onClick={
                            () => {
                                setFilterMenuOpen( filterMenuOpen => !filterMenuOpen)
                            }
                        }>Filter results</button>
                    </div>

                </div>

                <div className="toggle-filter-menu" style={{
                    maxHeight: filterMenuOpen ? "70vh" : "0vh",
                    opacity: filterMenuOpen ? "1" : "0",
                    overflow: "hidden",
                    transition: "opacity 1s, max-height 1s",
                }}>
                <span className="filter-desc">Select the types you want to include (if none, all will be included):</span>
                    <div className="type-filter filter-sub">
                            <input className="hide" type="checkbox" name="includeMusic" id="includeMusic" checked={searchData.includeMusic} onChange={handleChange} />
                            <label className={`cool-label ${searchData.includeMusic ? "type-selected" : ""}`} htmlFor="includeMusic">Music</label>

                            <input className="hide" type="checkbox" name="includeDrawing" id="includeDrawing" checked={searchData.includeDrawing} onChange={handleChange} />
                            <label className={`cool-label ${searchData.includeDrawing ? "type-selected" : ""}`} htmlFor="includeDrawing">Drawing</label>

                            <input className="hide" type="checkbox" name="includeFiction" id="includeFiction" checked={searchData.includeFiction} onChange={handleChange} />
                            <label className={`cool-label ${searchData.includeFiction ? "type-selected" : ""}`} htmlFor="includeFiction">Fiction</label>

                            

                            <input className="hide" type="checkbox" name="includePoetry" id="includePoetry" checked={searchData.includePoetry} onChange={handleChange} />
                            <label className={`cool-label ${searchData.includePoetry ? "type-selected" : ""}`} htmlFor="includePoetry">Poetry</label>

                            <input className="hide" type="checkbox" name="includeOther" id="includeOther" checked={searchData.includeOther} onChange={handleChange} />
                            <label className={`cool-label ${searchData.includeOther ? "type-selected" : ""}`} htmlFor="includeOther">Other</label>

                    </div>

                    <div className="date-filter filter-sub">
                        <div className="before-date-wrapper">
                        Before: <input className="date-input" name="before" value={searchData.before} onChange={handleChange} type="date"/>
                        </div>
                        <div className="after-date-wrapper">
                        After: <input className="date-input" name="after" value={searchData.after} onChange={handleChange} type="date" />
                        </div>
                    </div>

                    <span className="filter-desc">Write any tags you want to specifically search for:</span>

                    <div className="tag-filter filter-sub">
                        <input className="tag-text-input" onChange={handleTagChange} value={tag} name="tags" type="text" maxLength="35"/>
                        <button type="button" onClick={handleTagClick} className="add-tag-button">Add tag</button>
                        {tagsJSX} 
                    </div>
                    <span className="tag-limit-warning filter-desc">{`${tagLimitWarning ? "You can search for at most five tags at a time" : ""}`}</span>
                        
                    </div>

                </form>

                </div>

                <div className="cards-container">
                    {
                        props.artworks.map((artwork) => {return (
                            <ArtworkCard artwork={artwork} />
                        )})
                    }
                </div>

            </div>
        </div>
    )
    }

