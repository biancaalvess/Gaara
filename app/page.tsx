"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SandText, BloodText, KazekageTitle } from "@/components/custom-text"
import SandOverlay from "@/components/sand-overlay"

export default function GaaraPage() {
  const [isMuted, setIsMuted] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 0.8], [0, -100])

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

    // Add cursor effect
    const cursor = document.createElement("div")
    cursor.className = "custom-cursor"
    document.body.appendChild(cursor)

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
    }

    window.addEventListener("mousemove", moveCursor)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      document.body.removeChild(cursor)
    }
  }, [])

  return (
    <main className="min-h-screen bg-black text-gray-200 overflow-hidden relative">
      {/* Sand overlay effect */}
      <SandOverlay />

      {/* Hero section with full-screen image */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ scale: heroScale }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black z-10" />
          <Image src="/gaara.jpg" alt="Gaara background" fill className="object-cover" priority />

          {/* Red kanji overlay */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 z-5">
            <div className="relative w-full h-full">
              <Image src="/placeholder.svg?height=800&width=400" alt="Love Kanji" fill className="object-contain" />
            </div>
          </div>
        </motion.div>

        <motion.div className="container mx-auto px-4 z-20 relative" style={{ y: titleY, opacity: heroOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="relative inline-block">
              <motion.div
                className="absolute -inset-2 bg-red-900/30 rounded-lg blur-xl z-0"
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <h1 className="text-6xl md:text-8xl mb-4 tracking-tighter relative z-10">
                <BloodText>GAARA</BloodText>
              </h1>
            </div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="h-1 bg-gradient-to-r from-transparent via-red-700 to-transparent mx-auto mb-8 max-w-md"
            />

            <motion.h2
              className="font-heading text-2xl md:text-3xl text-amber-100/80 mb-6 text-shadow"
              animate={{
                textShadow: [
                  "0 0 8px rgba(220, 38, 38, 0.7)",
                  "0 0 16px rgba(220, 38, 38, 0.5)",
                  "0 0 8px rgba(220, 38, 38, 0.7)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              Jinchūriki of Shukaku
            </motion.h2>
          </motion.div>
        </motion.div>

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
          className="bg-black/50 border-red-800 hover:bg-red-900/30 backdrop-blur-sm"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-black/50 border-red-800 hover:bg-red-900/30 backdrop-blur-sm"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </div>

      {/* Character info section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[url('/sand-texture.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
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
              <motion.div
                className="relative aspect-square overflow-hidden rounded-lg border-2 border-red-800"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10"></div>
                <Image
                  src="https://i.pinimg.com/736x/94/34/2a/94342af84a8f1685141231f263b555dd.jpg"
                  alt="Gaara"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 z-20">
                  <div className="w-16 h-16 rounded-full border-2 border-red-700 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                    <span className="font-cinzel text-red-600 text-2xl">愛</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <KazekageTitle className="text-3xl mb-6">THE DEMON OF THE SAND</KazekageTitle>
              <div className="space-y-4 text-gray-300 font-body relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-red-800 to-transparent"></div>
                <p>
                  Gaara is a shinobi of Sunagakure and the Fifth Kazekage. He was made the jinchūriki of the One-Tailed
                  Shukaku before he was born, causing the villagers of Suna to fear him as a monster.
                </p>
                <p>
                  With his ability to manipulate sand, Gaara became known as a deadly and feared ninja. His control over
                  sand allows him to create weapons, shields, and even a complete defense known as the "Ultimate
                  Defense."
                </p>
                <motion.div
                  className="mt-6 p-4 border border-red-900/30 rounded-md bg-black/50 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-red-500 font-heading mb-2">ABILITIES</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Sand Manipulation</li>
                    <li>Sand Shield (Automatic Defense)</li>
                    <li>Sand Burial</li>
                    <li>Third Eye</li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Shukaku section */}
      <section className="py-20 relative bg-gradient-to-b from-black to-red-950/30">
        <div className="absolute inset-0 bg-[url('/sand-texture.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 relative"
          >
            <div className="absolute -inset-x-4 -inset-y-10 bg-amber-900/5 rounded-full blur-3xl z-0"></div>
            <h2 className="text-4xl md:text-5xl mb-4 relative z-10">
              <SandText>SHUKAKU</SandText>
            </h2>
            <div className="h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-8 max-w-xs"></div>
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
              <div className="space-y-4 text-gray-300 font-body relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-amber-700 to-transparent"></div>
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
                <motion.div
                  className="mt-6 p-4 border border-amber-900/30 rounded-md bg-black/50 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-amber-500 font-heading mb-2">TAILED BEAST STATS</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-amber-300/70">Power</div>
                      <div className="w-full bg-gray-700/30 rounded-full h-1.5">
                        <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: "70%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="text-amber-300/70">Speed</div>
                      <div className="w-full bg-gray-700/30 rounded-full h-1.5">
                        <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="text-amber-300/70">Defense</div>
                      <div className="w-full bg-gray-700/30 rounded-full h-1.5">
                        <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: "90%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="text-amber-300/70">Chakra</div>
                      <div className="w-full bg-gray-700/30 rounded-full h-1.5">
                        <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
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
              <motion.div
                className="relative aspect-square overflow-hidden rounded-lg border-2 border-amber-700"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10"></div>
                <Image
                  src="/shukaku.jpg"
                  alt="Shukaku"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[url('/sand-texture.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center relative"
          >
            <div className="absolute -inset-x-20 -inset-y-10 bg-red-900/5 rounded-full blur-3xl z-0"></div>
            <div className="text-6xl text-red-600 mb-6 font-cinzel relative z-10">"</div>
            <motion.div
              className="relative z-10"
              animate={{
                textShadow: [
                  "0 0 8px rgba(0, 0, 0, 0.5)",
                  "0 0 12px rgba(220, 38, 38, 0.3)",
                  "0 0 8px rgba(0, 0, 0, 0.5)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <p className="text-2xl md:text-3xl italic text-gray-200 mb-6 font-crimson">
              The only reason we are so attached to memories is that they don't change, even if the people have changed.
              </p>
            </motion.div>
            <div className="text-xl text-red-500 font-heading relative z-10">— GAARA</div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-red-900/30 relative">
        <div className="absolute inset-0 bg-[url('/sand-texture.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm font-body">
          <p>© {new Date().getFullYear()} Gaara of the Desert Fan Page</p>
        </div>
      </footer>
    </main>
  )
}
