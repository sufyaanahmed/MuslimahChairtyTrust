import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { DataProvider } from './context/DataContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Cases from './pages/Cases'
import Volunteers from './pages/Volunteers'
import Gallery from './pages/Gallery'
import Story from './pages/Story'
import Contact from './pages/Contact'

function App() {
  return (
    <DataProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/volunteers" element={<Volunteers />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/story" element={<Story />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </Router>
    </DataProvider>
  )
}

export default App


