export default function Footer() {
  return (
    <footer id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-6 tracking-tight">GET IN TOUCH</h2>
          <p className="text-gray-300 mb-8 max-w-md">
            I&apos;m always open to new opportunities and collaborations. Feel free to reach out if you&apos;d like to work together.
          </p>
          <div className="space-y-4">
            <a 
              href="mailto:a535gupt@uwaterloo.ca" 
              className="block text-lg hover:text-gray-300 transition-colors"
            >
              a535gupt@uwaterloo.ca
            </a>
            <a 
              href="mailto:aryansmail@gmail.com" 
              className="block text-lg hover:text-gray-300 transition-colors"
            >
              aryansmail@gmail.com
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-6">CONNECT</h3>
          <div className="space-y-4">
            <a 
              href="https://github.com/Tumph" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-gray-300 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com/in/aryangoopta" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-gray-300 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://x.com/argupta_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Twitter
            </a>
            <a 
              href="https://arygupta.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-gray-300 hover:text-white transition-colors"
            >
              arygupta.com
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Aryan Gupta. All rights reserved.</p>
      </div>
    </footer>
  )
} 