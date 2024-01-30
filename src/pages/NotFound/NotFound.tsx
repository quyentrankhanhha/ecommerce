import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className='bg-white '>
      <div className='container mx-auto flex min-h-screen items-center px-6 py-12'>
        <div>
          <p className='text-sm font-medium text-orange-700'>404 error</p>
          <h1 className='mt-3 text-2xl font-semibold text-orange-700  md:text-3xl'>We can’t find that page</h1>
          <p className='mt-4 text-gray-500 dark:text-gray-400'>
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>

          <div className='mt-6 flex items-center gap-x-3'>
            <button className='hover:bg-gray-100sm:w-auto flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-white px-5 py-2 text-sm text-orange-700 transition-colors duration-200'>
              <Link to='/'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  className='h-5 w-5 rtl:rotate-180'
                >
                  <path stroke-linecap='round' stroke-linejoin='round' d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18' />
                </svg>

                <span>Go back</span>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
