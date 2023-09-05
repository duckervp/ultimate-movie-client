import { Box, Button, Container, Modal, Typography } from "@mui/material";
import LoveRating from "../../components/LoveRating";
import Loading from "../../components/Loading";
import { useState } from "react";
import { useAddMovieRatingMutation, useUpdateMovieRatingMutation } from "./slice/ratingApiSlice";
import { handleError } from "../../utils";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid gray',
  borderRadius: "10px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const RatingForm = ({ user, movie, rating, setRating, formOpen, handleCloseForm }) => {

  const [point, setPoint] = useState(rating?.point);

  const [addMovieRating] = useAddMovieRatingMutation();

  const [updateMovieRating] = useUpdateMovieRatingMutation();

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    const payload = { userId: user?.id, movieId: movie?.id, point }
    try {
      if (rating?.id) {
        const { result } = await updateMovieRating({ ratingId: rating?.id, payload }).unwrap();
        setRating(result);
      } else {
        const { result } = await addMovieRating(payload).unwrap();
        setRating(result);
      }
      handleCloseForm();
    } catch (err) {
      handleError(err);
    }
  }

  if (!point) {
    return <Loading />
  }

  return (
    <Modal
      open={formOpen}
      onClose={handleCloseForm}
      aria-labelledby="parent-modal-title-1"
      aria-describedby="parent-modal-description-1"
    >
      <Container component="main" maxWidth="sm" sx={{ ...style }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" margin="5px 0 10px">
            Rate This Movie
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleRatingSubmit}>
            <LoveRating point={point} setPoint={setPoint} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
}

export default RatingForm;