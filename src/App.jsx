import './App.css'
import {Route, Routes} from 'react-router-dom'
import Layout from './components/layout.jsx'
import IndexPage from './pages/IndexPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegsiterPage from './pages/RegisterPage.jsx'
import { UserContextProvider } from './contexts/UserContext.jsx'
import CreatePost from './pages/CreatePost.jsx'
import PostPage from './pages/PostPage.jsx'
import EditPost from './pages/EditPost.jsx'

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element = {<Layout />}>
          <Route index element={ <IndexPage /> } />
          <Route path='/login' element={ <LoginPage /> }/>
          <Route path='/register' element = { <RegsiterPage /> } />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
