import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/Home/HomePage';
import AboutPage from './pages/About/AboutPage';
import ServicesPage from './pages/Services/ServicesPage';
import BlogPage from './pages/Blog/BlogPage';
import BlogPost from './pages/Blog/BlogPost';
import ContactPage from './pages/Contact/ContactPage';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminBlogs from './pages/Admin/Blogs';
import AdminMailingList from './pages/Admin/MailingList';
import AdminCreateBlog from './pages/Admin/CreateBlog';
import AdminEditBlog from './pages/Admin/EditBlog';

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
      element: <Layout><ContactPage /></Layout>
    },
    {
      path: "/admin/login",
      element: <Layout><AdminLogin /></Layout>
    },
    {
      path: "/admin/dashboard",
      element: <Layout><AdminDashboard /></Layout>
    },
    {
      path: "/admin/blogs",
      element: <Layout><AdminBlogs /></Layout>
    },
    {
      path: "/admin/blogs/create",
      element: <Layout><AdminCreateBlog /></Layout>
    },
    {
      path: "/admin/blogs/edit/:slug",
      element: <Layout><AdminEditBlog /></Layout>
    },
    {
      path: "/admin/mailing-list",
      element: <Layout><AdminMailingList /></Layout>
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
