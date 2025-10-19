import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!name || !email || !password || !confirm) {
      setError('Please fill in all fields')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data?.message || 'Registration failed')

      navigate('/login')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Create Student account</h2>
            <p className="text-sm text-gray-600 mb-6">Register a new hostel member account</p>

            {error && (
                <div className="mb-4 text-red-700 bg-red-100 px-4 py-2 rounded">{error}</div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-3"
                        placeholder="Your full name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-3"
                        placeholder="you@example.com"
                    />
                </div>

                {/* Student details section (grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Registration number</label>
                        <input
                            name="registrationNumber"
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-3"
                            placeholder="e.g. TG/20xx/xxxx"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Level</label>
                        <select
                            name="level"
                            defaultValue=""
                            className="mt-1 block w-full rounded-md border-gray-200 p-3 bg-white"
                        >
                            <option value="" disabled>
                                Select level
                            </option>
                            <option value="Level 1">Level 1</option>
                            <option value="Level 2">Level 2</option>
                            <option value="Level 3">Level 3</option>
                            <option value="Level 4">Level 4</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone number</label>
                        <input
                            name="phone"
                            type="tel"
                            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-3"
                            placeholder="070 000 0000"
                        />
                    </div>
                </div>
                {/* End student details section */}

                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-3"
                        placeholder="Choose a password"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm password</label>
                    <input
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        type="password"
                        className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-3"
                        placeholder="Repeat password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold mt-2"
                >
                    {loading ? 'Creating...' : 'Create account'}
                </button>
            </form>

            <p className="mt-4 text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-emerald-600 font-medium">
                    Sign in
                </Link>
            </p>
        </div>
    </div>
)
}

export default Register
