import { useNavigate, useSearchParams } from "react-router-dom";
import * as React from "react";
import Home from "./Home";
import { CircularProgress } from "@mui/material";

const Doormat = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  
  React.useEffect(() => {
    if (!searchParams.get("page")) {
      searchParams.set("page", 1);
      navigate(`/?${searchParams.toString()}`, {replace: true})
    } 
  }, [searchParams, navigate]);
  
  if (!searchParams.get("page")) {
    return <CircularProgress color="secondary" />
  }

  return <Home />
}

export default Doormat;