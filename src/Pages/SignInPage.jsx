export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-teal-100 shadow-md shadow-teal-200 p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-black/60">Welcome Back!</h1>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-lg font-semibold transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-700 mt-4">
          Don't have an account?{' '}
          <a href="/register" className="text-teal-600 font-semibold hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

