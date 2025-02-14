import { Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { link } from 'fs'

export default async function Home() {

  const allPosts = await getAllPosts()
  const featuredPost = allPosts[0]
  const recentPosts = allPosts.slice(1, 4)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Featured post - todo*/}   
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
            <Link
            href={`/blog/${featuredPost.slug}`}
            className='block group'
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {featuredPost.category}
              </span>
              <h1 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {featuredPost.title}
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                {featuredPost.excerpt}
              </p>
              <div className="mt-6 flex items-center space-x-4 text-sm text-gray-500">
                <span>{new Date(featuredPost.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
                <span>•</span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {featuredPost.readTime}
                </span>
              </div>              
            </Link>
          </div>
        </div>
      </section>

      {/* Recent post - done (check with more posts)*/}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Recent Articles
          </h2>
          <Link 
              href="/blog" 
              className="flex items-center text-blue-600 hover:text-blue-700">
              View all 
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8 ml-10 mr-10'>
            {recentPosts.map((post) =>(
              <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className='group'
              >
                <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {post.category}
                    </span>
                    <h3 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-gray-600 line-clamp-3">
                      {post.excerpt}
                    </p>
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
                  </div>
                </article>
              </Link>
            ))}
          </div>
      </section>
    </div>
  );
}
