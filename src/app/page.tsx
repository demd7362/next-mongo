import MainButtonWrapper from '@/components/MainButtonWrapper'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Next Mongo Demo</h1>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Welcome to NextMongo Hub
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Explore the power of Next.js and MongoDB integration
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <MainButtonWrapper />
          </div>
        </div>
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Built with using Next.js and MongoDB
          </p>
        </div>
      </footer>
    </div>
  )
}
