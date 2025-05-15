import { useState } from "react"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import React from "react"
import { toast, ToastContainer } from "react-toastify"
import { useNavigate } from "react-router-dom"

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!fullName || !email || !password) {
      setError("Please fill this field")
    }

    if (password !== confirmPassword) {
      setError("Password and confirm password do not match")
      return
    }

    try {
      const res = await fetch('http://localhost:4000/api/v1/signup', {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        toast.error(data.message || "Something went wrong");
        return;
      }
      toast.success('Signup successful')

      setEmail('')
      setPassword('')
      setFullName('')
      setError('')
      navigate('/')

    } catch (error) {
      toast.error(error.message)
      setError(error.message)
    }
  }

  return (
    <div className="card bg-base-100 shadow-xl flex flex-col items-center justify-center h-screen">
      <ToastContainer/>
      <div className="card-body space-y-5 max-w-2xl">
        <h2 className="card-title text-2xl text-center">Create an account</h2>
        <p className="text-sm opacity-70 text-center">Enter your details to create a new account</p>

        <form onSubmit={handleSubmit}>

          <div className="mt-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">First name</span>
              </label>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" placeholder="John" className="input input-bordered w-full" />
            </div>
          </div>

          <div className="form-control w-full mt-2">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="input input-bordered w-full" />
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
            </div>
          </div>

          <div className="form-control w-full mt-2">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <div className="relative">
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="input input-bordered w-full pr-10"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 b btn-ghost btn-sm btn-circle"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          </div>

          <div className="form-control mt-2">
            <label className="label justify-start">
              <span className="label-text ml-2 text-xs">
                Already have an account? <a href="/login"  className="link link-hover text-blue-500 font-semibold">Login</a>
              </span>
            </label>
          </div>


          <div className="form-control mt-2">
            <label className="label cursor-pointer justify-start">
              <input type="checkbox" className="checkbox checkbox-sm" />
              <span className="label-text ml-2 text-xs">
                I agree to the <a className="link link-hover">Terms of Service</a> and{" "}
                <a className="link link-hover">Privacy Policy</a>
              </span>
            </label>
          </div>

          <div className="card-actions mt-6">
            <button type="submit" className="btn btn-primary w-full">Sign Up</button>
          </div>
        </form>

      </div>
    </div>
  )
}
