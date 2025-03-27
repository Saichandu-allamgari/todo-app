import { useState } from "react";
import { Link } from "react-router-dom";

const AuthForm = ({ isLogin, onSubmit }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="flex flex-col justify-center items-center border rounded-lg  w-[40%] m-10 ">
      {!isLogin && (
        <input className="m-5 p-3"  type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
      )}
      <input className="m-5 p-3" type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
      <input  className="m-5 p-3" type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
      <button  className="m-5 " type="submit">{isLogin ? "Login" : "Register"}</button>
    </form>
  );
};

export default AuthForm;