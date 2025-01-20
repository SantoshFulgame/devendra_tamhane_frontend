"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Work } from "@/types/works"

interface NewPostModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (newPost: Omit<Work, '_id'>) => void
}

export default function NewPostModal({ isOpen, onClose, onSubmit }: NewPostModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrls, setImageUrls] = useState<string[]>([''])
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')

  const handleAddImageUrl = () => {
    setImageUrls([...imageUrls, ''])
  }

  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...imageUrls]
    newImageUrls[index] = value
    setImageUrls(newImageUrls)
  }

  const handleRemoveImageUrl = (index: number) => {
    const newImageUrls = imageUrls.filter((_, i) => i !== index)
    setImageUrls(newImageUrls)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      description,
      images: imageUrls.filter(url => url.trim() !== ''),
      date,
      category,
    })
    setTitle('')
    setDescription('')
    setImageUrls([''])
    setCategory('')
    setDate('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Image URLs</Label>
            {imageUrls.map((url, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={url}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
                  placeholder="Image URL"
                  required
                />
                {index > 0 && (
                  <Button type="button" variant="outline" onClick={() => handleRemoveImageUrl(index)}>
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={handleAddImageUrl}>
              Add Image URL
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Create Post</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

