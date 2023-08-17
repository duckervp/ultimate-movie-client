import Dxios from "../axios";

export const uploadFile = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  let accessToken = localStorage.getItem("accessToken");

  const { data } = await Dxios.post("/files", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: `Bearer ${accessToken}`
    }
  });

  return data;
}