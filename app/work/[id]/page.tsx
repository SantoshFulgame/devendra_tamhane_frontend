// page.tsx
import { notFound } from 'next/navigation';
import { CalendarIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Work } from "@/types/works";
import { ImageGrid } from '../ImageComponents';

async function getPost(id: string): Promise<Work> {
  try {
    const res = await fetch(`http://localhost:5000/api/posts/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`API response not ok: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
}

export default async function WorkPage({ params }: { params: { id: string } }) {
  try {
    const post = await getPost(params.id);

    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Card className="overflow-hidden">
          <CardContent className="p-6 space-y-8">
            {/* Header Section */}
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
              <span className="px-4 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>

            {/* Image Grid Section */}
            <ImageGrid images={post.images} title={post.title} />

            {/* Description Section */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {post.description}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error('Error rendering WorkPage:', error);
    notFound();
  }
}