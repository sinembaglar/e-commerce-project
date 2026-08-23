import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './layout/Header'
import PageContent from './layout/PageContent'
import Footer from './layout/Footer'
import { verifyToken } from './redux/actions/clientActions'
import { fetchCategories } from './redux/actions/productActions'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(verifyToken())
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    const flashMessage = sessionStorage.getItem('flashMessage')
    if (flashMessage) {
      sessionStorage.removeItem('flashMessage')
      toast.success(flashMessage)
    }
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
