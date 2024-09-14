import MainButtonWrapper from '@/components/MainButtonWrapper'

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Next + Mongo Demo</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex flex-col items-center justify-center space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700">Welcome to My App</h2>
            <p className="text-gray-500">Get started by exploring our features</p>
            <MainButtonWrapper />
          </div>
        </div>
      </main>
      <footer className="bg-white shadow mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Mongoose is awesome.
          </p>
        </div>
      </footer>
    </div>
  )
}
