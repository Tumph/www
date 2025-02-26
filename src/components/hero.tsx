export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="max-w-3xl">
        <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-6">
          AI, Software, and Firmware
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Currently studying Computer Engineering at the University of Waterloo. I love building products and solving really hard problems!
        </p>
        <div className="flex flex-wrap gap-4">
          <a 
            href="#work" 
            className="px-6 py-3 border border-white text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
          >
            View Projects
          </a>
          <a 
            href="#experience" 
            className="px-6 py-3 border border-white text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
          >
            Experience
          </a>
          <a 
            href="#contact" 
            className="px-6 py-3 bg-white text-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  )
} 