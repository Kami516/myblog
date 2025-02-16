
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { Clock } from 'lucide-react'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          Return to home
        </Link>
      </div>
    )
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
        {post.category}
      </span>

      <h1 className="mt-4 text-4xl font-bold text-gray-900">
        {post.title}
      </h1>

      <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
        <span>{new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</span>
        <span>•</span>
        <span className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {post.readTime}
        </span>
      </div>

      <div 
        className="mt-8 prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
}