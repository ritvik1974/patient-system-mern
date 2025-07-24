import { useState } from "react";
import { login, signup } from "./apiCall";
import { FiMonitor } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginSignup = () => {
  // initialize the local states
  const [email, setEmail] = useState("");
  const [errors, setErorrs] = useState({
    emailErorr: "",
    passwordError: "",
    message: "",
  });
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // validation for email and  password
  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password || password.length < 8)
      newErrors.password = "Password is required or must be 8 character";
    if (newErrors.email || newErrors.password) {
      setErorrs({
        emailErorr: newErrors.email,
        passwordError: newErrors.password,
      });
      return false;
    }
    setErorrs({
      emailErorr: "",
      passwordError: "",
    });
    return true;
  };
  // Validate input fields

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const credential = { email, password, rememberMe };
    const isValid = validateForm();
    if (isValid) {
      if (isLogin) {
        const data = await login(credential);
        // console.log(data.data.message);
        if (data?.token) {
          localStorage.setItem(
            "userdata",
            JSON.stringify({ token: data.token, userId: data.userId, email })
          );
          // gieve a tost message for successful
          toast.success("login Successful! welocome to patient System !", {
            position: "top-center",
          });
          window.location.href = "/";
        } else {
          setErorrs((pre) => ({
            ...pre,
            message: data?.data?.message || "something went wrong",
          }));
        }
      } else {
        const data = await signup(credential);
        // console.log(data);
        if (data?.token) {
          localStorage.setItem(
            "userdata",
            JSON.stringify({
              token: data.token,
              userId: data.userId,
              email: data.email,
            })
          );
          // gieve a tost message for successful
          toast.success("Singup Successful! welocome to patient System !", {
            position: "top-center",
          });
          window.location.href = "/";
        } else {
          setErorrs((pre) => ({
            ...pre,
            message: data?.data?.message || "something went wrong",
          }));
        }
        // console.log(data);
      }
      setEmail("");
      setPassword("");
      setRememberMe("");
    } else {
      // gieve a tost message for error
      toast.error("error - something went wrong", {
        position: "top-center",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-96 overflow-hidden">
        <div className="bg-purple-600 p-4 flex items-center">
          <FiMonitor className="text-white mr-2 text-center" size={30} />
          <h2 className="text-white text-xl font-semibold">Patient System</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            {isLogin ? "LogIn to your Account" : "Signup for your Account"}
          </h3>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 border border-gray-300 rounded${
                errors.emailErorr ? "text-red-400" : ""
              }`}
              required
            />
            {errors.emailErorr && (
              <p className="text-red-500 font-semibold text-sm">
                {errors.emailErorr}
              </p>
            )}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 border border-gray-300 rounded${
                errors.passwordError ? "text-red-400" : ""
              }`}
              required
            />
            {errors.passwordError && (
              <p className="text-red-500 font-semibold text-sm">
                {errors.passwordError}
              </p>
            )}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="remember-me" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors"
            >
              {isLoading ? (
                <span>Loading...</span>
              ) : !isLogin ? (
                "Sign Up"
              ) : (
                "Login"
              )}
            </button>
          </div>
          <div className="text-center my-2">
            {isLogin
              ? " haven't any account ? "
              : "Already have have an account! "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </div>
          {errors.message && (
            <h2 className="text-sm text-center font-normal text-red-500">
              {errors.message}
            </h2>
          )}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginSignup;
