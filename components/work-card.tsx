"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect, useCallback } from "react"
import Image from 'next/image'
import Link from 'next/link'
import { Work } from "@/types/works"

export default function WorkCard({ _id, title, description, images, date, category }: Work) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }, [images.length])

  const previousImage = useCallback(() => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        nextImage()
      }, 5000) // Change image every 5 seconds

      return () => clearInterval(interval)
    }
  }, [images.length, nextImage])

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={images[currentImage] || "/placeholder.svg"}
          alt={`${title} - Image ${currentImage + 1}`}
          className="object-cover"
          layout="fill"
        />
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              onClick={previousImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full ${
                    index === currentImage ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-xl mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{new Date(date).toLocaleDateString()}</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {category}
          </span>
        </div>
        <div className="space-y-2">
          <p className="text-muted-foreground">
            {description.slice(0, 100)}...
          </p>
          <Link href={`/work/${_id}`}>
            <Button variant="link" className="p-0 h-auto font-medium text-primary">
              Read More
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

