import { useTranslation } from 'react-i18next'
import { Link, useMatch } from 'react-router-dom'

export default function RegisterHeader() {
  const { t } = useTranslation(['common'])
  const registerMatch = useMatch('/register')
  const isRegistered = Boolean(registerMatch)
  return (
    <header className='py-5'>
      <div className='container'>
        <nav className='flex items-end'>
          <Link to='/'>
            <img
              src='https://tonda.qodeinteractive.com/wp-content/uploads/2018/03/logo-header-1.png'
              alt='logo'
              className='h-8 lg:h-11'
            />
          </Link>
          <div className='ml-5 text-xl lg:text-2xl'>{isRegistered ? t('common:register') : t('common:login')}</div>
        </nav>
      </div>
    </header>
  )
}
