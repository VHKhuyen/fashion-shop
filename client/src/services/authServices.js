import axios from "axios";

// authenticated users
const loadUser = async () => {
  try {
    const response = await axios.get("/auth");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

//register
const registerUser = async (userForm) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/auth/register",
      userForm
    );
    return response.data;
  } catch (error) {
    if (error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  }
};

export { loadUser, registerUser };
