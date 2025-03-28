import './App.css'
import { ThemeProvider } from './components/theme-provider'
import AddTodo from './components/add-todo'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { Toaster } from 'react-hot-toast'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import ProtectAuthPage from './components/ProtectAuthPage'

function App () {

  return (
    <>
      <ThemeProvider>
        <Toaster />

        <Routes>

          <Route path="/login" element={ <ProtectAuthPage><Login /></ProtectAuthPage> } />
          <Route path="/register" element={ <ProtectAuthPage><Register /></ProtectAuthPage> } />

          <Route path="/" element={ <Layout /> }>
            <Route index element={ <Home /> } />
            <Route path="/add-task" element={ <AddTodo /> } />
          </Route>

        </Routes>

      </ThemeProvider >
    </>
  )
}

export default App
