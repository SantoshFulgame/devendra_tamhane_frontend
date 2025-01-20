"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Play, Youtube, Plus } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import dynamic from 'next/dynamic'

interface Video {
  _id: string
  url: string
  title: string
  description: string
}

// Create a client-side only wrapper for motion components
const MotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false }
)

export default function YoutubeSection() {
  const [videos, setVideos] = useState<Video[]>([])
  const [hoveredUrl, setHoveredUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [newVideo, setNewVideo] = useState({ url: '', title: '', description: '' })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/videos')
      const data = await response.json()
      setVideos(data)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching videos:', error)
      setIsLoading(false)
    }
  }

  const addNewVideo = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVideo),
      })
      const data = await response.json()
      setVideos([data, ...videos])
      setNewVideo({ url: '', title: '', description: '' })
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error adding new video:', error)
    }
  }

  const getYouTubeThumbnail = (url: string) => {
    const videoId = url.split('v=')[1]
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }

  const openYouTubeVideo = (url: string) => {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank')
    }
  }

  // Don't render anything until client-side hydration is complete
  if (!isMounted) {
    return null
  }

  return (
    <section className="py-16 bg-gradient-to-br from-red-100 via-pink-100 to-purple-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <MotionDiv
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Educational Videos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Watch and learn from our carefully curated educational content
            </p>
            
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2" type="button">
                  <Plus className="w-4 h-4" /> Add New Video
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Video</DialogTitle>
                  <DialogDescription>
                    Enter the YouTube video details below
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={addNewVideo} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label htmlFor="url" className="text-sm font-medium">YouTube URL</label>
                    <Input
                      id="url"
                      type="text"
                      placeholder="https://youtube.com/watch?v=..."
                      value={newVideo.url}
                      onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Video Title</label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Enter video title"
                      value={newVideo.title}
                      onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <Textarea
                      id="description"
                      placeholder="Enter video description"
                      value={newVideo.description}
                      onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                      required
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      type="button" 
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Add Video</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </MotionDiv>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {videos.map((video, index) => (
              <MotionDiv
                key={video._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredUrl(video.url)}
                onHoverEnd={() => setHoveredUrl(null)}
              >
                <Card 
                  className="overflow-hidden cursor-pointer group backdrop-blur-sm bg-white/80 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  onClick={() => openYouTubeVideo(video.url)}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-video">
                      {isLoading ? (
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
                      ) : (
                        <>
                          <img
                            src={getYouTubeThumbnail(video.url) || "/placeholder.svg"}
                            alt={video.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute top-2 right-2">
                            <Youtube className="w-6 h-6 text-red-600" />
                          </div>
                          <MotionDiv
                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={false}
                            animate={hoveredUrl === video.url ? { scale: 1 } : { scale: 0.8 }}
                          >
                            <MotionDiv
                              className="relative"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                              <div className="relative bg-white rounded-full p-4 shadow-lg">
                                <Play className="w-8 h-8 text-primary fill-current" />
                              </div>
                            </MotionDiv>
                          </MotionDiv>
                        </>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl group-hover:text-primary transition-colors line-clamp-1">
                        {video.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mt-2">
                        {video.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </MotionDiv>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}