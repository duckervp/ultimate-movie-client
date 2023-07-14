import Dxios from "../axios";

export const fetchAllMovies = async (params) => {
  const {pageNo, pageSize, name, genre} = params;
  let url = `/movies?pageNo=${pageNo}&pageSize=${pageSize}`;
  
  if (name) {
    url += `&name=${name}`;
  }

  if (genre) {
    url += `&genre=${genre}`;
  }

  const { data } = await Dxios.get(url);
  return data;
};

export const fetchMovieById = async (id) => {
  const url = `/movies/${id}`;
  const { data } = await Dxios.get(url);
  return data;
};

export const fetchMovieBySlug = async (slug) => {
  const url = `/movies/s/${slug}`;
  const { data } = await Dxios.get(url);
  return data;
};

export const createMovie = async (body) => {
  const url = `/movies`;

  let accessToken = localStorage.getItem("accessToken");

  const { data } = await Dxios.post(url, body, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });

  return data;
}

export const editMovie = async (id, body) => {
  const url = `/movies/${id}`;

  let accessToken = localStorage.getItem("accessToken");

  const { data } = await Dxios.patch(url, body, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });

  return data;
}

export const deleteMovies = async (ids) => {
  let movieIds = ids.reduce((a, b) => "".concat(a).concat(",").concat(b), "").slice(1);
  const url = `/movies?movieIds=${movieIds}`;

  let accessToken = localStorage.getItem("accessToken");

  const { data } = await Dxios.delete(url, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });

  return data;
}

export const deleteMovieGenres = async (movieId, ids) => {
  let genreIds = ids.reduce((a, b) => "".concat(a).concat(",").concat(b), "").slice(1);
  const url = `/movies/g?movieId=${movieId}&genreIds=${genreIds}`;

  let accessToken = localStorage.getItem("accessToken");

  const { data } = await Dxios.delete(url, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });
  
  return data;
}

export const deleteMovieCharacters = async (movieId, ids) => {
  let characterIds = ids.reduce((a, b) => "".concat(a).concat(",").concat(b), "").slice(1);
  const url = `/movies/c?movieId=${movieId}&characterIds=${characterIds}`;

  let accessToken = localStorage.getItem("accessToken");

  const { data } = await Dxios.delete(url, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });
  
  return data;
}