import { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Close } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { baseUrl } from "../../api/baseUrls";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Forgot Password";
  }, []);

  const onSubmit = async ({ email }) => {
    setIsLoading(true);
    setError("");
    try {
      const { data } = await baseUrl.post("/reset", {
        email: email.toLowerCase(),
      });
      if (data?.message)
        toast.success(data.message, {
          position: "top-right",
        });
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Something went wrong, Please try again"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-16 mx-3">
      <form
        className="rounded-lg mx-auto px-3 pt-2.5 pb-4 border border-darkGray-30 max-w-112.5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between my-2">
          <h2 className="text-xl text-center font-semibold">Forgot Password</h2>
          <Link to="/">
            <Close />
          </Link>
        </div>
        <div className="mt-4 text-gray-80 text-sm">
          Enter your email address in the form below and we will send your the
          recovery link to reset your password
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
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email.",
              },
            })}
          />
        </div>

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
              "Send Email"
            )}
          </Button>
        </div>
        {!!error && (
          <div className="text-red-10 text-sm mb-1.5 mt-2.5 text-center">
            {error}
          </div>
        )}
        <div className="text-center text-sm mt-2">
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
