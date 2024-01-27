import React, { useRef } from 'react'
import { toast } from 'react-toastify'
import config from 'src/constants/config'
interface Props {
  onChange?: (file?: File) => void
}
export default function InputFile({ onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if (fileFromLocal && (fileFromLocal?.size >= config.maxAvatarUploadSize || fileFromLocal.type.includes('image'))) {
      toast.error('Unable to process this image. Please try another one.')
    } else onChange && onChange(fileFromLocal)
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  return (
    <>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(event) => (event.target.value = null)}
      />
      <button
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
        type='button'
        onClick={handleUpload}
      >
        Choose picture
      </button>
    </>
  )
}
