'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef, useMemo } from 'react'
import * as THREE from 'three'
import { EffectComposer } from '@react-three/postprocessing'
import { extend, Object3DNode } from '@react-three/fiber'
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass'

extend({ AfterimagePass })

declare module '@react-three/fiber' {
  interface ThreeElements {
    afterimagePass: Object3DNode<AfterimagePass, typeof AfterimagePass>
  }
}

type ShootingXOProps = {
  isX: boolean
  color: string
  direction: THREE.Vector3
  startPos: THREE.Vector3
  speed: number
}

function ShootingXO({ isX, color, direction, startPos, speed }: ShootingXOProps) {
  const ref = useRef<THREE.Group | THREE.Mesh>(null!)

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.position.addScaledVector(direction, delta * speed)
    if (ref.current.position.length() > 30) {
      ref.current.position.copy(startPos)
    }
  })

  if (isX) {
    return (
      <group ref={ref} rotation={[0, 0, Math.PI / 4]}>
        <mesh>
          <boxGeometry args={[0.3, 1.2, 0.2]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
        </mesh>
        <mesh>
          <boxGeometry args={[1.2, 0.3, 0.2]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
        </mesh>
      </group>
    )
  }

  // O = torus
  return (
    <mesh ref={ref} geometry={new THREE.TorusGeometry(0.6, 0.2, 16, 100)}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
      />
    </mesh>
  )
}

function XOAfterimageEffect() {
  const passRef = useRef<AfterimagePass>(null!)
  useFrame(() => {
    if (passRef.current) {
      passRef.current.damp = 0.93
    }
  })
  return <afterimagePass ref={passRef} args={[undefined, 0.93]} />
}

export default function XOBackground() {
  const shootingXOs = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => {
      const direction = new THREE.Vector3(
        Math.random() * 0.4 - 0.2,
        Math.random() * 0.2 - 0.1,
        Math.random() * 0.4
      ).normalize()

      return {
        id: i,
        isX: i % 2 === 0,
        color: i % 2 === 0 ? '#EF476F' : '#06D6A0',
        direction,
        speed: 3 + Math.random() * 2,
        startPos: new THREE.Vector3(
          Math.random() * 20 - 10,
          Math.random() * 10 - 5,
          Math.random() * -20
        ),
      }
    })
  }, [])

  return (
    <Canvas className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        {shootingXOs.map((xo) => (
          <ShootingXO key={xo.id} {...xo} />
        ))}
        <EffectComposer>
          <XOAfterimageEffect />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}
