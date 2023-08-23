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

export const fetchRating = async (params) => {
  let url = `/activities/rating`;
  if (params) {
    const { userId, movieId } = params;
    if (userId) {
      url += `?userId=${userId}&movieId=${movieId}`;
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


export const addRating = async (payload) => {
  let url = `/activities/rating`;

  let accessToken = localStorage.getItem("accessToken");


  const { data } = await Dxios.post(url, payload, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });

  return data;
};

export const updateRating = async (ratingId, payload) => {
  let url = `/activities/rating/${ratingId}`;

  let accessToken = localStorage.getItem("accessToken");


  const { data } = await Dxios.patch(url, payload, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });

  return data;
};


