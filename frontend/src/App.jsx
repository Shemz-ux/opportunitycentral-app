import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar';
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
import AdminChangePassword from './pages/Admin/ChangePassword';
import ScrollToTop from './hooks/ScrollToTop';

function App() {
  const Layout = ({children}) => {
    return (
      <>
        <ScrollToTop />
        <Navbar/>
        {children}
        <Footer/>
      </>
    )
  }

  const AdminLayout = ({children}) => {
    return (
      <>
        <ScrollToTop />
        <Navbar/>
        {children}
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
      element: <AdminLayout><AdminLogin /></AdminLayout>
    },
    {
      path: "/admin/dashboard",
      element: <AdminLayout><AdminDashboard /></AdminLayout>
    },
    {
      path: "/admin/blogs",
      element: <AdminLayout><AdminBlogs /></AdminLayout>
    },
    {
      path: "/admin/blogs/create",
      element: <AdminLayout><AdminCreateBlog /></AdminLayout>
    },
    {
      path: "/admin/blogs/edit/:slug",
      element: <AdminLayout><AdminEditBlog /></AdminLayout>
    },
    {
      path: "/admin/mailing-list",
      element: <AdminLayout><AdminMailingList /></AdminLayout>
    },
    {
      path: "/admin/change-password",
      element: <AdminLayout><AdminChangePassword /></AdminLayout>
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
