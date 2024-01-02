import React from 'react'
import CustomerChart from '../charts/CustomerChart'
import ConversionChart from '../charts/ConversionChart'
import RevenueChart from '../charts/RevenueChart'

const ChartCard = () => {
  return (
    <div className='grid grid-cols-12 mt-12 gap-3'>

<section className='max-xl:col-span-6 max-lg:col-span-12 xl:col-span-4 p-3 rounded-lg shadow-xl'>
    <div className='flex justify-between'>

    <h1 className='font-semibold'>Customers</h1>

    <span className='font-semibold'>...</span>
    </div>

<p className='py-2 text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

<CustomerChart />


</section>




<section className='max-xl:col-span-6 max-lg:col-span-12 xl:col-span-4 p-3 rounded-lg shadow-xl'>
    <div className='flex justify-between'>

    <h1 className='font-semibold'>Conversion</h1>

    <span className='font-semibold'>...</span>
    </div>

<p className='py-2 text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

<ConversionChart />


</section>


<section className='max-xl:col-span-6 max-lg:col-span-12 xl:col-span-4 p-3 rounded-lg shadow-xl'>
    <div className='flex justify-between'>

    <h1 className='font-semibold'>Revenue</h1>

    <span className='font-semibold'>...</span>
    </div>

<p className='py-2 text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

<RevenueChart />


</section>
    </div>
  )
}

export default ChartCard