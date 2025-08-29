import { useState } from "react";
import { Link } from "react-router";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });
  const { loading, signup } = useSignup();
  const handleSubmit = (e) => {
    e.preventDefault();

    signup(inputs);
  };
  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend className="fieldset-legend">Login</legend>

      <form onSubmit={handleSubmit}>
        <label className="label">Email</label>
        <input
          type="email"
          className="input validator"
          placeholder="Email"
          required
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        />

        <label className="label">name</label>
        <input
          type="name"
          className="input validator"
          placeholder="Name"
          required
          onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input validator"
          placeholder="Password"
          minLength="6"
          required
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />

        <label className="label">Confirm password</label>
        <input
          type="password"
          className="input validator"
          placeholder="Confirm Password"
          minLength="6"
          required
          onChange={(e) =>
            setInputs({ ...inputs, confirmPassword: e.target.value })
          }
        />

        <div className="flex flex-col gap-3 py-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="male"
              className="radio radio-success mr-3"
              onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
              defaultChecked
            />
            <span>Male</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="female"
              className="radio radio-success mr-3"
              onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
            />
            <span>Female</span>
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-neutral btn-block mt-4 hover:bg-success"
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "sign up"
          )}
        </button>
      </form>
      <div>
        Already have account?
        <Link to={"/login"} className="text-primary hover:text-success">
          {" "}
          Login
        </Link>
      </div>
    </fieldset>
  );
};
export default Signup;
