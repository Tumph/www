import Header from '@/components/header'
import Hero from '@/components/hero'
import Portfolio from '@/components/portfolio'
import Experience from '@/components/experience'
import Footer from '@/components/footer'
import Background3D from '@/components/3d-background'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Background3D />
      <Header />
      <Hero />
      <Portfolio />
      <Experience />
      <Footer />
    </main>
  )
} 