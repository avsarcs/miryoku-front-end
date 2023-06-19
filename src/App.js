import React from "react"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"

import User from "./dummyData/dummy-user.json"
import Artworks from "./dummyData/dummy-artworks.json"

import { Route, Routes} from "react-router-dom"
import Artwork from "./pages/Artwork"

const hasAuth = true;

export default function App() {
    return (<>
    <Navbar hasAuth={hasAuth} />

    <Routes>
        <Route path="/" element={<Home hasAuth={hasAuth} user={User[0]} artworks={Artworks} />}/>
        <Route path="artwork" element={<Artwork artwork={Artworks[0]} />}/>
    </Routes>
        </>
    )
}