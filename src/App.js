import React from "react"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Navbar from "./components/Navbar"

import User from "./dummyData/dummy-user.json"
import Artworks from "./dummyData/dummy-artworks.json"

import { Route, Routes} from "react-router-dom"
import Artwork from "./pages/Artwork"

const hasAuth = true;

export default function App() {
    return (<>
    <Navbar user={User[0]} hasAuth={hasAuth} />

    <Routes>
        <Route path="/" element={<Home hasAuth={hasAuth} user={User[0]} artworks={Artworks} />}/>
        <Route path="artwork/:id" element={<Artwork hasAuth={hasAuth} user={User[0]} />}/>
        <Route path="profile/:id" element={<Profile hasAuth={hasAuth} user={User[0]}/>} />
    </Routes>
        </>
    )
}