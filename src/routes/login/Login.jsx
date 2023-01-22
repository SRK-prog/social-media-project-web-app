import { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Close } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { actionTypes } from "../../constants/constants";
import BASE_URL from "../../api/baseUrl";

const { UPDATE_USER } = actionTypes;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const onSubmit = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const { data } = await BASE_URL.post("/auth/login", {
        email: email.toLowerCase(),
        password,
      });
      dispatch({ type: UPDATE_USER, payload: data?.response });
      history.push("/");
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-16">
      <form
        className="rounded-lg mx-auto px-2.5 pt-2.5 pb-4 border border-darkGray-30 max-w-112.5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between px-2.5 my-2">
          <h2 className="text-xl text-center font-semibold">Login</h2>
          <Link to="/">
            <Close />
          </Link>
        </div>
        <div className="mt-4">
          <TextField
            type="email"
            label="Email"
            error={!!errors.email}
            helperText={errors?.email?.message}
            fullWidth
            variant="outlined"
            {...register("email", {
              required: "email is required",
              // pattern: {
              //   value:
              //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              //   message: "Please enter a valid email.",
              // },
            })}
          />
        </div>
        <div className="mt-4">
          <TextField
            type="password"
            fullWidth
            label="Password"
            error={!!errors.password}
            helperText={errors?.password?.message}
            variant="outlined"
            {...register("password", {
              // minLength: {
              //   value: 8,
              //   message: "Password must be at least 8 characters.",
              // },
              required: "Password is required.",
            })}
          />
        </div>
        <Link
          className="text-[#3a8fde] text-sm text-right block"
          to="/forgot-password"
        >
          Forgot Password?
        </Link>
        <div className="mt-5">
          <Button
            variant="contained"
            fullWidth
            className="h-10"
            style={{ color: "white", backgroundColor: "#3a8fde" }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="h-8 w-8">
                <div className="circle-loader"></div>
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </div>
        {!!error && (
          <div className="text-red-10 text-sm mb-1.5 mt-2.5 text-center">
            {error}
          </div>
        )}
        <div className="text-center text-sm mt-1">
          Don't have account
          <Link
            to="/signup"
            className="underline underline-offset-1 ml-1 text-[#4d4dab]"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
