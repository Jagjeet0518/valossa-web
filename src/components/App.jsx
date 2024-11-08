"use client"

import { useState } from "react";

const App = () => {

    const [video, setVideo] = useState(null);
    const [prompt, setPrompt] = useState("");

    return (
        <div className="bg-neutral-950 w-[90%] rounded-lg p-6 border border-neutral-600 shadow-md grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center w-full rounded-md border-neutral-700 border h-full">

            </div>
            <div className="flex flex-col w-full gap-2">
                <h4 className="text-lg text-neutral-100 font-medium">
                    Your Prompt
                </h4>
                <input type="text" placeholder="Enter your video prompt here" className="w-full rounded-md border-neutral-700 border py-3 px-4 text-neutral-300 bg-transparent" onChange={(e) => setPrompt(e.target.value)} />
                <button className="w-full rounded-md bg-neutral-700 py-3 px-4 text-neutral-300 font-medium hover:bg-neutral-600" onClick={() => setVideo(prompt)}>Generate Thumbnail</button>
                <div className="grid grid-cols-3 gap-2">
                    {
                        Array(6).fill(null).map((_, i) => {
                            return (
                                <div key={i} className="w-full aspect-video rounded-md border-neutral-700 border bg-neutral-800" />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

const ThumbTile = ({ src }) => {
    return (
        <div className="w-full aspect-video rounded-md border-neutral-700 border bg-neutral-800 relative group">
            <img src={src} alt="thumb" className="w-full h-full object-contain" />
            <div className="bg-black bg-opacity-0 group-hover:bg-opacity-50">

            </div>
        </div>
    )
}

export default App;