import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'

const Login = () => {
  return(
    <div>
      <h2>Login</h2>
    </div>
  )
}
const CreateAccount = () => {
  return(
    <div>
      <h2>Create Account</h2>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <Login/>
      <CreateAccount/>
    </div>
  )
}

export default App
