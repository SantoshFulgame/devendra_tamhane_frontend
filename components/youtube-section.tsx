"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Play, Youtube, Plus, Trash2, Edit } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Video {
  _id: string
  url: string
  title: string
  description: string
}

export default function YoutubeSection() {
  const [videos, setVideos] = useState<Video[]>([])
  const [hoveredUrl, setHoveredUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [newVideo, setNewVideo] = useState({ url: "", title: "", description: "" })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingVideo, setEditingVideo] = useState<Video | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authError, setAuthError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/videos")
      const data = await response.json()
      setVideos(data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching videos:", error)
      setIsLoading(false)
    }
  }

  const authenticate = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError("")
    
    if (!email || !password) {
      setAuthError("Please enter both email and password")
      return
    }

    try {
      const response = await fetch("http://localhost:5000/api/videos/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsAuthenticated(true)
        setAuthError("")
        setEmail("")
        setPassword("")
      } else {
        setAuthError(data.message || "Invalid credentials")
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error("Authentication error:", error)
      setAuthError("An error occurred during authentication")
      setIsAuthenticated(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setEmail("")
    setPassword("")
    setAuthError("")
    setIsModalOpen(false)
    setIsEditMode(false)
    setEditingVideo(null)
  }

  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAuthenticated) {
      setAuthError("You must be authenticated to manage videos")
      return
    }

    if (!newVideo.url.includes("youtube.com/watch?v=") && !newVideo.url.includes("youtu.be/")) {
      setAuthError("Please enter a valid YouTube URL")
      return
    }

    try {
      if (isEditMode && editingVideo) {
        const response = await fetch(`http://localhost:5000/api/videos/${editingVideo._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newVideo),
        })
        
        if (!response.ok) throw new Error("Failed to update video")
        
        const updatedVideo = await response.json()
        setVideos(videos.map(v => v._id === editingVideo._id ? updatedVideo : v))
      } else {
        const response = await fetch("http://localhost:5000/api/videos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newVideo),
        })
        
        if (!response.ok) throw new Error("Failed to add video")
        
        const data = await response.json()
        setVideos([data, ...videos])
      }

      setNewVideo({ url: "", title: "", description: "" })
      setIsModalOpen(false)
      setIsEditMode(false)
      setEditingVideo(null)
    } catch (error) {
      console.error("Error managing video:", error)
      setAuthError("Failed to manage video. Please try again.")
    }
  }

  const handleEdit = (video: Video) => {
    setIsEditMode(true)
    setEditingVideo(video)
    setNewVideo({
      url: video.url,
      title: video.title,
      description: video.description
    })
    setIsModalOpen(true)
  }

  const deleteVideo = async (id: string) => {
    if (!isAuthenticated) {
      setAuthError("You must be authenticated to delete a video")
      return
    }

    try {
      const response = await fetch(`http://localhost:5000/api/videos/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete video")
      setVideos(videos.filter((video) => video._id !== id))
    } catch (error) {
      console.error("Error deleting video:", error)
      setAuthError("Failed to delete video. Please try again.")
    }
  }

  const getYouTubeThumbnail = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("youtu.be/")[1]?.split("?")[0]
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "/placeholder.svg"
  }

  const openYouTubeVideo = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <section className="py-16 bg-gradient-to-br from-red-100 via-pink-100 to-purple-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
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
                <DialogTitle>
                  {!isAuthenticated 
                    ? "Admin Authentication" 
                    : isEditMode 
                      ? "Edit Video" 
                      : "Add New Video"
                  }
                </DialogTitle>
                <DialogDescription>
                  {isAuthenticated 
                    ? "Enter the YouTube video details below" 
                    : "Please enter your admin credentials"
                  }
                </DialogDescription>
              </DialogHeader>
              
              {!isAuthenticated ? (
                <form onSubmit={authenticate} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {authError && <p className="text-red-500 text-sm">{authError}</p>}
                  <Button type="submit" className="w-full">
                    Authenticate
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVideoSubmit} className="space-y-4 mt-4">
                  <Input
                    type="text"
                    placeholder="YouTube URL"
                    value={newVideo.url}
                    onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Video Title"
                    value={newVideo.title}
                    onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                    required
                  />
                  <Textarea
                    placeholder="Video Description"
                    value={newVideo.description}
                    onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                    required
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-between gap-3 pt-4">
                    <Button variant="outline" type="button" onClick={handleLogout}>
                      Logout
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" type="button" onClick={() => {
                        setIsModalOpen(false)
                        setIsEditMode(false)
                        setEditingVideo(null)
                        setNewVideo({ url: "", title: "", description: "" })
                      }}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {isEditMode ? "Update" : "Add"} Video
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <Card
              key={video._id}
              className="overflow-hidden group backdrop-blur-sm bg-white/80 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  {isLoading ? (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
                  ) : (
                    <>
                      <img
                        src={getYouTubeThumbnail(video.url)}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onClick={() => openYouTubeVideo(video.url)}
                      />
                      <div className="absolute top-2 right-2">
                        <Youtube className="w-6 h-6 text-red-600" />
                      </div>
                      {isAuthenticated && (
                        <div className="absolute top-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => handleEdit(video)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => deleteVideo(video._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                      <div 
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={() => openYouTubeVideo(video.url)}
                      >
                        <div className="relative hover:scale-110 transition-transform">
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                          <div className="relative bg-white rounded-full p-4 shadow-lg">
                            <Play className="w-8 h-8 text-primary fill-current" />
                          </div>
                        </div>
                      </div>
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
          ))}
        </div>
      </div>
    </section>
  )
}
