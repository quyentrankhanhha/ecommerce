import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { getRules } from 'src/utils/rules'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<FormData>()

  const rules = getRules(getValues)
  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Register</div>
              <Input
                className='mt-8'
                type='email'
                placeholder='Email'
                register={register}
                name='email'
                rules={rules.email}
                errorMessage={errors.email?.message}
              />
              <Input
                className='mt-2'
                type='password'
                placeholder='Password'
                register={register}
                autoComplete='on'
                rules={rules.password}
                name='password'
                errorMessage={errors.password?.message}
              />
              <Input
                className='mt-2'
                type='password'
                placeholder='Confirm Password'
                autoComplete='on'
                register={register}
                name='password'
                rules={rules.confirm_password}
                errorMessage={errors.confirm_password?.message}
              />
              <div className='mt-2'>
                <button
                  type='submit'
                  className='w-full bg-red-500 py-4 px-2 text-center text-sm uppercase text-white hover:bg-red-600'
                >
                  Register
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-slate-400'>Already have an account? </span>
                <Link to='/login' className='ml-1 text-red-400'>
                  Sign in here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
