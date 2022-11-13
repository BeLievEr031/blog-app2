import React, { useState, useContext } from "react";
import { userContext } from "../../context/UserContextProvider";
import { Box, Button, TextField, styled, Typography } from "@mui/material";
import { API } from "../../services/api";
import { useNavigate } from "react-router-dom";
const BoxComponent = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  border-radius: 4px;
  padding: 25px 5px;
`;

const ImgComponent = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
});

const WrapperBox = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
    text-transform: none;
    width: 80%;
  }
`;

const TextFieldComp = styled(TextField)`
  margin-top: 25px;
  width: 80%;
`;

const imageURL =
  "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

function Login({isUserAuthenticated}) {
  const { setName, setUsername,} = useContext(userContext);
  const [authType, setAuthType] = useState("login");
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState("");
  const [userLoginInfo, setUserLoginInfo] = useState({});
  const navigate = useNavigate();
  const handleRedirectLogin = () => {
    setAuthType("login");
  };
  const handleRedirectSignUp = () => {
    setAuthType("signup");
  };

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleUserSignUp = async () => {

    console.log(userInfo);
    const response = await API.userSignup(userInfo);

    if (response.isSuccess === true) {
      setAuthType("login");
      setError("");
    } else {
      console.log("eror;;");
      setError("Something went wrong. Please try again later!!");
      setTimeout(() => {
        setError("");
      }, 2500);
    }
  };

  const handleLoginInfoChange = (e) => {
    setUserLoginInfo({ ...userLoginInfo, [e.target.name]: e.target.value });
  };

  const handleUserLogin = async () => {
    console.log(userLoginInfo);
    const response = await API.userLogin(userLoginInfo);
    if (response.isSuccess === true) {
      setError("");

      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );

      isUserAuthenticated(true);
      setName(response.data.user.name);
      setUsername(response.data.user.username);
      navigate('/');
    } else {
      setError("Something Went wrong...");
      setTimeout(() => {
        setError("");
      }, 2500);
    }
  };
  return (
    <>
      <BoxComponent>
        <Box>
          <ImgComponent src={imageURL} alt="blog-logo" />
        </Box>

        {authType === "login" ? (
          <WrapperBox>
            <TextFieldComp
              value={userLoginInfo.username}
              name={"username"}
              onChange={(e) => handleLoginInfoChange(e)}
              variant="standard"
              label="Enter Username"
            />
            <TextFieldComp
              type={"password"}
              value={userLoginInfo.password}
              name={"password"}
              onChange={(e) => handleLoginInfoChange(e)}
              variant="standard"
              label="Enter Password"
            />
            {error && <Typography style={{ color: "red" }}>{error}</Typography>}

            <Button
              style={{ backgroundColor: "#e36405", width: "80%" }}
              variant="contained"
              onClick={handleUserLogin}
            >
              Login
            </Button>
            <Typography style={{ textAlign: "center", color: "#878787" }}>
              OR
            </Typography>
            <Button
              onClick={handleRedirectSignUp}
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            >
              Create An Account
            </Button>
          </WrapperBox>
        ) : (
          <WrapperBox>
            <TextFieldComp
              name={"name"}
              onChange={(e) => handleInputChange(e)}
              variant="standard"
              label="Enter Name"
            />
            <TextFieldComp
              name={"username"}
              onChange={(e) => handleInputChange(e)}
              variant="standard"
              label="Enter Username"
            />
            <TextFieldComp
              name={"password"}
              onChange={(e) => handleInputChange(e)}
              variant="standard"
              label="Enter Password"
            />
            <Button
              style={{ backgroundColor: "#e36405", width: "80%" }}
              variant="contained"
              onClick={handleUserSignUp}
            >
              SignUp
            </Button>
            <Typography style={{ textAlign: "center", color: "#878787" }}>
              OR
            </Typography>
            {error && (
              <Typography
                style={{ fontSize: "15px", marginBottom: "5px", color: "red" }}
              >
                {error}
              </Typography>
            )}
            <Button
              to="/login"
              onClick={handleRedirectLogin}
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            >
              Already Have An Account
            </Button>
          </WrapperBox>
        )}
      </BoxComponent>
    </>
  );
}

export default Login;
