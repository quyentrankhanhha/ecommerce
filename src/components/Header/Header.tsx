import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import authApi from 'src/apis/auth.api'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import Popover from '../Popover'
import { Link } from 'react-router-dom'
import { purchaseStatus } from 'src/constants/purchase'
import purchaseApi from 'src/apis/purchase.api'
import { formatCurrency } from 'src/utils/utils'
import useSearchProducts from 'src/hooks/useSearchProducts'
import { useTranslation } from 'react-i18next'
import { locales } from 'src/i18n/i18n'

const MAX_PURCHASES = 5

export default function Header() {
  const { t, i18n } = useTranslation(['common'])
  const currentLanguage = locales[i18n.language as keyof typeof locales]
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const { register, onSubmitSearch } = useSearchProducts()
  const queryClient = useQueryClient()

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchase', { status: purchaseStatus.inCart }] })
    }
  })
  // when navigating to other pages, Header will not unmount and will re render again so that queries are not inactive
  const { data: purchaseInCartData } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.inCart }),
    enabled: isAuthenticated
  })

  const purchaseInCart = purchaseInCartData?.data.data

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const changeLanguage = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className='pb-5 pt-2'>
      <div className='container'>
        <div className='flex justify-end'>
          <Popover
            className='flex cursor-pointer items-center py-1 hover:text-orange-700/70'
            renderPopover={
              <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
                <div className='flex flex-col py-2 px-3'>
                  <button className='py-2 px-3 text-left hover:text-orange-700/70' onClick={() => changeLanguage('en')}>
                    English
                  </button>
                  <button
                    className='mt-2 py-2 px-3 text-left hover:text-orange-700/70'
                    onClick={() => changeLanguage('vi')}
                  >
                    Tiếng Việt
                  </button>
                </div>
              </div>
            }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
              />
            </svg>
            <span className='mx-1'>{currentLanguage}</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
            </svg>
          </Popover>
          {isAuthenticated && (
            <Popover
              className='flex cursor-pointer items-center py-1 hover:text-orange-700/70'
              renderPopover={
                <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
                  <Link
                    to={path.profile}
                    className='block w-full bg-white py-3 px-4 hover:bg-slate-100 hover:text-orange-700/70'
                  >
                    {t('common:my_profile')}
                  </Link>
                  <Link to='/' className='block w-full bg-white py-3 px-4 hover:bg-slate-100 hover:text-orange-700/70'>
                    {t('common:my_order')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-orange-700/70'
                  >
                    {t('common:logout')}
                  </button>
                </div>
              }
            >
              <div className='mr-2 h-5 w-5 flex-shrink-0'>
                <img
                  src={profile?.avatar || 'https://avatars.githubusercontent.com/u/55784860?v=4'}
                  alt='avatar'
                  className='h-full w-full rounded-full object-cover'
                />
              </div>
              <div>{profile?.email}</div>
            </Popover>
          )}
          {!isAuthenticated && (
            <div className='flex items-center'>
              <Link to={path.register} className='hover:text-orange/70 mx-3 capitalize'>
                {t('common:register')}
              </Link>
              <div className='h-4 border-r-[1px] border-r-white/40'></div>
              <Link to={path.login} className='hover:text-orange/70 mx-3 capitalize'>
                {t('common:login')}
              </Link>
            </div>
          )}
        </div>
        <div className='mt-4 grid grid-cols-12 items-end gap-4'>
          <Link to='/' className='col-span-2'>
            <img
              src='https://tonda.qodeinteractive.com/wp-content/uploads/2018/03/logo-header-1.png'
              alt='logo'
              className='h-8 lg:h-11'
            />
          </Link>
          <form className='col-span-9 border border-gray-400 bg-transparent' onSubmit={onSubmitSearch}>
            <div className='flex rounded-sm p-1'>
              <input
                type='text'
                className='flex-grow border-none bg-transparent px-3 py-2  outline-none'
                placeholder='Search...'
                {...register('name')}
              />
              <button className='bg-orange flex-shrink rounded-sm py-2 px-6 hover:opacity-90'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </button>
            </div>
          </form>
          <div className='col-span-1 justify-self-end'>
            <Popover
              placement='bottom-end'
              renderPopover={
                <div className='relative max-w-[400px] rounded-sm border border-gray-200 bg-white text-sm shadow-md'>
                  {purchaseInCart && purchaseInCart.length > 0 ? (
                    <div className='p-2'>
                      <div className='capitalize text-gray-400'>{t('common:cart')}</div>
                      <div className='mt-5'>
                        {purchaseInCart.slice(0, MAX_PURCHASES).map((purchase) => (
                          <div className='mt-2 flex p-2 hover:bg-gray-100' key={purchase._id}>
                            <div className='flex-shrink-0'>
                              <img
                                src={purchase.product.image}
                                alt={purchase.product.name}
                                className='h-11 w-11 object-cover'
                              />
                            </div>
                            <div className='ml-2 flex-grow overflow-hidden'>
                              <div className='truncate'>{purchase.product.name} </div>
                            </div>
                            <div className='ml-2 flex-shrink-0 text-orange-700'>
                              <span className=''>{formatCurrency(purchase.product.price)} </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className='mt-6 flex items-center justify-between'>
                        <div className='text-xs text-gray-500'>
                          {purchaseInCart.length > MAX_PURCHASES
                            ? purchaseInCart.length - MAX_PURCHASES + t('common:more_product')
                            : ''}
                        </div>
                        <Link
                          to={path.cart}
                          className='rounded-sm bg-orange-700 px-4 py-2 capitalize text-white hover:bg-opacity-80'
                        >
                          {t('common:view_cart')}
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className='flex h-[300px] w-[400px] items-center justify-center p-2'>
                      <p>{t('common:empty_cart')}</p>
                    </div>
                  )}
                </div>
              }
            >
              <Link to={path.cart} className='relative'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                  />
                </svg>
                {purchaseInCart && (
                  <span className='absolute top-[-10px] left-[20px] rounded-full bg-white px-[9px] py-[1px] text-xs text-orange-700 '>
                    {purchaseInCart?.length}
                  </span>
                )}
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
