import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import ProductRating from 'src/components/ProductRating'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, discountPercent, getIdFromNameId } from 'src/utils/utils'
import Product from '../ProductList/Product'
import QuantityController from 'src/components/QuantityController'
import purchaseApi from 'src/apis/purchase'
import { toast } from 'react-toastify'
import { purchaseStatus } from 'src/constants/purchase'

export default function ProductDetail() {
  const [buyQuantity, setBuyQuantity] = useState(1)
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })

  const [currentIndexImage, setCurrentIndexImage] = useState([0, 5])
  const [activeImg, setActiveImg] = useState('')
  const imgRef = useRef<HTMLImageElement>(null)
  const queryClient = useQueryClient()

  const product = productDetailData?.data.data

  const currentImage = useMemo(
    () => (product ? product?.images.slice(...currentIndexImage) : []),
    [product, currentIndexImage]
  )
  const queryConfig = { limit: '20', page: '1', cateogry: product?.category._id }
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProduct(queryConfig)
    },
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000
  })

  const addToCartMutation = useMutation(purchaseApi.addToCard)

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImg(product.images[0])
    }
  }, [product])

  const next = () => {
    if (currentIndexImage[1] < (product as ProductType).images.length) {
      setCurrentIndexImage((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prev = () => {
    if (currentIndexImage[0] > 0) {
      setCurrentIndexImage((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const chooseActive = (img: string) => {
    setActiveImg(img)
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imgRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    const { offsetX, offsetY } = event.nativeEvent
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)

    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    imgRef.current?.removeAttribute('style')
  }

  const handleCountBuyQuantity = (value: number) => {
    setBuyQuantity(value)
  }

  const addToCart = () => {
    addToCartMutation.mutate(
      { buy_count: buyQuantity, product_id: product?._id as string },
      {
        onSuccess: (data) => {
          toast.success(data.data.message, { autoClose: 1000 })
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchaseStatus.inCart }] })
        }
      }
    )
  }

  if (!product) return null

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImg}
                  alt={product.name}
                  className='pointer-events-none absolute top-0 left-0 h-full w-full bg-white object-cover'
                  ref={imgRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={prev}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImage.map((img) => {
                  const isActive = img === activeImg
                  return (
                    <div className='relative w-full pt-[100%]' key={img} onMouseEnter={() => chooseActive(img)}>
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange-700'></div>}
                    </div>
                  )
                })}
                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={next}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-orange-700 text-orange-700'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassName='fill-orange-700 text-orange-700 h-4 w-4'
                    inactiveClassName='fill-gray text-gray-300 h-4 w-4'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span>{formatNumberToSocialStyle(product.sold)}+</span>
                  <span className='ml-1 text-gray-500'>bought</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-orange-700'>{formatCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-orange-700 px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  - {discountPercent(product.price_before_discount, product.price)}
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Quantity</div>
                <QuantityController
                  value={buyQuantity}
                  onIncrease={handleCountBuyQuantity}
                  onDecrease={handleCountBuyQuantity}
                  onType={handleCountBuyQuantity}
                  max={product.quantity}
                />
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} available products</div>
              </div>
              <div className='mt-8 flex items-center'>
                <button
                  className='flex h-12 items-center justify-center rounded-sm border border-orange-700 bg-orange-700/10 px-5 capitalize text-orange-700 shadow-sm hover:bg-orange-700/20'
                  onClick={addToCart}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='mr-[10px] h-5 w-5 fill-current stroke-orange-700 text-orange-700'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                    />
                  </svg>
                  Add to Cart
                </button>
                <button className='ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange-700 px-5 capitalize text-white shadow-sm outline-none hover:bg-orange-700/90'>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <div className='bg-white p-4 shadow'>
            <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Product Description</div>
            <div className='m-4 text-sm leading-loose'>
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}></div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <div className='uppercase text-gray-400'>Products related to this item</div>
          {productsData && (
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {productsData.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
