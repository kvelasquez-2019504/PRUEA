import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../../services";
import toast from "react-hot-toast";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);

    const response = await loginRequest({
      email,
      password,
    });

    setIsLoading(false);

    if (response.error) {
      console.log(response.e)
      return toast.error(
        response.e?.response?.data ||
          "Error occured while loggin in. Please try again"
      );
    }

    const { userDetails } = response.data;

    localStorage.setItem("user", JSON.stringify(userDetails));

    navigate("/channels");
  };

  return {
    login,
    isLoading,
  };
};