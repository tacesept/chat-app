import { useState } from "react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { loading, login } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    login(inputs);
  };
  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend className="fieldset-legend">Login</legend>

      <form onSubmit={handleSubmit} className="space-y-2">
        <label className="label">Email</label>
        <input
          type="email"
          className="input validator"
          placeholder="Email"
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          required
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input validator"
          placeholder="Password"
          minLength={6}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          required
        />

        <Link to={"/signup"} className="hover:underline">
          Don't have an account?
        </Link>

        <button className="btn btn-neutral btn-block mt-4">
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </fieldset>
  );
};
export default Login;
