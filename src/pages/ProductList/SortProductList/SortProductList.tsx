export default function SortProductList() {
  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sort by</div>
          <button className='capitalze h-8 bg-red-300 px-4 text-center text-sm text-white hover:bg-red-300/10'>
            Popular
          </button>
          <button className='h-8 bg-white px-4 text-center text-sm capitalize text-black hover:bg-slate-100'>
            Lastest
          </button>
          <button className='h-8 bg-white px-4 text-center text-sm capitalize text-black hover:bg-slate-100'>
            Best Seller
          </button>
          <select className='h-8 bg-white px-4 text-center text-sm capitalize text-black hover:bg-slate-100'>
            <option value='' disabled>
              Price
            </option>
            <option value='price:asc'>Price: Low To High</option>
            <option value='price:desc'>Price: High To Low</option>
          </select>
        </div>
      </div>
      <div className='flex items-center'>
        <div>
          <span className='text-red-500'>1</span>
          <span>2</span>
        </div>
        <div className='ml-2'>button.px-3.h-8.rounded-tl-sm.rounded-bl-sm.bg-white/60.hover:bg-slate-109</div>
      </div>
    </div>
  )
}
