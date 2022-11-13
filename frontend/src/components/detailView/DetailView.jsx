import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../services/api";
import { userContext } from "../../context/UserContextProvider";
import Comments from "../comments/Comments";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const EditIcon = styled(Edit)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0;
`;

const Author = styled(Box)(({ theme }) => ({
  color: "#878787",
  display: "flex",
  margin: "20px 0",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

function DetailView() {
  const url =
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
  const { id } = useParams();
  console.log("id is==>", id);
  const [post, setPost] = useState({});

  const { username } = useContext(userContext);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await API.getDetailPost(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };

    fetchData();
  }, []);

  const deleteCurrentPost = async () => {
    console.log("click");           
    const response = await API.delMePost(post);
    console.log(response);
    if (response.isSuccess) {
      navigate("/");
    }
  };
  return (
    <Container>
      <Image src={post.picture || url} alt="post" />
      <Box style={{ float: "right" }}>
        {username === post.username && (
          <>
            <Link to={`/update/${post._id}`}>
              <EditIcon color="primary" />
            </Link>
            <DeleteIcon color="error" onClick={deleteCurrentPost} />
          </>
        )}
      </Box>
      <Heading>{post.title}</Heading>

      <Author>
        <Link
          to={`/?username=${post.username}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography>
            Author: <span style={{ fontWeight: 600 }}>{post.username}</span>
          </Typography>
        </Link>
        <Typography style={{ marginLeft: "auto" }}>
          {new Date(post.createdDate).toDateString()}
        </Typography>
      </Author>
      <Typography>{post.description}</Typography>
      <Comments post ={post}/>
    </Container>
  );
}

export default DetailView;
