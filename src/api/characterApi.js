import Dxios from "../axios";

export const fetchAllCharacters = async (params) => {
  let url = `/characters`;
  if (params) {
    const { name } = params;
    if (name) {
      url += `?name=${name}`;
    }
  }
  
  const { data } = await Dxios.get(url);
  return data;
};

export const createCharacter = async (body) => {
  const url = `/characters`;

  let accessToken = localStorage.getItem("accessToken");

  const { data } = await Dxios.post(url, body, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });

  return data;
}

export const updateCharacter = async (id, body) => {
  const url = `/characters/${id}`;

  let accessToken = localStorage.getItem("accessToken");

  const { data } = await Dxios.patch(url, body, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });

  return data;
}

export const deleteCharacters = async (ids) => {
  let characterIds = ids.reduce((a, b) => "".concat(a).concat(",").concat(b), "").slice(1);
  const url = `/characters?characterIds=${characterIds}`;

  let accessToken = localStorage.getItem("accessToken");

  const { data } = await Dxios.delete(url, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });

  return data;
}