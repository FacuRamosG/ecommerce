import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Practica Ecommerce',
  description: 'Generated NextJS',
}

export default function RootLayout({children}: {children: React.ReactNode}) {

  return (
    <html lang="en">
      <head>
        <meta itemProp='image' content='https://ecomer-gold.vercel.app/151shots_so.png'/>
      </head>
      <body className='' >
        <header className='bg-[#44444d] h-14 flex justify-center items-center fixed w-full z-20'>
          
          <form action="/items" className='flex md::max-w-screen-xl m-auto'>
            <a href="/" className='text-3xl text-center mr-1 sm:mr-10 -mt-1' >MM</a>
            <input type="text" name='search' required className='h-8 w-[280px] sm:w-[500px] bg-slate-100 p-2 text-slate-600 border-none focus:bg-slate-200 selection:bg-slate-300' placeholder='Iphone, Notebook...' />
            <button className='h-8 px-4 bg-slate-100 border-l rounded-sm'>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="gray" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
              <path d="M21 21l-6 -6"></path>
            </svg>
            </button>
          </form>
        </header>
        <main className='p-6 max-w-screen-xl mx-auto'>
          {children}
        </main>
      </body>
    </html>
  )
}
