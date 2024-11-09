"use client"

import { UploadButton, UploadDropzone } from "@/lib/utils";
import { CircleCheck, CircleX, ScanEye } from "lucide-react";
import { useState } from "react";
import { Progress } from "./ui/progress";

const App = () => {

    const [video, setVideo] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [thumbResults, setThumbResults] = useState([]);
    const [selectedThumb, setSelectedThumb] = useState(null);

    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [uploadName, setUploadName] = useState("");

    const handleThumbClick = (thumb) => {
        setSelectedThumb(prev => prev === thumb ? null : thumb);
    }

    return (
        <div className={`${uploadComplete ? "grid-cols-2" : "grid-cols-1"} bg-neutral-950 w-[90%] rounded-lg p-6 border border-neutral-600 shadow-md grid gap-6`}>
            <div className="flex flex-col w-full gap-2">
                <div className="w-full flex flex-col gap-4 rounded-md border-neutral-700 border px-4 py-8">
                    {video &&
                        <div className="flex items-center justify-center text-green-500 mb-2">
                            <CircleCheck className="mr-2" />
                            <span>Upload complete!</span>
                        </div>
                    }
                    <UploadDropzone
                        // content={{
                        //     button({ ready }) {
                        //         if (ready) {
                        //             return uploadName ? "Upload File" : "Select File"
                        //         }
                        //     },
                        // }}
                        endpoint="videoUploader"
                        onClientUploadComplete={(res) => {
                            setVideo(res[0].url)
                            setUploadComplete(true)
                        }}
                        onUploadError={(error) => {
                            setUploadComplete(false)
                            setUploadError(error)
                        }}
                        onUploadProgress={(progress) => {
                            setUploadProgress(progress)
                        }}
                        onUploadBegin={() => {
                            setUploadProgress(0)
                            setUploadComplete(false)
                            setUploadError(null)
                        }}
                        onChange={(files) => {
                            setUploadError(null)
                            setUploadComplete(false)
                            setUploadName(files[0].name)
                        }}
                    />
                    {
                        uploadError &&
                        <div className="flex items-center justify-center text-red-500 mb-2">
                            <CircleX className="mr-2" />
                            <span>Upload failed! {uploadError.message.includes("FileSizeMismatch") && "File size exceeds limit!"}</span>
                        </div>
                    }
                </div>
                {video && (
                    <div className="flex flex-col rounded-md border-neutral-700 border h-fit">
                        <video className="w-full rounded-md" controls>
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}
            </div>
            <div className={`flex-col w-full gap-2 ${video ? "flex" : "hidden"}`}>
                <h4 className="text-lg text-neutral-100 font-medium">
                    Your Prompt
                </h4>
                <input type="text" disabled={!video} placeholder="Enter your video prompt here" className="w-full rounded-md border-neutral-700 border py-3 px-4 text-neutral-300 bg-transparent" onChange={(e) => setPrompt(e.target.value)} />
                <button className="w-full rounded-md bg-blue-700 py-3 px-4 text-neutral-300 font-semibold hover:bg-blue-600 disabled:bg-neutral-700" onClick={() => setVideo(prompt)} disabled={!prompt}>Get Thumbnails</button>

                <div className="grid grid-cols-3 gap-2">
                    {thumbResults.map((thumb, index) => (
                        <ThumbTile key={index} src={thumb} selected={selectedThumb === thumb} onSelect={() => handleThumbClick(index)} />
                    ))}
                </div>
            </div>
        </div>
    )
}

const ThumbTile = ({ src, selected, onSelect }) => {
    return (
        <div className={`w-full aspect-video rounded-md bg-neutral-800 relative group ${selected ? "border-2 border-lime-500" : "border border-neutral-700"}`}>
            {src && <img src={src} alt="thumb" className="w-full h-full object-contain" />}
            <div className="bg-black bg-opacity-0 group-hover:bg-opacity-50 flex gap-2 items-center justify-center absolute w-full h-full rounded-md top-0 left-0">
                <div className="bg-neutral-700 size-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:cursor-pointer" onClick={onSelect}>
                    <CircleCheck className={selected && "text-lime-500"} />
                </div>
                <div className="bg-neutral-700 size-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:cursor-pointer">
                    <ScanEye />
                </div>
            </div>
        </div>
    )
}

export default App;