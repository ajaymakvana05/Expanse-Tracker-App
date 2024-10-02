import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './pages/register'
import Login from './pages/Login'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </>
  )
}

export function ProtectedRoute(props) {
  if (localStorage.getItem('user')) {
    // eslint-disable-next-line react/prop-types
    return props.children;
  } else {
    return <Navigate to="/login" />
  }
}

export default App
