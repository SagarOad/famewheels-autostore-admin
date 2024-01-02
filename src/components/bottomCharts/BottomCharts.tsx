import React from 'react'
import CustomerChart from '../charts/CustomerChart'
import ConversionChart from '../charts/ConversionChart'
import RevenueChart from '../charts/RevenueChart'
import BottomRevenueChart from '../charts/BottomRevenueChart'
import BotoomPieChart from '../charts/BotoomPieChart'

const BottomCharts = () => {
  return (
    <div className='grid grid-cols-12 mt-4 gap-3'>
        
        <section className='lg:col-span-8 col-span-12 p-3 rounded-lg shadow-xl'>
    <div className='flex justify-between'>

    <h1 className='font-semibold'>Revenue Of Last 30 Days</h1>

    <span className='font-semibold'>...</span>
    </div>

<p className='py-2 text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

<BottomRevenueChart />


</section>



<section className='lg:col-span-4 col-span-12 p-3 rounded-lg shadow-xl'>
    <div className='flex justify-between'>

    <h1 className='font-semibold'>Revenue Of Last 30 Days</h1>

    <span className='font-semibold'>...</span>
    </div>

<p className='py-2 text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, quam facilis, magnam quia facere hic ea architecto harum dolores nobis aperiam doloribus quo neque! Iure ut debitis in vero earum.</p>

<BotoomPieChart />


</section>

    </div>
  )
}

export default BottomCharts