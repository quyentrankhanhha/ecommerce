import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { purchaseStatus } from 'src/constants/purchase'
import { Purchase } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { produce } from 'immer'
interface ExtendedPurchase extends Purchase {
  disabled: boolean
  checked: boolean
}

export default function Cart() {
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>([])
  const { data: purchaseInCartData } = useQuery({
    queryKey: ['purchase', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.inCart })
  })

  const purchaseInCart = purchaseInCartData?.data.data

  const isAllChecked = extendedPurchase.every((purchase) => purchase.checked)

  useEffect(() => {
    setExtendedPurchase(
      purchaseInCart?.map((purchase) => ({
        ...purchase,
        disabled: false,
        checked: false
      })) || []
    )
  }, [purchaseInCart])

  const handleCheck = (productIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchase(
      produce((draft) => {
        draft[productIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchase((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-orange-700'
                      checked={isAllChecked}
                      onClick={handleCheckAll}
                    />
                  </div>
                  <div className='flex-grow text-black'>Product</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Price</div>
                  <div className='col-span-1'>Quantity</div>
                  <div className='col-span-1'>Total price</div>
                  <div className='col-span-1'>Action</div>
                </div>
              </div>
            </div>
            <div className='my-3 rounded-sm bg-white p-5 shadow'>
              {extendedPurchase?.map((purchase, index) => (
                <div
                  key={purchase._id}
                  className='mb-5 grid grid-cols-12 rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0'
                >
                  <div className='col-span-6'>
                    <div className='flex'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange-700'
                          checked={purchase.checked}
                          onChange={handleCheck(index)}
                        />
                      </div>
                      <div className='flex-grow'>
                        <div className='flex'>
                          <Link
                            to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase._id })}`}
                            className='h-20 w-20 flex-shrink-0'
                          >
                            <img alt={purchase.product.name} src={purchase.product.image} />
                          </Link>
                          <div className='flex-grow px-2 pt-1 pb-2'>
                            <Link
                              to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase._id })}`}
                              className='line-clamp-2'
                            >
                              {purchase.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 items-center'>
                      <div className='col-span-2'>
                        <div className='flex items-center justify-center'>
                          <span className='text-gray-300 line-through'>
                            {formatCurrency(purchase.price_before_discount)}
                          </span>
                          <span className='ml-3'>{formatCurrency(purchase.price)}</span>
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <QuantityController
                          max={purchase.product.quantity}
                          value={purchase.buy_count}
                          classNameWrapper='flex items-center'
                        />
                      </div>
                      <div className='col-span-1'>
                        <span className='text-orange-700'>
                          {formatCurrency(purchase.price * purchase.product.quantity)}
                        </span>
                      </div>
                      <div className='col-span-1'>
                        <button className='bg-none text-black transition-colors hover:text-orange-700'>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='sticky bottom-0 z-10 mt-10 flex flex-col rounded-sm border border-gray-100 bg-white py-5 px-9 shadow sm:flex-row sm:items-center'>
          <div className='flex items-center'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input
                type='checkbox'
                className='h-5 w-5 accent-orange-700'
                checked={isAllChecked}
                onClick={handleCheckAll}
              />
            </div>
            <button className='bb-none mx-3 border-none' onClick={handleCheckAll}>
              Choose all ({extendedPurchase.length})
            </button>
            <button className='bb-none mx-3 border-none'>Delete</button>
          </div>

          <div className='ml-auto mt-5 flex flex-col items-center sm:mt-0 sm:ml-auto sm:flex-row'>
            <div>
              <div className='flex items-center sm:justify-end'>
                <div>Subtotal</div>
                <div className='ml-2 text-2xl text-orange-700'>123</div>
              </div>
              <div className='flex items-center text-sm sm:justify-end'>
                <div className='text-gray-500'>Save</div>
                <div className='ml-6 text-orange-700'>123</div>
              </div>
            </div>
            <Button className='mt-5 flex h-10 w-52 items-center justify-center bg-orange-700 text-sm uppercase text-white hover:bg-orange-800 sm:mt-0 sm:ml-4'>
              Proceed to checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
