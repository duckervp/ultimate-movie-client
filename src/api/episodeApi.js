import Dxios from "../axios";

export const deleteEpisodes = async (ids) => {
  let episodeIds = ids.reduce((a, b) => "".concat(a).concat(",").concat(b), "").slice(1);
  const url = `/episodes?episodeIds=${episodeIds}`;

  let accessToken = localStorage.getItem("accessToken");

  const { data } = await Dxios.delete(url, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });

  return data;
}