"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SandText, BloodText, KazekageTitle } from "@/components/custom-text"

export default function GaaraPage() {
  const [isMuted, setIsMuted] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  useEffect(() => {
    // Initialize audio
    if (audioRef.current) {
      audioRef.current.volume = 0.3
      audioRef.current.loop = true
    }
  }, [])

  return (
    <main className="min-h-screen bg-black text-gray-200 overflow-hidden relative">
      {/* Hero section with full-screen image */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black z-10" />
          <Image
            src="/gaara.jpg"
            alt="Gaara background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="container mx-auto px-4 z-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl mb-4 tracking-tighter">
              <BloodText>GAARA</BloodText>
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="h-1 bg-red-700 mx-auto mb-8 max-w-md"
            />
            <h2 className="font-heading text-2xl md:text-3xl text-amber-100/80 mb-6 text-shadow">
              Jinchūriki of Shukaku
            </h2>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-600"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Audio player */}
      <audio ref={audioRef} src="/GAARA.m4a" muted={isMuted} />

      <div className="fixed bottom-4 right-4 z-50 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-black/50 border-red-800 hover:bg-red-900/30"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-black/50 border-red-800 hover:bg-red-900/30"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </div>

      {/* Character info section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-red-900/20 rounded-lg blur-xl" />
              <div className="relative aspect-square overflow-hidden rounded-lg border-2 border-red-800">
                <Image src="https://i.pinimg.com/736x/94/34/2a/94342af84a8f1685141231f263b555dd.jpg" alt="Gaara" fill className="object-cover" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <KazekageTitle className="text-3xl mb-6">THE DEMON OF THE SAND</KazekageTitle>
              <div className="space-y-4 text-gray-300 font-body">
                <p>
                  Gaara is a shinobi of Sunagakure and the Fifth Kazekage. He was made the jinchūriki of the One-Tailed
                  Shukaku before he was born, causing the villagers of Suna to fear him as a monster.
                </p>
                <p>
                  With his ability to manipulate sand, Gaara became known as a deadly and feared ninja. His control over
                  sand allows him to create weapons, shields, and even a complete defense known as the "Ultimate
                  Defense."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Shukaku section */}
      <section className="py-20 relative bg-gradient-to-b from-black to-red-950/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">
              <SandText>SHUKAKU</SandText>
            </h2>
            <div className="h-1 bg-amber-600 mx-auto mb-8 max-w-xs" />
            <p className="font-heading text-xl text-gray-300 max-w-2xl mx-auto">
              The One-Tailed Beast sealed within Gaara
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <div className="space-y-4 text-gray-300 font-body">
                <p>
                  Shukaku, also known as the One-Tail, is one of the nine tailed beasts. It was sealed within Gaara when
                  he was still in his mother's womb.
                </p>
                <p>
                  Shukaku has the ability to manipulate sand, and can even harden it to a near-impenetrable defense. It
                  also has the power to use Wind Release and can create a Tailed Beast Ball.
                </p>
                <p>
                  The tanuki-like beast has a wild personality and was once feared for its bloodthirsty nature, which
                  influenced Gaara during his early years.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative order-1 md:order-2"
            >
              <div className="absolute -inset-4 bg-amber-700/20 rounded-lg blur-xl" />
              <div className="relative aspect-square overflow-hidden rounded-lg border-2 border-amber-700">
                <Image src="/shukaku.jpg" alt="Shukaku" fill className="object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="text-6xl text-red-600 mb-6 font-cinzel">"</div>
            <p className="text-2xl md:text-3xl italic text-gray-200 mb-6 font-crimson text-shadow">
              I finally understand... I'm alone. I won't believe in anyone, or love anyone. I'm alone. That's my
              destiny.
            </p>
            <div className="text-xl text-red-500 font-heading">— GAARA</div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-red-900/30">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm font-body">
          <p>© {new Date().getFullYear()} Gaara of the Desert Fan Page</p>
        </div>
      </footer>
    </main>
  )
}
