import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout.tsx'
import Home from './pages/Home.tsx'
import Experience from './pages/Experience.tsx'
import Projects from './pages/Projects.tsx'
import Community from './pages/Community.tsx'
import Awards from './pages/Awards.tsx'
import Contact from './pages/Contact.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="experience" element={<Experience />} />
          <Route path="projects" element={<Projects />} />
          <Route path="community" element={<Community />} />
          <Route path="awards" element={<Awards />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
