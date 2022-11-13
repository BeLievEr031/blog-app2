import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { category } from "../../constant/data";
const StyledTable = styled(Table)`
  border: 1px solid rgba(224, 224, 224, 1);
`;

const StyledButton = styled(Button)`
  margin: 20px;
  width: 85%;
  background: #6495ed;
  color: #fff;
  text-decoration: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

function Category() {
  const [searchParams] = useSearchParams();
  const prmCategory = searchParams.get("category");
  return (
    <>
      <StyledLink to={`/create?category=${prmCategory || ""}`}>
        <StyledButton variant="contained">Create a Blog..</StyledButton>
      </StyledLink>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <StyledLink to={`/?category=`}>All Categories</StyledLink>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {category.map((elem, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <StyledLink to={`/?category=${elem.type}`}>
                    {elem.type}
                  </StyledLink>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </StyledTable>
    </>
  );
}

export default Category;
