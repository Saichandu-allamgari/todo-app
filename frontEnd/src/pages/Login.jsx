import { Link, useNavigate } from "react-router-dom";
import { login } from "../api";
import AuthForm from "../components/AuthForm";

const Login = () => {
  const navigate = useNavigate();

  // const handleLogin = async (formData) => {
  //   try {
  //     await login(formData);
  //     navigate("/dashboard"); // Redirect to Dashboard if login is successful
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       // If user doesn't exist, redirect to Register page
  //       alert("User not found. Redirecting to registration...");
  //       navigate("/register");
  //     } else {
  //       alert("Login failed! Please check your credentials.");
  //     }
  //   }
  // };

  const handleLogin = async (formData) => {
    try {
      await login(formData);
      const user = await getUser(); // ✅ Check session immediately after login
      if (user) {
        navigate("/dashboard");
      } else {
        alert("Session not set. Please try logging in again.");
      }
    } catch (error) {
      alert("Login failed! Please check your credentials.");
    }
  };
  

  return (<><div className="flex justify-end m-6">
    <button ><Link to={"/"}>Home  </Link> </button></div>
    <div  className="flex flex-col justify-center items-center border rounded-lg  form-overlay m-10  ">
      <h2>Login</h2>
      <AuthForm isLogin={true} onSubmit={handleLogin} />
<h3> Create an Account  <span><button><Link to={"/register"}> Register  </Link></button></span></h3>
      
    </div>
    </>
  );
};

export default Login;