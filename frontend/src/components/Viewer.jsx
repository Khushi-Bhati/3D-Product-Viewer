import { useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useGLTF, Stage, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function Model({ url, wireframe }) {
    const { scene } = useGLTF(url)
    const primRef = useRef()

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                // Clone material to avoid side effects on shared materials
                child.material = child.material.clone()
                child.material.wireframe = wireframe
            }
        })
    }, [scene, wireframe])

    return <primitive object={scene} ref={primRef} />
}

export default function Viewer({ modelUrl, wireframe }) {
    return (
        <>
            <Stage environment="city" intensity={0.6} adjustCamera={1.2}>
                {modelUrl ? <Model url={modelUrl} wireframe={wireframe} /> : null}
            </Stage>
            <OrbitControls makeDefault />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
        </>
    )
}
