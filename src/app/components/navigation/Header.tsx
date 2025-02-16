"use client"
import { useState } from 'react'
import Link from 'next/link'
import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const searchQuery = formData.get('search')
    if (searchQuery) {
      router.push(`/blog?search=${searchQuery}`)
    }
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              CloudStack Daily
            </Link>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-8 mr-4">
              <Link href="/blog?category=architecture" className="text-gray-600 hover:text-gray-900">
                Architecture
              </Link>
              <Link href="/blog?category=devops" className="text-gray-600 hover:text-gray-900">
                DevOps
              </Link>
              <Link href="/blog?category=security" className="text-gray-600 hover:text-gray-900">
                Security
              </Link>
            </div>

            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="w-[300px] flex items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="search"
                    name="search"
                    placeholder="Search articles..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-2 p-2 hover:bg-gray-100 rounded-full"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label="Open search"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}