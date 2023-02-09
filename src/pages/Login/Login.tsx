import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Login</div>
              <div className='mt-8'>
                <input
                  type='email'
                  name='email'
                  className='rounded-sm border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Email'
                />
                <div className='min-h-[1.25rem]text-sm mt-1 text-red-600'></div>
              </div>
              <div className='mt-2'>
                <input
                  type='password'
                  name='password'
                  className='rounded-sm border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Password'
                />
                <div className='min-h-[1.25rem]text-sm mt-1 text-red-600'></div>
              </div>
              <div className='mt-2'>
                <button
                  type='submit'
                  className='w-full bg-red-500 py-4 px-2 text-center text-sm uppercase text-white hover:bg-red-600'
                >
                  Login
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-slate-400'>Do not have an account? </span>
                <Link to='/register' className='ml-1 text-red-400'>
                  Register here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
