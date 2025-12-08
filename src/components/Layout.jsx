import Navbar from './Navbar'
import Footer from './Footer'
import BackToTop from './BackToTop'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default Layout


