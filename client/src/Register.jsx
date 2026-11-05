import { useRef, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Signup } from "./Routes/Loginsignup";
import { useNavigate } from "react-router-dom";
import ImSpinner from "./bundles/Spinner";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const RegisterCard = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [visible, setvisible] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [spinner, setspinner] = useState(false);
  const cardRef = useRef(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReduced || !cardRef.current) return;

      gsap.from(cardRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.55,
        ease: "power2.out",
      });
    },
    { scope: cardRef },
  );

  const handleRegister = async() => {
    setspinner(true);
    setLoading(true);
    const res = await Signup(username, email, password); 
    if(res?.token){
      navigate("/dashboard");
    }
    setLoading(false);
    setspinner(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8">
      <fieldset
        ref={cardRef}
        className="fieldset bg-base-100 border-base-300 rounded-box w-full max-w-96 border p-4 sm:p-6 shadow-lg"
      >
        <legend className="fieldset-legend text-2xl font-bold mb-2">
          Signup
        </legend>
        <label className="label text-sm">username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          className="input input-bordered w-full"
          placeholder="Username"
        />

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
          onClick={handleRegister}
          disabled={loading}
        >
          {spinner ? <ImSpinner /> : null }
          {loading ? "Processing..." : "Register"}
        </button>

        <div className="flex justify-center text-lg text-blue-500 pt-4 ">
          <a href="/">Login</a>
        </div>
      </fieldset>
    </div>
  );
};

export default RegisterCard;
