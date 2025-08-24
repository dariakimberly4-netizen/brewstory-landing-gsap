import { ScrollTrigger } from "gsap/all"

import HeroSection from "./components/HeroSection"
import Navbar from "./components/Navbar"
import gsap from "gsap"

gsap.registerPlugin(ScrollTrigger)

function App() {

  return (
    <>
      <Navbar />
      <HeroSection />
    </>
  )
}

export default App
