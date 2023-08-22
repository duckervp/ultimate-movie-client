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

export const addUserHistory = async (payload) => {
  let url = `/activities/history`;

  let accessToken = localStorage.getItem("accessToken");


  const { data } = await Dxios.post(url, payload, accessToken ? {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  } : {});

  return data;
};

export const addLoginActivity = async (payload) => {
  let url = `/activities/login`;

  let accessToken = localStorage.getItem("accessToken");


  const { data } = await Dxios.post(url, payload, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });

  return data;
};