import { InputHTMLAttributes, forwardRef } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberFunc(
  {
    className,
    errorMessage,
    classNameInput = 'rounded-sm border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
    classNameError = 'min-h-[1.25rem]text-sm mt-1 text-red-600',
    onChange,
    ...rest
  },
  ref
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d+$/.test(value) || (value === '' && onChange)) {
      onChange && onChange(event)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} onChange={handleChange} {...rest} ref={ref} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
