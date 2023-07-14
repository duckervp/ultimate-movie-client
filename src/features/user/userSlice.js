import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Dxios from "../../axios";


export const login = createAsyncThunk("user/login", async ({ username, password }) => {
  const url = "oauth2/token";
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials")
  params.append("client_id", username)
  params.append("client_secret", password)
  const { data } = await Dxios.post(url, params);
  return data;
});

export const register = createAsyncThunk("user/register", async (body) => {
  const url = "users/register";
  const { data } = await Dxios.post(url, body);
  return data;
})

export const fetchUser = createAsyncThunk("user/fetch", async () => {
  const url = "users";

  let accessToken = localStorage.getItem("accessToken");

  const { data } = await Dxios.get(url, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });
  return data;
});

export const saveUser = createAsyncThunk("user/modify", async (body) => {
  const url = `users/${body.id}`;

  let accessToken = localStorage.getItem("accessToken");

  await Dxios.patch(url, body, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });
  return body;
});

const initialState = {
  id: "",
  address: "",
  dob: "",
  email: "",
  gender: "",
  name: "",
  phoneNumber: "",
  accessToken: "",
  imageUrl: ""
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: state => {
      Object.keys(state).forEach(key => state[key] = "");
      localStorage.removeItem("accessToken");
    },
    oauth2Login: (state, { payload }) => {
      state.accessToken = payload;
      localStorage.setItem("accessToken", payload);
    }
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.accessToken = payload.access_token;
      localStorage.setItem("accessToken", payload.access_token);
    }).addCase(login.rejected, (error) => {
      console.log(error);
      toast.error("Login failed!", {
        position: toast.POSITION.TOP_RIGHT
      })
    }).addCase(register.fulfilled, (state, { payload }) => {
      state.accessToken = payload.access_token;
    }).addCase(register.rejected, (error) => {
      console.log(error);
      toast.error("Register failed!", {
        position: toast.POSITION.TOP_RIGHT
      })
    }).addCase(fetchUser.fulfilled, (state, { payload }) => {
      const user = payload?.result;
      Object.keys(user).forEach(key => state[key] = user[key]);
    }).addCase(fetchUser.rejected, (state, error) => {
      state = initialState;
      toast.error("Fetch user failed!", {
        position: toast.POSITION.TOP_RIGHT
      });
    }).addCase(saveUser.fulfilled, (state, {payload}) => {
      const user = payload;
      Object.keys(user).forEach(key => state[key] = user[key]);
      toast.success("Updated user successfully!", {
        position: toast.POSITION.TOP_RIGHT
      })
    }).addCase(saveUser.rejected, (state, error) => {
      toast.error("Update user failed!", {
        position: toast.POSITION.TOP_RIGHT
      })
    });
  }
});

export const { logout, oauth2Login } = userSlice.actions;

export default userSlice.reducer;