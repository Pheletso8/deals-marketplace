export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-teal-100 shadow-md shadow-teal-200 p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-black/60">Register</h1>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-lg font-semibold transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-700 mt-4">
          Already have an account?{' '}
          <a href="/signin" className="text-teal-600 font-semibold hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
