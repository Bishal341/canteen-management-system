import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Login } from "./Routes/Loginsignup";
import { useNavigate } from "react-router-dom";
import ImSpinner from "./bundles/Spinner";

const LoginCard = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [visible, setvisible] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [spinner, setspinner] = useState(false);

  const handleLogin = async () => {
    setspinner(true);
    setLoading(true);
    const res = await Login(email, password);
    if (res?.token) {
      navigate("/dashboard");
    }
    setLoading(false);
    setspinner(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-96 border p-6 shadow-lg">
        <legend className="fieldset-legend text-2xl font-bold mb-2">
          Login
        </legend>

        <label className="label text-sm">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="input input-bordered w-full"
          placeholder="Enter your email"
        />
        <div className="relative w-full">
          <label className="label text-sm mt-3">Password</label>
          <input
            type={visible ? "text" : "password"}
            className="input input-bordered w-full pr-10"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Enter your password"
          />
          <div
            className="absolute inset-y-0 right-3 flex items-center pt-8 cursor-pointer text-2xl"
            onClick={() => setvisible(!visible)}
          >
            {visible ? <BsEye /> : <BsEyeSlash />}
          </div>
        </div>

        <button
          className="btn btn-neutral mt-5 w-full"
          onClick={handleLogin}
          disabled={loading}
        >
          {spinner ? <ImSpinner /> : null}
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex justify-center text-lg text-blue-500 pt-4 ">
          <a href="/signup">Create new account</a>
        </div>
      </fieldset>
    </div>
  );
};

export default LoginCard;
