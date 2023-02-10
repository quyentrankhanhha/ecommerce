import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props {
  className?: string
  type: React.HTMLInputTypeAttribute
  placeholder: string
  autoComplete?: string
  register: UseFormRegister<any>
  name: string
  rules?: RegisterOptions
  errorMessage?: string
}

export default function Input({
  className,
  type,
  placeholder,
  autoComplete,
  register,
  name,
  rules,
  errorMessage
}: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        className='rounded-sm border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name, rules)}
      />
      <div className='min-h-[1.25rem]text-sm mt-1 text-red-600'>{errorMessage}</div>
    </div>
  )
}
