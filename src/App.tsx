import Footer from '@/components/shared/footer'
import Navbar from '@/components/shared/navbar'
import { RegisterPage } from '@/pages/RegisterPage' // Adicionei as chaves

function App() {
  return (
    <div className='flex flex-col min-h-svh'>
      <Navbar />
      <main className='flex-1 flex flex-col'>
        {/* <HomePage /> */}
        {/* <LoginPage /> */}
        <RegisterPage />
      </main>
      <Footer />
    </div>
  )
}

export default App
