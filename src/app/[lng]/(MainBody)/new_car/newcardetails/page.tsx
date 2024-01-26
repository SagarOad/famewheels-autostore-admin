"use client";

import axios from 'axios';
import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import { Col, Row } from 'reactstrap';
import WithIndicators from '@/Components/BonusUi/OwlCarousel/WithIndicators';
import { useParams } from 'next/navigation';
import { URL } from 'url';




const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;






const NewCarDetails = () => {
    const [dimensions, setDimensions] = React.useState<any>({});
    const [id, setId] = React.useState <string | null>(null);
    const [token, setToken] = React.useState <string | null>(null);
    
  const extractTokenFromUrl = (url : string, paramName : string) => {
    const urlSearchParams = new URLSearchParams(url);
    return urlSearchParams.get(paramName);
  };
  useEffect(()=>{
      const url = window.location.search;
      const ID = extractTokenFromUrl(url, "id");
      setId(ID)
    },[])


    console.log(token)

    const getPostDetil = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/newcarpostdetails`, {
            params: {
                newcarpost_id  :id

            },
          });
    
          console.log("res ==",response?.data);
          setToken(response?.data?.newcarpost_token)
          if (response?.data?.newcarpost_dimensions) {
            setDimensions(JSON.parse(response?.data?.newcarpost_dimensions));
               return response?.data;
            }else{
               return response?.data;

            }
        } catch (error) {
          console.log(error);
        }
      };
    
      const getPostImages = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/postimages`, {
        params: {
            post_id:id
          },
           
          });
    
          console.log("imgs ============== ", response?.data);
          
          return response?.data;
        } catch (error) {
          console.log(error);
        }
      };
    
      const { data:post, error, isLoading } = useQuery(
        `postDetails_${id}`,
        getPostDetil,
        // {
        //   enabled: !!509, // Set enabled to false initially
        // }
      );
    
      const {
        data: images,
        error: imgError,
        isLoading: imgLoading,
      } = useQuery(`postImgs${token}`, getPostImages);



console.log("data===>",dimensions)

  return (
    <div className='mb-3'>
      <h1 className='card-title'>{post?.make} {post?.model_name} {post?.newcarpost_variants} {post?.year}</h1>
      {/* <p className='card-title fw-600 mt-2 txt-danger d-flex gap-2 align-items-center'> 
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" className="main-grid-item-icon txt-danger" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
  <circle cx="12" cy="10" r="3" />
</svg>

</p> */}
      <h4 className='card-title my-2 txt-danger'>RS: {post?.newcarpost_price}</h4>






<Row>


<Col lg="6">
{images &&
<WithIndicators id={id} images={images}/>
}
</Col>


<Col lg="6">



      <h1 className='card-title'>More Details</h1>


<Row className='mt-3'>


<Col xs="6">

<p className='card-title mb-1 txt-dark'>Launch Date :</p>
<p className='card-title mb-1 txt-dark'>Fuel Type :</p>
<p className='card-title mb-1 txt-dark'>Transmission :</p>
<p className='card-title mb-1 txt-dark'>Model :</p>

</Col>


<Col xs="6" >

<p className='card-title mb-1 txt-danger'>{post?.newcarpost_date}</p>
<p className='card-title mb-1 txt-danger'>{post?.vehicle_fuel}</p>
<p className='card-title mb-1 txt-danger'>{post?.transmission}</p>
<p className='card-title mb-1 txt-danger'>{post?.modelName}</p>

</Col>








<Col xs="6">

<p className='card-title mb-1 txt-dark'>Color  :</p>
<p className='card-title mb-1 txt-dark'>Engine Capacity(Cc) :</p>
<p className='card-title mb-1 txt-dark'>Make  :</p>
<p className='card-title mb-1 txt-dark'>Body Type  :</p>

</Col>



<Col xs="6">

<p className='card-title mb-1 txt-danger'>{post?.newcarpost_color}</p>
<p className='card-title mb-1 txt-danger'>{post?.engine_capacity}</p>
<p className='card-title mb-1 txt-danger'>{post?.makeName}</p>
<p className='card-title mb-1 txt-danger'>{post?.bodytype_name}</p>

</Col>
</Row>

<h1 className='card-title'>Description</h1>
<p className='card-title fw-600 mt-2 txt-dark d-flex gap-2 align-items-center'> {post?.newcarpost_overview}</p>




</Col>


</Row>



<h1 className='card-title mb-3'>Features</h1>


{/* 
<Row>


<Col lg="3">

<p className='card-title mb-1 txt-dark'>Boot Space (L)</p>
<p className='card-title mb-1 txt-dark'>Ground Clearance</p>
<p className='card-title mb-1 txt-dark'>Kerb Weight</p>
<p className='card-title mb-1 txt-dark'>Overall Length</p>
<p className='card-title mb-1 txt-dark'>Overall Width</p>
<p className='card-title mb-1 txt-dark'>Seating Capacity</p>
<p className='card-title mb-1 txt-dark'>Wheel Base</p>


</Col>

<Col lg="3">

<p className='card-title mb-1 '>{dimensions.bootSpaceL}</p>
<p className='card-title mb-1 text-primary '>{dimensions.groundClearance}</p>
<p className='card-title mb-1 text-primary '>{dimensions.kerbWeight}</p>
<p className='card-title mb-1 text-primary '>{dimensions.overallLength}</p>
<p className='card-title mb-1 text-primary '>{dimensions.overallWidth}</p>
<p className='card-title mb-1 text-primary '>{dimensions.seatingCapacity}</p>
<p className='card-title mb-1 text-primary '>{dimensions.wheelBase}</p>


</Col>

</Row>
 */}









{/* <Row>
    
    
    {dimensions?.bootSpaceL === "true" &&
<Col lg="2" md="4" sm="6">
   <p className='fw-600 txt-dark d-flex gap-2 align-items-center'>
<i className="icofont icofont-check-circled txt-danger fs-5 "></i>

 Air Bags</p> 
</Col>
}


{dimensions?.alloy_rims === "true" && 
<Col lg="2" md="4" sm="6">
<p className='fw-600  txt-dark d-flex gap-2 align-items-center'>
<i className="icofont icofont-check-circled txt-danger fs-5 "></i>

 Alloy Rims</p>
</Col>}

{dimensions?.am_fm_radio === "true" &&
<Col lg="2" md="4" sm="6">
 <p className='fw-600  txt-dark d-flex gap-2 align-items-center'>
<i className="icofont icofont-check-circled txt-danger fs-5 "></i>

 FM Radio</p>
</Col>}

{dimensions?.cassette_player === "true" && 
<Col lg="2" md="4" sm="6">
<p className='fw-600  txt-dark d-flex gap-2 align-items-center'>
<i className="icofont icofont-check-circled txt-danger fs-5 "></i>


 Cassette Player</p>
</Col>}

{dimensions?.cd_player === "true" && 
<Col lg="2" md="4" sm="6">
<p className='fw-600  txt-dark d-flex gap-2 align-items-center'>
<i className="icofont icofont-check-circled txt-danger fs-5 "></i>


 CD Player</p>
</Col>}
{dimensions?.dvd_player === "true" && 
<Col lg="2" md="4" sm="6">
<p className='fw-600  txt-dark d-flex gap-2 align-items-center'>
<i className="icofont icofont-check-circled txt-danger fs-5 "></i>


 DVD Player</p>
</Col>}
{dimensions?.climate_control === "true" &&
<Col lg="2" md="4" sm="6">
 <p className='fw-600  txt-dark d-flex gap-2 align-items-center'>
<i className="icofont icofont-check-circled txt-danger fs-5 "></i>

 Climate Control</p>
</Col>}
{features?.front_camera === "true" &&
<Col lg="2" md="4" sm="6">
 <p className='fw-600  txt-dark d-flex gap-2 align-items-center'>
<i className="icofont icofont-check-circled txt-danger fs-5 "></i>

 Font Camera</p>
</Col>}
{features?.front_speakers === "true" &&
<Col lg="2" md="4" sm="6">
 <p className='fw-600  txt-dark d-flex gap-2 align-items-center'>
<i className="icofont icofont-check-circled txt-danger fs-5 "></i>
 Front Speakers</p>
</Col>}

{features?.immobilizer_key  === "true" && 
<Col lg="2" md="4" sm="6">
<p className='fw-600  txt-dark d-flex gap-2 align-items-center'><i className="icofont icofont-check-circled txt-danger fs-5 "></i>

 Immobilizer key </p>
</Col>}

{features?.heated_seats === "true" &&
<Col lg="2" md="4" sm="6">
 <p className='fw-600  txt-dark d-flex gap-2 align-items-center'>
<i className="icofont icofont-check-circled txt-danger fs-5 "></i>

 Heated Seats</p>
</Col>}

{features?.keyless_entry === "true" &&
<Col lg="2" md="4" sm="6">
 <p className='fw-600  txt-dark d-flex gap-2 align-items-center'>
<i className="icofont icofont-check-circled txt-danger fs-5 "></i>

 Keyless Entry</p>
</Col>}
{features?.navigation_system === "true" &&
<Col lg="2" md="4" sm="6">
 <p className='fw-600  txt-dark d-flex gap-2 align-items-center'>
<i className="icofont icofont-check-circled txt-danger fs-5 "></i>

 Navigation System</p>
</Col>}
{features?.rear_ac_vents === "true" &&
<Col lg="2" md="4" sm="6">
 <p className='fw-600  txt-dark d-flex gap-2 align-items-center'>
<i className="icofont icofont-check-circled txt-danger fs-5 "></i>

 Rear Ac Vents</p>
</Col>}
{features?.rear_speakers === "true" &&
<Col lg="2" md="4" sm="6">
 <p className='fw-600  txt-dark d-flex gap-2 align-items-center'>
<i className="icofont icofont-check-circled txt-danger fs-5 "></i>

 Rear Speakers</p>
</Col>}

{features?.steering_switches === "true" && 
<Col lg="2" md="4" sm="6">
<p className='fw-600  txt-dark d-flex gap-2 align-items-center'><i className="icofont icofont-check-circled txt-danger fs-5 "></i>

 Steering Switches</p>
</Col>}
{features?.power_locks === "true" && 
<Col lg="2" md="4" sm="6">
<p className='fw-600  txt-dark d-flex gap-2 align-items-center'><i className="icofont icofont-check-circled txt-danger fs-5 "></i>

 Power Locks</p>
</Col>}
{features?.power_mirrors === "true" &&
<Col lg="2" md="4" sm="6">
 <p className='fw-600 txt-dark d-flex gap-2 align-items-center'>
<i className="icofont icofont-check-circled txt-danger fs-5 "></i>

 Power Mirrors</p>
</Col>}

{features?.power_steering === "true" &&
<Col lg="2" md="4" sm="6">
 <p className='fw-600 txt-dark d-flex gap-2 align-items-center'>
<i className="icofont icofont-check-circled txt-danger fs-5 "></i>
 Power Steering</p>
</Col>}


{features?.power_windows === "true" &&
<Col lg="2" md="4" sm="6">
 <p className='fw-600 txt-dark d-flex gap-2 align-items-center'>
<i className="icofont icofont-check-circled txt-danger fs-5 "></i>

 Power Window</p>
</Col>}
{features?.rear_camera === "true" &&
<Col lg="2" md="4" sm="6">
 <p className='fw-600 txt-dark d-flex gap-2 align-items-center'>
<i className="icofont icofont-check-circled txt-danger fs-5 "></i>

 Rear Camera</p>
</Col>}
{features?.rear_seat_entertainment === "true" && 
<Col lg="2" md="4" sm="6">
<p className='fw-600 txt-dark d-flex gap-2 align-items-center'><i className="icofont icofont-check-circled txt-danger fs-5 "></i>

 Rear Seat Entertainment</p>
</Col>}
{features?.usb_and_auxillary_cable === "true" &&
<Col lg="2" md="4" sm="6">
 <p className='card-title fw-600 txt-dark d-flex gap-2 align-items-center'><i className="icofont icofont-check-circled txt-danger fs-5 "></i>
 USB And Auxillary Cable</p>
</Col>}
{features?.sun_roof === "true" &&
<Col lg="2" md="4" sm="6">
 <p className='card-title fw-600 txt-dark d-flex gap-2 align-items-center'><i className="icofont icofont-check-circled txt-danger fs-5 "></i>

 Sun Roof</p>
</Col>}

</Row> */}
    </div>
  )
}

export default NewCarDetails
