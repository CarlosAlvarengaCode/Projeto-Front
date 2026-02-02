import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/home/App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './components/about/App.tsx'
import Menu from './components/menu/App.tsx'
import Post from './assets/about/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
   <Menu/>
    <Routes>
    <Route path='/' element={<App/>}></Route>
    <Route path='/about' element={<About/>}></Route>
    <Route path='/post' element={<Post/>}></Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
