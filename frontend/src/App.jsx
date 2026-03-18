import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/Home/HomePage';
import AboutPage from './pages/About/AboutPage';

function App() {
  const Layout = ({children}) => {
    return (
      <>
      <Navbar/>
        {children}
      <Footer/>
      </>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout><HomePage /></Layout>
    },
    { 
      path: "/about",
      element: <Layout><AboutPage /></Layout>
    },
    { 
      path: "/services",
      element: <Layout><div>Services</div></Layout>
    },
    { 
      path: "/blog",
      element: <Layout><div>blog</div></Layout>
    },
    { 
      path: "/contact",
      element: <Layout><div>contact</div></Layout>
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
