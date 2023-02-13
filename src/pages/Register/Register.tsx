import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { registerAccount } from 'src/apis/auth.api'
import Input from 'src/components/Input'
import { ResponseApi } from 'src/types/ultils.type'
import { Schema, schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Schema

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError?.email) {
            setError('email', {
              message: formError.email,
              type: 'Server'
            })
          }
          if (formError?.password) {
            setError('password', {
              message: formError.password,
              type: 'Server'
            })
          }
        }
      }
    })
  })

  return (
    <div>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-3 lg:py-32 lg:pr-10'>
          <div className='lg:col-span2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Register</div>
              <Input
                className='mt-8'
                type='email'
                placeholder='Email'
                register={register}
                name='email'
                errorMessage={errors.email?.message}
              />
              <Input
                className='mt-2'
                type='password'
                placeholder='Password'
                register={register}
                autoComplete='on'
                name='password'
                errorMessage={errors.password?.message}
              />
              <Input
                className='mt-2'
                type='password'
                placeholder='Confirm Password'
                register={register}
                name='confirm_password'
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
