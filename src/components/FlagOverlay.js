import { useEffect, useState } from "react"
import Overlay from "../components/Overlay"
import Tabs from "./Tabs"
import Tab from "./Tab"

export default function FlagOverlay({isOpen, onClose, forWhat, _id, suspectID, submitterID}) {

    const [newFlag, setNewFlag] = useState({
        "_id": _id,
        "type": "",
        "for": forWhat,
        "suspectID": suspectID,
        "dateSubmitted": new Date().toISOString(),
        "submitterID": submitterID
    })

    const [flagSubmitted, setFlagSubmitted] = useState(false)

    useEffect(() => {
        console.log("Most current flag type: " + newFlag.type)
    }, [newFlag])

    const submitFlag = () => {
        // Actually submit flag (back-end)
        setFlagSubmitted((prevFlagSubmitted) => true)
        console.log("flagSubmitted is: " + flagSubmitted)
    }

    return (
        <Overlay isOpen={isOpen} onClose={onClose}>
            <div className="overlay-wrapper">
            { flagSubmitted ?
            <div className="sleek-text faded-text">We'll review this content as soon as possible. Thank you for your submittal.</div>
            :
            <>
            <div className="sleek-text">Why do you want to flag this {forWhat}?</div>
            <div className="flex-column" style={{"alignItems": "center"}}>
            <Tabs customClass="verticalRadioBox">
                <div onClick={() => {
                    setNewFlag((prevNewFlag) => {
                        return {
                            ...prevNewFlag,
                            type: "Harassment"
                        }
                    })
                }} label="Harassment"/>
                <div onClick={() => {
                    setNewFlag((prevNewFlag) => {
                        return {
                            ...prevNewFlag,
                            type: "Bullying"
                        }
                    })
                }} label="Bullying"/>
                <div onClick={() => {
                    setNewFlag((prevNewFlag) => {
                        return {
                            ...prevNewFlag,
                            type: "Inappropriate content"
                        }
                    })
                }} label="Inappropriate content"/>
                <div onClick={() => {
                    setNewFlag((prevNewFlag) => {
                        return {
                            ...prevNewFlag,
                            type: "Hate speech"
                        }
                    })
                }} label="Hate speech"/>
                <div onClick={() => {
                    setNewFlag((prevNewFlag) => {
                        return {
                            ...prevNewFlag,
                            type: "Suicidal"
                        }
                    })
                }} label="Suicidal content"/>
                <div onClick={() => {
                    setNewFlag((prevNewFlag) => {
                        return {
                            ...prevNewFlag,
                            type: "Plagiarism"
                        }
                    })
                }} label="Plagiarism"/>
                <div onClick={() => {
                    setNewFlag((prevNewFlag) => {
                        return {
                            ...prevNewFlag,
                            type: "Spam"
                        }
                    })
                }} label="Spam"/>
            </Tabs>
            <button type="button" style={{"cursor": "pointer"}} onClick={submitFlag} className="everywhere-button">Submit</button>
            </div>
            </>
            }
            </div>
        </Overlay>
    )
}