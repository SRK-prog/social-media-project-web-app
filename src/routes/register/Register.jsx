import { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Close, Visibility, VisibilityOff } from "@material-ui/icons";
import { baseUrl } from "../../api/baseUrls";

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordsMask, setPasswordsMask] = useState({
    pwd: true,
    confirmPwd: true,
  });

  const history = useHistory();

  useEffect(() => {
    document.title = "Sign up";
  }, []);

  const onSubmit = async (data) => {
    setError(false);
    setIsLoading(true);
    try {
      await baseUrl.post("/auth/signup", {
        ...data,
        email: data.email.toLowerCase(),
      });
      history.push("/login");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Something went wrong, Please try again"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-16 mx-3">
      <form
        className="rounded-lg mx-auto px-2.5 pt-2.5 pb-4 border border-darkGray-30 max-w-112.5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between px-2.5 my-2">
          <span className="text-xl text-center font-semibold">Register</span>
          <Link to="/">
            <Close />
          </Link>
        </div>
        <div className="mt-4">
          <TextField
            type="name"
            label="Name"
            fullWidth
            variant="outlined"
            error={!!errors.username}
            helperText={errors?.username?.message}
            {...register("username", { required: "name is required!" })}
          />
        </div>
        <div className="mt-4">
          <TextField
            type="email"
            fullWidth
            label="Email"
            variant="outlined"
            error={!!errors.email}
            helperText={errors?.email?.message}
            {...register("email", {
              required: "email is required!",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email.",
              },
            })}
          />
        </div>
        <div className="mt-4 relative">
          <div
            onClick={() => setPasswordsMask((p) => ({ ...p, pwd: !p.pwd }))}
            className="absolute top-2 cursor-pointer right-2 z-10 p-2 text-darkGray-10"
          >
            {passwordsMask.pwd ? <Visibility /> : <VisibilityOff />}
          </div>
          <TextField
            type={passwordsMask.pwd ? "password" : "text"}
            fullWidth
            label="Password"
            variant="outlined"
            error={!!errors.password}
            helperText={errors?.password?.message}
            {...register("password", {
              required: "Password is required.",
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/,
                message:
                  "Password must include letters, numbers and special characters.",
              },
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters.",
              },
            })}
          />
        </div>
        <div className="mt-4 relative">
          <div
            onClick={() =>
              setPasswordsMask((p) => ({ ...p, confirmPwd: !p.confirmPwd }))
            }
            className="absolute top-2 cursor-pointer right-2 z-10 p-2 text-darkGray-10"
          >
            {passwordsMask.confirmPwd ? <Visibility /> : <VisibilityOff />}
          </div>
          <TextField
            type={passwordsMask.confirmPwd ? "password" : "text"}
            fullWidth
            label="confirm password"
            variant="outlined"
            error={!!errors.confirmPassword}
            helperText={errors?.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Confirm password is required.",
              validate: {
                passwordEqual: (value) =>
                  value === getValues().password || "Passwords must be same.",
              },
            })}
          />
        </div>
        <div className="mt-5">
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            style={{ color: "white", backgroundColor: "#3a8fde" }}
          >
            {isLoading ? (
              <div className="h-8 w-8">
                <div className="circle-loader"></div>
              </div>
            ) : (
              "Confirm"
            )}
          </Button>
        </div>
        {!!error && (
          <div className="text-red-10 text-sm mb-1.5 mt-2.5 text-center">
            {error}
          </div>
        )}
        <div className="text-center text-sm mt-1">
          Already have a account
          <Link
            to="/login"
            className="underline underline-offset-1 ml-1 text-[#4d4dab]"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
