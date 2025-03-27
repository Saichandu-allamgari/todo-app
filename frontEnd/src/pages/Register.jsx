 import { Link, useNavigate } from "react-router-dom";
import { register } from "../api";
import AuthForm from "../components/AuthForm";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      await register(formData);
      navigate("/login");
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (<>
  <div className="flex justify-end m-6">
  <button ><Link to={"/"}>Home  </Link> </button></div>
    <div className="flex flex-col form-overlay justify-center items-center  m-10 ">
      <h2>Register</h2>
      <AuthForm isLogin={false} onSubmit={handleRegister} />
<h3>Already having an Account? <span> <button><Link to={"/login"}>Login</Link></button></span></h3>
     
    </div>
    </>
  );
};

export default Register;