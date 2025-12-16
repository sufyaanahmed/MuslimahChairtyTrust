import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { DataProvider } from './context/DataContext'
import Layout from './components/Layout'
import Loader from './components/Loader'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Cases from './pages/Cases'
import Volunteers from './pages/Volunteers'
import Gallery from './pages/Gallery'
import Story from './pages/Story'
import Blog from './pages/Blog'
import Contact from './pages/Contact'

function App() {
  const [showLoader, setShowLoader] = useState(true)

  return (
    <DataProvider>
      {showLoader && <Loader onComplete={() => setShowLoader(false)} />}
      {!showLoader && (
        <Router>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cases" element={<Cases />} />
              <Route path="/volunteers" element={<Volunteers />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/story" element={<Story />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
        </Router>
      )}
    </DataProvider>
  )
}

export default App


