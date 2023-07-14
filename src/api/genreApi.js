import Dxios from "../axios";

export const fetchAllGenres = async () => {
  const url = `/genres`;

  const { data } = await Dxios.get(url);
  return data;
};

export const createGenre = async (body) => {
  const url = `/genres`;

  let accessToken = localStorage.getItem("accessToken");

  const { data } = await Dxios.post(url, body, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });

  return data;
}

export const updateGenre = async (id, body) => {
  const url = `/genres/${id}`;

  let accessToken = localStorage.getItem("accessToken");

  const { data } = await Dxios.patch(url, body, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });

  return data;
}

export const deleteGenres = async (ids) => {
  let genreIds = ids.reduce((a, b) => "".concat(a).concat(",").concat(b), "").slice(1);
  const url = `/genres?genreIds=${genreIds}`;

  let accessToken = localStorage.getItem("accessToken");

  const { data } = await Dxios.delete(url, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });
  
  return data;
}