"use client";

import App from "@/components/App";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

const Page = () => {

  return (
    <main className="w-screen min-h-screen flex flex-col items-center relative">
      <img src="waves.png" alt="waves" className="fixed bottom-0 w-screen z-[-1] select-none opacity-75" />
      <img src="dots.png" alt="dots" className="fixed top-0 w-screen z-[-1] select-none opacity-30" />
      
      <Navbar />
      <Hero />
      <App />
      <Footer />
      
    </main>
  )
}

export default Page;