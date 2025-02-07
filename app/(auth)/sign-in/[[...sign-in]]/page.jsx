import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50">
      <div className="container mx-auto min-h-screen flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md text-center mb-8">
          <span className="text-blue-600 font-semibold mb-4 block">Welcome Back</span>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Sign in to <span className="text-blue-600">Lectern</span>
          </h1>
          <p className="text-slate-600 mb-8">
            Continue your learning journey with AI-powered study tools
          </p>
        </div>

        <div className="">
          <SignIn />
        </div>
      </div>
    </section>
  )
}