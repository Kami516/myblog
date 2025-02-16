import Link from 'next/link'
import { Clock, Search } from 'lucide-react'
import { getAllPosts, type Post } from '@/lib/posts'

function getUniqueCategories(posts: Post[]): string[] {
  return Array.from(new Set(posts.map(post => post.category)))
}

function filterPosts(posts: Post[], category?: string, search?: string): Post[] {
  return posts.filter(post => {
    const matchesCategory = category 
      ? post.category.toLowerCase() === category.toLowerCase()
      : true

    const matchesSearch = search
      ? post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase())
      : true

    return matchesCategory && matchesSearch
  })
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string }
}) {
  const allPosts = await getAllPosts()
  const categories = getUniqueCategories(allPosts)
  
  const filteredPosts = filterPosts(allPosts, searchParams.category, searchParams.search)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900">Blog Articles</h1>
          <p className="mt-4 text-xl text-gray-600">
            Explore our latest articles about cloud architecture, DevOps, and software engineering.
          </p>
          
          {/* Search Bar */}
          <form className="mt-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="search"
                defaultValue={searchParams.search}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </form>
          
          {/* Category filters */}
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href={searchParams.search ? `/blog?search=${searchParams.search}` : '/blog'}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${!searchParams.category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              All
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/blog?category=${category.toLowerCase()}${
                  searchParams.search ? `&search=${searchParams.search}` : ''
                }`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${searchParams.category?.toLowerCase() === category.toLowerCase()
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Search Results Info */}
      {searchParams.search && (
        <div className="container mx-auto px-4 pt-8">
          <p className="text-gray-600">
            {filteredPosts.length === 0 
              ? `No results found for "${searchParams.search}"`
              : `Found ${filteredPosts.length} result${filteredPosts.length === 1 ? '' : 's'} for "${searchParams.search}"`
            }
          </p>
        </div>
      )}

      {/* Posts grid */}
      <div className="container mx-auto px-4 py-12">
        {filteredPosts.length === 0 && !searchParams.search ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900">No posts found</h2>
            <p className="mt-2 text-gray-600">Try selecting a different category or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
            {filteredPosts.map((post) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full">
                  <div className="p-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {post.category}
                    </span>
                    <h2 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
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
        )}
      </div>
    </div>
  )
}