import React, { useState, useEffect, useContext } from "react";
import {
  styled,
  Box,
  TextareaAutosize,
  Button,
  InputBase,
  FormControl,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { userContext } from "../../context/UserContextProvider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API } from "../../services/api";
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

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  margin-top: 50px;
  font-size: 18px;
  &:focus-visible {
    outline: none;
  }
`;

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  category: "",
  createdDate: new Date(),
};

const Update = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const { username } = useContext(userContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.getDetailPost(id);

      if (response.isSuccess) {
        setPost(response.data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        const response = await API.fileUpload(data);
        post.picture = response.data.imageUrl;
        setPost({ ...post }, ([post.picture] = response.data.imageUrl));
      }
    };
    getImage();
    post.category = location.search?.split("=")[1] || "All";
    post.username = username;
  }, [file]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const updatePost = async () => {
    console.log(post);
    const response = await API.updatePost(post);
    if (response.isSuccess === true) {
    }
    navigate(`/detail/${id}`);
  };

  return (
    <Container>
      <Image src={url} alt="post" />

      <StyledFormControl>
        <label htmlFor="fileInput">
          <Add fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <InputTextField
          onChange={(e) => handleChange(e)}
          name="title"
          placeholder="Title"
          value={post.title}
        />
        <Button variant="contained" color="primary" onClick={updatePost}>
          Update
        </Button>
      </StyledFormControl>

      <Textarea
        rowsMin={5}
        placeholder="Tell your story..."
        name="description"
        onChange={(e) => handleChange(e)}
        value={post.description}
      />
    </Container>
  );
};

export default Update;
