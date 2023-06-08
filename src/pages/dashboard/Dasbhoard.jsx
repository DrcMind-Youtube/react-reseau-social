import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import AjouterPublication from "./components/AjouterPublication";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import CartePub from "./components/CartePub";

export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("utilisateur")) {
      navigate("/connexion");
    }
  });

  const {
    data: publications,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["publications"],
    queryFn: () =>
      axios.get("http://localhost:3000/publications").then((res) => res.data),
    onerror: (error) => console.log(error),
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  let pubTrier = publications.sort((a, b) => {
    return new Date(b.datePublication) - new Date(a.datePublication);
  });

  return (
    <Box bgcolor={"#eef4ff"}>
      <Navbar />
      <AjouterPublication />
      <Box width={"60%"} margin={"auto"} marginTop={4}>
        {publications &&
          pubTrier.map((publication) => <CartePub publication={publication} />)}
      </Box>
    </Box>
  );
}
