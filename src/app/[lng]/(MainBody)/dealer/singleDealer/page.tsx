"use client"
import React, { useCallback, useEffect, useState } from "react";
import { Container } from "reactstrap";
import UserProfile from "./UserProfile/UserProfile";
import SocialAppTabContent from "./UserContext";
import axios from "axios";
import { useQuery } from "react-query";
const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const SocialAppContainer = () => {
  const token = localStorage.getItem("authToken");
  const [imagePath,setImagePath] = useState<any>(null)
  const [id,setId] = useState(null)
  const extractTokenFromUrl = (url: string, paramName: string) => {
    const urlSearchParams = new URLSearchParams(url);
    return urlSearchParams.get(paramName);
  };


  useEffect(() => {
    const url = window.location.search;
    const ID: any = extractTokenFromUrl(url, "id");
    setId(ID);
  }, []);

  const [activeTab, setActiveTab] = useState(1);
    const callback = useCallback((tab: number) => {
      setActiveTab(tab);
    }, []);
    

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
      data: dealer,
      error,
      isLoading,
    } = useQuery(
      `singleDealerDetails_${id}`,
      getPostDetil
      // {
      //   enabled: !!509, // Set enabled to false initially
      // }
    );



  return (
      <Container fluid>
        <div className="user-profile social-app-profile">
          <UserProfile callback={callback} dealerData={dealer} imagepath={imagePath} />
          <SocialAppTabContent activeTab={activeTab} dealer={dealer}/>
        </div>
      </Container>
  );
};

export default SocialAppContainer;
