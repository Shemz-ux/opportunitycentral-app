import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/Home/HomePage';
import AboutPage from './pages/About/AboutPage';
import ServicesPage from './pages/Services/ServicesPage';
import BlogPage from './pages/Blog/BlogPage';
import BlogPost from './pages/Blog/BlogPost';

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
      element: <Layout><ServicesPage /></Layout>
    },
    { 
      path: "/blog",
      element: <Layout><BlogPage /></Layout>
    },
    {
      path: "/blog/:slug",
      element: <Layout><BlogPost /></Layout>
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
