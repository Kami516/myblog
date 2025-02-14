import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">About</h4>
            <p className="text-gray-400">
              Expert insights and practical guides for cloud architecture and DevOps.
            </p>
          </div>

          {/* Categories Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/blog/architecture" className="hover:text-white">
                  Architecture Patterns
                </Link>
              </li>
              <li>
                <Link href="/blog/devops" className="hover:text-white">
                  DevOps Best Practices
                </Link>
              </li>
              <li>
                <Link href="/blog/security" className="hover:text-white">
                  Security & Compliance
                </Link>
              </li>
              <li>
                <Link href="/blog/case-studies" className="hover:text-white">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  GitHub
                </a>
              </li>
              <li>
                <Link href="/rss" className="hover:text-white">
                  RSS Feed
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Get the latest updates directly to your inbox.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} CloudStack Daily. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}