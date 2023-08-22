import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Dxios from "../../axios";
import { addLoginActivity } from "../../api/activityApi";


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
  const url = "users/";

  let accessToken = localStorage.getItem("accessToken");

  const { data } = await Dxios.get(url, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });
  return data;
});

export const updateUser = createAsyncThunk("user/modify", async (body) => {
  const url = `users/${body.id}`;

  let accessToken = localStorage.getItem("accessToken");

  await Dxios.patch(url, body, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });
  return body;
});

export const sendResetPasswordRequest = createAsyncThunk("user/resetPasswordRequest", async (body) => {
  const url = `users/reset-password-request?email=${body.email}`;

  const { data } = await Dxios.get(url);

  console.log(data);

  return data;
});

export const resetPassword = createAsyncThunk("user/resetPassword", async ({ token, body }) => {
  const url = `users/reset-password?token=${token}`;

  const { data } = await Dxios.patch(url, body);

  return data;
});

export const changePassword = createAsyncThunk("user/changePassword", async (body) => {
  const url = `users/change-password`;

  try {
    let accessToken = localStorage.getItem("accessToken");

    console.log(body);
    const { data } = await Dxios.patch(url, body, {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    });
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }

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
      localStorage.setItem("accessToken", payload.access_token);
    }).addCase(register.rejected, (error) => {
      console.log(error);
      toast.error("Register failed!", {
        position: toast.POSITION.TOP_RIGHT
      })
    }).addCase(fetchUser.fulfilled, (state, { payload }) => {
      const user = payload?.result;
      Object.keys(user).forEach(key => state[key] = user[key]);
      addLoginActivity({"userId": user?.id});
    }).addCase(fetchUser.rejected, (state) => {
      state = initialState;
      toast.error("Fetch user failed!", {
        position: toast.POSITION.TOP_RIGHT
      });
    }).addCase(updateUser.fulfilled, (state, { payload }) => {
      const user = payload;
      Object.keys(user).forEach(key => state[key] = user[key]);
      toast.success("Updated user successfully!", {
        position: toast.POSITION.TOP_RIGHT
      })
    }).addCase(updateUser.rejected, () => {
      toast.error("Update user failed!", {
        position: toast.POSITION.TOP_RIGHT
      })
    }).addCase(sendResetPasswordRequest.fulfilled, () => {
      toast.success("Please visit your email to get the reset password link!", {
        position: toast.POSITION.TOP_RIGHT
      })
    }).addCase(sendResetPasswordRequest.rejected, () => {
      toast.error("Reset password request failed!", {
        position: toast.POSITION.TOP_RIGHT
      })
    }).addCase(resetPassword.fulfilled, () => {
      toast.success("Reset password successfully!", {
        position: toast.POSITION.TOP_RIGHT
      })
    }).addCase(resetPassword.rejected, () => {
      toast.error("Reset password failed!", {
        position: toast.POSITION.TOP_RIGHT
      })
    }).addCase(changePassword.fulfilled, () => {
      toast.success("Change password successfully!", {
        position: toast.POSITION.TOP_RIGHT
      })
    }).addCase(changePassword.rejected, () => {
      toast.error("Change password failed!", {
        position: toast.POSITION.TOP_RIGHT
      })
    });
  }
});

export const { logout, oauth2Login } = userSlice.actions;

export default userSlice.reducer;