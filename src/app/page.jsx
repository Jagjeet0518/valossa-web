"use client";

const Page = () => {

  return (
    <main className="w-screen min-h-screen flex flex-col items-center relative py-12">
      <img src="waves.png" alt="waves" className="absolute bottom-0 w-screen z-0 select-none" />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-8xl text-white font-semibold text-center">
          Transform Your Videos Into
          <br />
          <span className="gradient-text">
            Amazing Thumbnails.
          </span>
        </h1>
      </div>
    </main>
  )
}

export default Page;