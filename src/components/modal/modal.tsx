import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PostDetail from "../postDetail/PostDetail";
import axios from "axios";
import { useQuery } from "react-query";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "60%",
  maxWidth: "70%",
  bgcolor: "background.paper",
  maxHeight: "80vh", // Set a maximum height
  overflowY: "auto", // Enable vertical scrolling
  boxShadow: 24,
  p: 4,
};

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export default function PostModal({
  open,
  setOpen,
  postId,
}: {
  open: any;
  setOpen: any;
  postId: any;
}) {
  const token = localStorage.getItem("authToken");

  const [features, setFeatures] = React.useState({});

  const getPostDetil = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/${postId}`, {
        params: {
          userId: 0,
        },
      });

      console.log(response?.data);
      setFeatures(JSON.parse(response?.data?.carFeatures));
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getPostImages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/images/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("imgs ============== ", response?.data);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error, isLoading } = useQuery(
    `postDetails_${postId}`,
    getPostDetil,
    {
      enabled: !!postId, // Set enabled to false initially
    }
  );

  const {
    data: images,
    error: imgError,
    isLoading: imgLoading,
  } = useQuery(`postImgs_${postId}`, getPostImages, {
    enabled: !!postId, // Set enabled to false initially
  });

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <PostDetail carDetail={data} images={images} features={features} />

          <div className="flex justify-end items-center">
            <button
              className="p-2 text-xl border-[1px] rounded"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
