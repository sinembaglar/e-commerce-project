import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './layout/Header'
import PageContent from './layout/PageContent'
import Footer from './layout/Footer'

function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const flashMessage = sessionStorage.getItem('flashMessage')
      if (flashMessage) {
        sessionStorage.removeItem('flashMessage')
        toast.success(flashMessage)
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <PageContent />
        <Footer />
        <ToastContainer position="top-center" />
      </div>
    </BrowserRouter>
  )
}

export default App
