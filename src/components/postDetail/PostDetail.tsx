import React, { useEffect, useState } from 'react'
import PostModal from '../modal/modal'
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import Carousel from "../imageCarousel/Carousel"
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

const PostDetail = ({carDetail,images,features}:{carDetail:any,images:any,features:any}) => {

console.log("features ======== ",features)




  return (
    <div className='flex flex-col gap-3'>
<h1 className='text-2xl font-semibold text-gray-900'>{carDetail?.makeName} {carDetail?.modelName} {carDetail?.yearName}</h1>
<p className='text-xl'><FmdGoodIcon sx={{fontSize:"1.5rem"}} color='error'/> {carDetail?.cityName}</p>
<p className='text-2xl text-red-700 mt-4 font-bold'>RS : {carDetail?.price}</p>

<Carousel images={images}/>


<h1 className='text-2xl text-gray-900 font-semibold'>More Details</h1>

<section className='flex gap-8'>


<div className='w-1/2'>

<div className='flex justify-between items-center w-full text-left my-2'><p className='font-semibold'>RegisteredIn : </p> <p className='text-red-700 font-semibold'>{carDetail?.registeredIn}</p> </div>
<div className='flex justify-between items-center w-full text-left my-2'><p className='font-semibold'>Assembly : </p> <p className='text-red-700 font-semibold'>Local</p> </div>
<div className='flex justify-between items-center w-full text-left my-2'><p className='font-semibold'>Body Type : </p> <p className='text-red-700 font-semibold'>Pick Up</p> </div>
<div className='flex justify-between items-center w-full text-left my-2'><p className='font-semibold'>Model : </p> <p className='text-red-700 font-semibold'>{carDetail?.modelName}</p> </div>

</div>




<div className='w-1/2'>


<div className='flex justify-between items-center w-full text-left my-2'><p className='font-semibold'>Color : </p> <p className='text-red-700 font-semibold'>{carDetail?.vehicleColour}</p> </div>
<div className='flex justify-between items-center w-full text-left my-2'><p className='font-semibold'>Engine Capacity(Cc) : </p> <p className='text-red-700 font-semibold'>{carDetail?.categoryName}</p> </div>
<div className='flex justify-between items-center w-full text-left my-2'><p className='font-semibold'>Make : </p> <p className='text-red-700 font-semibold'>{carDetail?.makeName}</p> </div>
<div className='flex justify-between items-center w-full text-left my-2'><p className='font-semibold'>Condition : </p> <p className='text-red-700 font-semibold'>{carDetail?.vehicleCondition}</p> </div>

</div>



</section>


<div>

<h1 className='text-2xl font-bold'>Description</h1>
<p className='text-gray-500'>{carDetail?.description}</p>
</div>


<section className='mt-4'>
<h1 className='text-2xl font-bold'>Features</h1>


<div className='mt-3 grid grid-cols-12 gap-4'>


{features?.air_conditioning === "true"  && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> AC</span> }


{features?.air_bags === "true"  && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> Air Bags</span> }

{features?.alloy_rims === "true" && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> Alloy Rims</span>}

{features?.am_fm_radio === "true" && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> FM Radio</span>}

{features?.cassette_player === "true" && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> Cassette Player</span>}

{features?.cd_player === "true" && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> CD Player</span>}

{features?.dvd_player === "true" && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> DVD Player</span>}

{features?.climate_control === "true" && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> Climate Control</span>}

{features?.front_camera === "true" && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> Font Camera</span>}

{features?.front_speakers === "true" && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> Front Speakers</span>}

{features?.immobilizer_key  === "true" && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> Immobilizer key </span>}

{features?.heated_seats === "true" && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> Heated Seats</span>}

{features?.keyless_entry === "true" && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> Keyless Entry</span>}

{features?.navigation_system === "true" && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> Navigation System</span>}

{features?.rear_ac_vents === "true" && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> Rear Ac Vents</span>}

{features?.rear_speakers === "true" && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> Rear Speakers</span>}

{features?.steering_switches === "true" && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> Steering Switches</span>}

{features?.power_locks === "true" && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> Power Locks</span>}

{features?.power_mirrors === "true" && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> Power Mirrors</span>}

{features?.power_steering === "true" && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> Power Steering</span>}

{features?.power_windows === "true" && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> Power Window</span>}

{features?.rear_camera === "true" && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> Rear Camera</span>}

{features?.rear_seat_entertainment === "true" && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> Rear Seat Entertainment</span>}

{features?.usb_and_auxillary_cable === "true" && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> USB And Auxillary Cable</span>}

{features?.sun_roof === "true" && <span className='xl:col-span-3 max-xl:col-span-4 max-lg:col-span-6'><LibraryAddCheckIcon color='error' sx={{fontSize:"1.5rem"}}/> Sun Roof</span>}

</div>


</section>


<div>

</div>
    </div>
  )
}

export default PostDetail