import { useState } from "react"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import React from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const navigate = useNavigate()


  const formSubmit = async (e) => {
    e.preventDefault()
    try {

      const res =  await fetch('http://localhost:4000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.message || "Something went wrong");
        toast.error(data.message || "Something went wrong");
        return;
      }

      setEmail('')
      setPassword('')
      setError('')
      navigate('/')
      toast.success('Login successful')

    } catch (error) {
      toast.error(error.message)
      setError(error.message)
    }

  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="card bg-base00 shadow-xl h-screen flex items-center justify-center flex-col">
      <ToastContainer />
      <form onSubmit={formSubmit} className="card-body space-y-10">
        <h2 className="card-title text-2xl text-center">Login</h2>
        <p className="text-sm opacity-70">Enter your email and password to access your account</p>

        <div className="form-control w-full mt-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@example.com" className="input input-bordered w-full" />
          <p className="text-red-500 text-sm">{error}</p>
        </div>
        <div className="form-control w-full mt-2">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="input input-bordered w-full pr-10"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm btn-circle"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </button>
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        </div>

        {/* <div className="flex items-center justify-between mt-2">
          <div className="form-control">
            <label className="label cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm" />
              <span className="label-text ml-2">Remember me</span>
            </label>
          </div>
          <a className="link link-hover text-sm">Forgot password?</a>
        </div> */}

        <div className="card-actions mt-6">
          <button type="submit" className="btn btn-primary w-full">Login</button>
        </div>
      </form>
    </div>
  )
}
