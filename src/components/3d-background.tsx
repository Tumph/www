'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!containerRef.current) return
    
    // Scene setup
    const scene = new THREE.Scene()
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000
    
    const posArray = new Float32Array(particlesCount * 3)
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    
    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x3498db,
      transparent: true,
      opacity: 0.8,
    })
    
    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      
      particlesMesh.rotation.x += 0.0005
      particlesMesh.rotation.y += 0.0005
      
      renderer.render(scene, camera)
    }
    
    animate()
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      const currentContainer = containerRef.current
      if (currentContainer) {
        currentContainer.removeChild(renderer.domElement)
      }
    }
  }, [])
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: 'none' }}
    />
  )
} 