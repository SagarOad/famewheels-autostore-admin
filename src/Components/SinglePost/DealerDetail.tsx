"use client"
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Col, Row } from "reactstrap";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const DealerDetail = ({ id }: { id: number }) => {
  const token = localStorage.getItem("authToken");
  const [imagePath,setImagePath] = useState(null)

  const getPostDetil = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/dealerdetails`, {
        params: {
          showroom_id : id,
        },
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      setImagePath(response?.data?.imagepath)
      return response?.data?.details;
    } catch (error) {
      console.log(error);
    }
  };
  const {
    data: post,
    error,
    isLoading,
  } = useQuery(
    `dealerDetails_${id}`,
    getPostDetil
    // {
    //   enabled: !!509, // Set enabled to false initially
    // }
  );

  return (
    <div>
      <h1 className="card-title">
        {post?.make} {post?.model_name} {post?.year}
      </h1>

      <h4 className="card-title my-2 txt-danger">
        RS: {post?.newcarpost_price}
      </h4>

      <Row>
        <Col lg="6">
          <img
            style={{ height: "200px" }}
            src={`${imagePath}/${post?.user_id}/${post?.showroom_logo}`}
            alt="showroom-logo"
            className="d-block w-100 img-responsive img-fluid object-fit-contain p-0"
          />
        </Col>

        <Col lg="6">
          <Row className="mt-3">
            <Col xs="3">
              <p className="card-title mb-1 txt-dark">Name :</p>
              <p className="card-title mb-1 txt-dark">Email :</p>
              <p className="card-title mb-1 txt-dark">Phone :</p>
              <p className="card-title mb-1 txt-dark">Address :</p>
              <p className="card-title mb-1 txt-dark">City :</p>
            </Col>

            <Col xs="9">
              <p className="card-title mb-1 txt-danger">
                {post?.name}
              </p>
              <p className="card-title mb-1 txt-danger">
                {post?.email}
              </p>
              <p className="card-title mb-1 txt-danger">
                {" "}
                {post?.phone}
              </p>
              <p className="card-title mb-1 txt-danger">
                {post?.showroom_address}
              </p>
              <p className="card-title mb-1 txt-danger">{post?.modelName}</p>
              <p className="card-title mb-1 txt-danger">{post?.city_name}</p>
            </Col>


            <Col xs="6">
              <p className="card-title mb-1 txt-danger">
                {post?.vehicle_colour}
              </p>
              <p className="card-title mb-1 txt-danger">
                {/* {post && JSON.parse(post?.newcarpost_enginemotor)?.displacement} */}
                
              </p>
              <p className="card-title mb-1 txt-danger">{post?.makeName}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DealerDetail;
