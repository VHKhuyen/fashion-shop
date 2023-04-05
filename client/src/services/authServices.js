import axios from "axios";
import setAuthToKen from "../utils/setAuthToken";

const LOCAL_STORAGE_TOKEN_NAME = "user";

// authenticated users
const loadUser = async () => {
  const token = localStorage[LOCAL_STORAGE_TOKEN_NAME];
  if (token) {
    setAuthToKen(token);
    try {
      const response = await axios.get("/auth");
      return response.data;
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToKen(null);
      return error.response.data;
    }
  } else {
    return { success: false };
  }
};

//register
const registerUser = async (userForm) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/register",
      userForm
    );

    if (response.data.success) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
    }
    return response.data;
  } catch (error) {
    if (error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  }
};

//  login
const loginUser = async (userForm) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/login",
      userForm
    );
    console.log(response);
    if (response.data.success) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
      return response.data;
    }
  } catch (error) {
    if (error.response.data) {
      return error.response.data;
    } else return { success: false, message: error.message };
  }
};

export { loadUser, registerUser, loginUser };
