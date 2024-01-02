import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import './carousel.css'



const IMG_URL = `${process.env.IMG_URL}`;



const Carousel = ({images}:{images:any}) => {
  return (
    <div>
        
        <>
      <Swiper
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >{
        images?.map((img:any,ind:number)=>{          
         return (

        <SwiperSlide key={ind}>
            <div className='absolute top-0 left-0 h-full w-full bg-black opacity-20 -z-10'></div>
            <img src={`${IMG_URL}/images/posts/${img[2]}/${img[1]}`} alt="slide" className='z-50'  style={{objectFit:"contain"}}/>     
        </SwiperSlide>
        
              )}
              
              )
        }
     
      </Swiper>
    </>

    </div>
  )
}

export default Carousel