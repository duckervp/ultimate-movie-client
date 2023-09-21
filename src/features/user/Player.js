import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useAddUserHistoryMutation } from "./slice/historyApiSlice";
import { selectCurrentUser } from "../auth/slice/authSlice";

const Player = ({movie, currentEpisode}) => {

  const user = useSelector(selectCurrentUser);

  const [apiTimeout, setApiTimeout] = React.useState(null);

  const [addUserHistory] = useAddUserHistoryMutation();

  React.useEffect(() => {
    // Function to make the API call
    const callApi = () => {
      // Replace this with your actual API call logic
      addUserHistory({"movieId": movie?.id, "episodeId": currentEpisode?.id, "userId": user?.id || null});
    };

    // Start the timeout when the component mounts
    const timeoutId = setTimeout(callApi, 0.5 * 60 * 1000); // 0.5 minutes in milliseconds
    setApiTimeout(timeoutId);

    // Clean up the timeout if the component unmounts
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [movie, currentEpisode, user, addUserHistory]); // Empty dependency array to ensure the effect runs only once

  React.useEffect(() => {
    // Handle the beforeunload event to cancel the API call
    const handleBeforeUnload = () => {
      if (apiTimeout) {
        clearTimeout(apiTimeout);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [apiTimeout]);


  return (
    <ReactPlayer
        url={currentEpisode?.url}
        muted={true}
        controls={true}
        width={"100%"}
        height={"80vh"}
      />
  );
}

export default Player;