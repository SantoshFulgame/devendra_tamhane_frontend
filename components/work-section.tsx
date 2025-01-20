"use client"

import { useState, useEffect } from 'react'
import WorkCard from "./work-card"
import { Button } from "@/components/ui/button"
import NewPostModal from "./new-post-modal"
import { Work } from "@/types/works"

export default function WorkSection() {
  const [works, setWorks] = useState<Work[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false)

  const fetchWorks = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/posts')
      if (!response.ok) {
        throw new Error('Failed to fetch works')
      }
      const data = await response.json()
      setWorks(data)
    } catch (err) {
      setError('Failed to load works. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchWorks()
  }, [])

  const handleNewPost = async (newPost: Omit<Work, '_id'>) => {
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      })
      if (!response.ok) {
        throw new Error('Failed to create new post')
      }
      await fetchWorks()
      setIsNewPostModalOpen(false)
    } catch (err) {
      setError('Failed to create new post. Please try again later.')
    }
  }

  if (isLoading) {
    return <div className="text-center py-16">Loading...</div>
  }

  if (error) {
    return <div className="text-center py-16 text-red-500">{error}</div>
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-100 via-teal-100 to-green-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Recent Work</h2>
          <Button onClick={() => setIsNewPostModalOpen(true)}>
            New Post
          </Button>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {works.map((work) => (
            <WorkCard 
              key={work._id} 
              {...work} 
            />
          ))}
        </div>
      </div>
      <NewPostModal
        isOpen={isNewPostModalOpen}
        onClose={() => setIsNewPostModalOpen(false)}
        onSubmit={handleNewPost}
      />
    </section>
  )
}

