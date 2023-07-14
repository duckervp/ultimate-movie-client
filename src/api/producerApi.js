import Dxios from "../axios";

export const fetchAllProducers = async () => {
  const url = `/producers`;

  let accessToken = localStorage.getItem("accessToken");

  const { data } = await Dxios.get(url, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });
  return data;
};

export const createProducer = async (body) => {
  const url = `/producers`;

  let accessToken = localStorage.getItem("accessToken");

  const { data } = await Dxios.post(url, body, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });

  return data;
}

export const updateProducer = async (id, body) => {
  const url = `/producers/${id}`;

  let accessToken = localStorage.getItem("accessToken");

  const { data } = await Dxios.patch(url, body, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });

  return data;
}

export const deleteProducers = async (ids) => {
  let producerIds = ids.reduce((a, b) => "".concat(a).concat(",").concat(b), "").slice(1);
  const url = `/producers?producerIds=${producerIds}`;

  let accessToken = localStorage.getItem("accessToken");

  const { data } = await Dxios.delete(url, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });
  
  return data;
}