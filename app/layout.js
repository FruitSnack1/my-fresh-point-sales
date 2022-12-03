import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import { Nunito } from '@next/font/google'
import { Footer } from './footer'

const nunito = Nunito({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body className={nunito.className}>
        <nav
          className='navbar sticky-top flex-md-nowrap p-3 shadow-sm'
          style={{ height: '70px' }}
        >
          <div className='container'>
            <h3 className='fw-bold m-auto '>
              MyFreshPoint <span className='text-danger'>SALES</span>
            </h3>
          </div>
        </nav>
        <div className='main container'>{children}</div>
        <Footer />
      </body>
    </html>
  )
}
