import { AppBar, Toolbar, styled } from "@mui/material";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const Component = styled(AppBar)`
  background: #ffffff;
  color: black;
`;

const Container = styled(Toolbar)`
  justify-content: center;
  & > a {
    padding: 20px;
    color: #000;
    text-decoration: none;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const logout = async () => navigate("/login");

  return (
    <Component>
      <Container>
        <Link to="/">HOME</Link>

        <Link to="/login" onClick={logout}>
          LOGOUT
        </Link>
      </Container>
    </Component>
  );
};

export default Header;
