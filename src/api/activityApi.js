import Dxios from "../axios";

export const fetchUserHistory = async (params) => {
  let url = `/activities/history`;
  if (params) {
    const { userId } = params;
    if (userId) {
      url += `?userId=${userId}`;
    }
  }

  let accessToken = localStorage.getItem("accessToken");

  const { data } = await Dxios.get(url, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });
  return data;
};