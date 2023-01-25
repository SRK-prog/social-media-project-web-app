import { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../api/baseUrls";

export default function ResetPassword({ history, location }) {
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

  useEffect(() => {
    document.title = "Reset Password";
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location?.search);
    const userId = searchParams.get("id");
    const token = searchParams.get("token");
    if (!location.search || !userId || !token) history.push("/error404");
    // eslint-disable-next-line
  }, [location.search]);

  const onSubmit = async ({ password }) => {
    setIsLoading(true);
    setError("");
    const searchParams = new URLSearchParams(location?.search);
    const userId = searchParams.get("id");
    const token = searchParams.get("token");
    try {
      const { data } = await baseUrl.post(
        "/reset/new",
        { password },
        { params: { userId, token } }
      );
      if (data?.message) history.push("/login");
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Something went wrong!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-16 mx-3">
      <form
        className="rounded-lg mx-auto px-3 pt-2.5 pb-6 border border-darkGray-30 max-w-112.5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between mt-2">
          <h2 className="text-xl text-center font-semibold">Reset Password</h2>
        </div>
        <div className="mt-2 text-gray-80 text-sm">Enter your new password</div>
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
              "Confirm"
            )}
          </Button>
        </div>
        {!!error && (
          <div className="text-red-10 text-sm mb-1.5 mt-2.5 text-center">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
