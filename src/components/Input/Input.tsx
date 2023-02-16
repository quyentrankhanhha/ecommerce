import { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

export default function Input({
  className,
  type,
  placeholder,
  autoComplete,
  register,
  name,
  rules,
  errorMessage,
  classNameInput = 'rounded-sm border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
  classNameError = 'min-h-[1.25rem]text-sm mt-1 text-red-600'
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}

  return (
    <div className={className}>
      <input
        type={type}
        className={classNameInput}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...registerResult}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
