"use client"

import { CircleCheck, CircleX, ScanEye } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";

const App = () => {

    const [video, setVideo] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [thumbPrompt, setThumbPrompt] = useState("");
    const [thumbResults, setThumbResults] = useState([]);
    const [selectedThumb, setSelectedThumb] = useState(null);

    const [uploadError, setUploadError] = useState(null);

    const [finalDialogOpen, setFinalDialogOpen] = useState(false);
    const [finalThumb, setFinalThumb] = useState(null);

    useEffect(() => {
        if (video) {
            setVideoUrl(URL.createObjectURL(video));
        } else {
            setVideoUrl(null);
        }
    }, [video])

    const handleThumbClick = (thumb) => {
        setSelectedThumb(prev => prev === thumb ? null : thumb);
    }

    const handleDownloadThumb = (thumb) => {
        if (!thumb) return;
        const link = document.createElement('a');
        link.href = thumb;
        link.download = "thumbnail.png";
        link.click();
        
        link.remove();
    }

    const handleVideoChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (!file.type.includes("video/")) {
                setUploadError("Invalid file type. Please upload a video file.");
                setVideo(null);
            } if (file.size > 64 * 1024 * 1024) {
                setUploadError("File size exceeds limit. Please upload a video file less than 64MB.");
                setVideo(null);
            } else {
                setUploadError(null);
                setVideo(file);
            }
        }
    }

    const handleGetThumbs = () => {
        if (!video) return setUploadError("Please upload a video file.");
        setUploadError(null);
        setThumbResults([]);
        setSelectedThumb(null);

        const formData = new FormData();
        formData.append("file", video);
        formData.append("prompt", prompt);

        try {
            const getThumbs = async () => {
                const response = await fetch("http://127.0.0.1:5000/thumbs", {
                    method: "POST",
                    body: formData
                })

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setThumbResults(data.thumbs);
                } else {
                    setUploadError("An error occurred while generating thumbnails.");
                }
            }

            getThumbs();
        } catch (error) {
            console.error(error);
            setUploadError("An error occurred while generating thumbnails.");
        }
    }

    const handleGenThumb = () => {
        if (!selectedThumb) return setUploadError("Please select a thumbnail to generate.");
        setUploadError(null);

        const generateThumb = async () => {
            const response = await fetch("http://127.0.0.1:5000/generate", {
                method: "POST",
                body: JSON.stringify({
                    prompt: thumbPrompt,
                    image: thumbResults[selectedThumb].image,
                    name: thumbResults[selectedThumb].name
                })
            })

            if (response.ok) {
                const data = await response.json();
                if (data?.image) {
                    setFinalThumb(data.image);
                    setFinalDialogOpen(true);
                } else {
                    setUploadError("An error occurred while generating thumbnails.");
                }
            } else {
                setUploadError("An error occurred while generating thumbnails.");
            }
        }

        generateThumb();
    }

    return (
        <div className={`${video ? "grid-cols-2" : "grid-cols-1"} bg-neutral-950 w-[90%] rounded-lg p-6 border border-neutral-600 shadow-md grid gap-6`}>
            <div className="flex flex-col w-full gap-2">
                <div className="w-full flex flex-col gap-4 rounded-md border-neutral-700 border px-4 py-8 items-center">
                    {/* {video &&
                        <div className="flex items-center justify-center text-green-500 mb-2">
                            <CircleCheck className="mr-2" />
                            <span>Upload complete!</span>
                        </div>
                    } */}

                    {
                        uploadError &&
                        <div className="flex items-center justify-center text-red-500 mb-2">
                            <CircleX className="mr-2" />
                            <span>{uploadError}</span>
                        </div>
                    }
                    <input type="file" accept="video/mp4" onChange={handleVideoChange} className="hidden" id="video" />
                    {
                        video &&
                        <h4 className="text-neutral-100 text-lg text-center">
                            {video.name || "No file selected"}
                        </h4>
                    }
                    <label htmlFor="video" className="bg-blue-700 py-2 px-4 w-fit h-fit rounded-md cursor-pointer">
                        {video ? "Replace Video" : "Upload Video"}
                    </label>
                    <p className="text-neutral-300 text-sm text-center">
                        Max File Size: 64MB
                        <br />
                        Max Video Length: 5 Minutes
                    </p>
                </div>
                {videoUrl && (
                    <div className="flex flex-col rounded-md border-neutral-700 border h-fit">
                        <video className="w-full rounded-md" controls src={videoUrl}>
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
                <button className="w-full rounded-md bg-blue-700 py-3 px-4 text-neutral-300 font-semibold hover:bg-blue-600 disabled:bg-neutral-700" onClick={() => handleGetThumbs()} disabled={!prompt}>Get Thumbnails</button>

                <div className="grid grid-cols-3 gap-2">
                    {thumbResults.map((thumb, index) => (
                        <ThumbTile key={index} src={thumb?.image || null} selected={selectedThumb === index} onSelect={() => handleThumbClick(index)} />
                    ))}
                </div>
                {
                    selectedThumb !== null && (<>
                        <h4 className="text-lg text-neutral-100 font-medium mt-2">
                            Thumbnail Prompt
                        </h4>
                        <input type="text" disabled={selectedThumb == null} placeholder="Enter thumbnail prompt here" className="w-full rounded-md border-neutral-700 border py-3 px-4 text-neutral-300 bg-transparent" onChange={(e) => setThumbPrompt(e.target.value)} />
                        <button className="w-full rounded-md bg-blue-700 py-3 px-4 text-neutral-300 font-semibold hover:bg-blue-600 disabled:bg-neutral-700" onClick={() => handleGenThumb()} disabled={!thumbPrompt}>Generate Thumbnail</button>
                        <Dialog open={finalDialogOpen} onOpenChange={setFinalDialogOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Thumbnail Generated!</DialogTitle>
                                    <DialogDescription>
                                        Your thumbnail has been generated successfully.
                                    </DialogDescription>
                                </DialogHeader>
                                <img src={finalThumb} alt="final-thumb" className="w-full h-full object-contain" />
                                <DialogFooter>
                                    <Button onClick={() => handleDownloadThumb(finalThumb)}>Download</Button>
                                    <Button onClick={() => setFinalDialogOpen(false)}>Close</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </>)
                }
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