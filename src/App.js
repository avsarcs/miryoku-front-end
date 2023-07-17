import React from "react"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Create from "./pages/Create"
import Navbar from "./components/Navbar"
import Feedback from "./pages/Feedback"

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
        <Route path="/create" element={<Create hasAuth={hasAuth} user={User[0]}/>} />
        <Route path="artwork/:id" element={<Artwork hasAuth={hasAuth} user={User[0]} />}/>
        <Route path="profile/:id" element={<Profile hasAuth={hasAuth} user={User[0]}/>} />
        <Route path="/feedback" element={<Feedback hasAuth={hasAuth} user={User[0]}/>} />
    </Routes>
        </>
    )
}