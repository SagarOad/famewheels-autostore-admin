import React from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import StarsIcon from '@mui/icons-material/Stars';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
const InfoCards = () => {
  return (
    <div className='grid grid-cols-12 gap-2'>
        
        <section className='p-3 bg-slate-100 max-sm:col-span-12 max-xl:col-span-6 xl:col-span-3 rounded-lg flex flex-col gap-4 text-xl shadow-xl'>
            <h1 className='text-gray-900 flex items-center gap-1'><span className='p-0.5 rounded bg-gray-300'><StarsIcon sx={{color:"black"}} fontSize='large'/> </span> Members</h1>

<p className='text-gray-900 text-2xl flex gap-3 items-center'>59467 <span className='text-xs border-[1px] border-gray-900 py-1 rounded-full px-2'>High 313 <ArrowUpwardIcon sx={{color:"black",fontSize:"1rem"}}/> </span></p>


<p className='text-gray-900 text-base'>Total for this month</p>

        </section>




        <section className='p-3 bg-gray-900 max-sm:col-span-12 max-xl:col-span-6 xl:col-span-3 rounded-lg flex flex-col gap-4 text-xl shadow-xl'>
        <h1 className='text-white flex items-center gap-1'><span className='p-0.5 px-1 rounded bg-gray-500'><LocalShippingIcon sx={{color:"white"}} fontSize='large'/> </span> Pending Posts</h1>

<p className='text-white text-2xl flex gap-3 items-center'>59467 <span className='text-xs border-[1px] border-white py-1 rounded-full px-2'>High 313 <ArrowUpwardIcon sx={{color:"white",fontSize:"1rem"}}/> </span></p>


<p className='text-white text-base'>Total for this month</p>

        </section>






        <section className='p-3 bg-slate-100  max-sm:col-span-12 max-xl:col-span-6 xl:col-span-3 rounded-lg flex flex-col gap-4 text-xl shadow-xl'>
        <h1 className='text-gray-900 flex items-center gap-1'><span className='p-0.5 px-1 rounded bg-gray-300'><ShoppingBasketIcon sx={{color:"black"}} fontSize='large'/> </span> All Posts</h1>

<p className='text-gray-900 text-2xl flex gap-3 items-center'>59467 <span className='text-xs border-[1px] border-gray-900 py-1 rounded-full px-2'>High 313 <ArrowUpwardIcon sx={{color:"black",fontSize:"1rem"}}/> </span></p>


<p className='text-gray-900 text-base'>Total for this month</p>

        </section>





        <section className='p-3 bg-gray-900 max-sm:col-span-12 max-xl:col-span-6 xl:col-span-3 rounded-lg flex flex-col gap-4 text-xl shadow-xl'>
        <h1 className='text-gray-100 flex items-center gap-1'><span className='p-0.5 px-1 rounded bg-gray-500'><CloudDownloadIcon sx={{color:"white"}} fontSize='large'/> </span> Booked Inspections</h1>

<p className='text-white text-2xl flex gap-3 items-center'>59467 <span className='text-xs border-[1px] border-white py-1 rounded-full px-2'>Low 313 <ArrowDownwardIcon sx={{color:"white",fontSize:"1rem"}}/> </span></p>


<p className='text-white text-base'>Total for this month</p>

        </section>

    </div>
  )
}

export default InfoCards