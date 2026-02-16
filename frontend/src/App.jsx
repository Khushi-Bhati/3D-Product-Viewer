import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import axios from 'axios'
import Viewer from './components/Viewer'
import './index.css'

function App() {
    const [modelUrl, setModelUrl] = useState(null)
    const [bgColor, setBgColor] = useState('#ffffff')
    const [wireframe, setWireframe] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios.get('/api/settings')
            .then(res => {
                if (res.data) {
                    setBgColor(res.data.backgroundColor || '#ffffff')
                    setWireframe(res.data.wireframe || false)
                }
            })
            .catch(err => console.error("Error fetching settings:", err))
    }, [])

    const handleUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return

        setLoading(true)
        const formData = new FormData()
        formData.append('model', file)

        axios.post('/api/upload', formData)
            .then(res => {
                setModelUrl(res.data.url)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
                alert('Upload failed')
            })
    }

    const saveSettings = () => {
        axios.post('/api/settings', { backgroundColor: bgColor, wireframe })
            .then(res => alert('Settings saved!'))
            .catch(err => console.error(err))
    }

    return (
        <div className="app-container">
            <div className="sidebar">
                <h2>3D Viewer</h2>

                <div className="control-group">
                    <label>Upload Model</label>
                    <input type="file" accept=".glb,.gltf" onChange={handleUpload} />
                    {loading && <p>Uploading...</p>}
                </div>

                <div className="control-group">
                    <label>Background Color</label>
                    <div className="color-picker-wrapper">
                        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
                        <span>{bgColor}</span>
                    </div>
                </div>

                <div className="control-group">
                    <label className="checkbox-label">
                        <input type="checkbox" checked={wireframe} onChange={(e) => setWireframe(e.target.checked)} />
                        Wireframe Mode
                    </label>
                </div>

                <button className="save-btn" onClick={saveSettings}>Save Configuration</button>
            </div>

            <div className="canvas-container" style={{ background: bgColor }}>
                <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
                    <Viewer modelUrl={modelUrl} wireframe={wireframe} />
                    {!modelUrl && (
                        <mesh>
                            <boxGeometry args={[1, 1, 1]} />
                            <meshStandardMaterial color="orange" wireframe={wireframe} />
                        </mesh>
                    )}
                </Canvas>
            </div>
        </div>
    )
}

export default App
