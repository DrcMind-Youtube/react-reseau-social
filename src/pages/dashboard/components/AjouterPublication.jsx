import { Button, Stack, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function AjouterPublication() {
  const user = JSON.parse(localStorage.getItem("utilisateur"));
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const useQuery = useQueryClient();

  const mutation = useMutation({
    mutationFn: (pub) => {
      return axios.post("http://localhost:3000/publications", pub);
    },
    onError: (error) => {
      toast.error("Une erreur est survenue0");
    },
    onSuccess: () => {
      reset();
      useQuery.invalidateQueries("publications");
      toast.success("Publication ajoutée avec succès");
    },
  });
  const onSubmit = (data) => {
    const publication = {
      ...data,
      idUtilisateur: user.id,
      datePublication: new Date(),
      likePublication: 0,
      auteur: user.nomUtilisateur,
    };
    mutation.mutate(publication);
  };
  return (
    <Stack width={"60%"} margin={"auto"}>
      <h1>Ajouter une publication</h1>
      <form
        style={{
          marginTop: 4,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack gap={2}>
          <TextField
            id="filled-basic"
            label="Parlez-nous de votre journée"
            variant="outlined"
            fullWidth
            size="small"
            type="text"
            multiline
            rows={4}
            {...register("textePublication", {
              required: "Veuillez saisir un texte",
              minLength: {
                value: 10,
                message: "Veuillez saisir un texte de plus de 5 caractères",
              },
            })}
          />
          <TextField
            id="filled-basic"
            label="Saisir l'url de votre image"
            variant="outlined"
            fullWidth
            size="small"
            type="text"
            {...register("imagePublication", {
              required: "Veuillez saisir une url",
            })}
          />
          <Button variant="contained" type="submit">
            Publier
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
