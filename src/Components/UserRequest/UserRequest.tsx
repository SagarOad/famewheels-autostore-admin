import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Col, Row } from "reactstrap";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const UserRequest = ({ id }: { id: number }) => {
  const [path, setPath] = React.useState("");

  const getUserDetil = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get(`${BASE_URL}/userdetailsingle`, {
        params: {
          user_id: id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPath(response?.data?.imagepath);
      return response?.data?.userdetail;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: user,
    error,
    isLoading,
  } = useQuery(`userRequest_${id}`, getUserDetil, {
    enabled: !!id, // Set enabled to false initially
  });

  return (
    <div>
      <Row className="mt-3">
        <Col lg="6">
          <img
            style={{ height: "200px" }}
            src={`https://static.vecteezy.com/system/resources/thumbnails/020/717/950/small/human-bust-silhouette-avatar-bust-shape-parallel-lines-human-chakra-aura-radiation-of-energy-vector.jpg`}
            alt="front-cnic"
            className="d-block w-100 img-responsive img-fluid object-fit-contain p-0"
          />
        </Col>

        <Col lg="6">
          <h1 className="card-title">
            {user?.name} {user?.user_lastname}
          </h1>
          <Row className="mt-3">
            <Col xs="3">
              <p className="card-title mb-1 txt-dark">CNIC :</p>
              <p className="card-title mb-1 txt-dark">Email :</p>
              <p className="card-title mb-1 txt-dark">Phone :</p>
              <p className="card-title mb-1 txt-dark">DOB :</p>
              <p className="card-title mb-1 txt-dark">Address :</p>
            </Col>

            <Col xs="6">
              <p className="card-title mb-1 txt-danger">{user?.cnic}</p>
              <p className="card-title mb-1 txt-danger">{user?.email}</p>
              <p className="card-title mb-1 txt-danger">{user?.phone}</p>
              <p className="card-title mb-1 txt-danger">{user?.user_dob}</p>
              <p className="card-title mb-1 txt-danger">{user?.address}</p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col lg="6" className="text-center">
          <img
            style={{ height: "350px" }}
            src={
              user?.CNICFront
                ? `${path}${user?.id}/${user?.CNICFront}`
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
            }
            alt="front-cnic"
            className="d-block w-100 img-responsive img-fluid object-fit-contain p-0"
          />
          <h4 className="card-title">CNIC Front</h4>
        </Col>
        <Col lg="6" className="text-center">
          <img
            style={{ height: "350px" }}
            src={
              user?.CNICBack
                ? `${path}${user?.id}/${user?.CNICBack}`
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
            }
            alt="back-cnic"
            className="d-block w-100 img-responsive img-fluid object-fit-contain p-0"
          />
          <h4 className="card-title">CNIC Back</h4>
        </Col>
      </Row>
    </div>
  );
};

export default UserRequest;
