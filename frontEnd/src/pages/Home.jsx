import { Link } from "react-router-dom";

const Home = () => (
  <div className="flex justify-center items-center h-[50%] ">
    <div className="form-overlay justify-center items-center border rounded-lg  w-[80%]  m-10">
      <h2 className="text-center m-4">Welcome to the To-Do App</h2>
  
      
      <ul className="flex justify-around p-20">
        <li><Link to={"/login"}>Login |</Link></li>
        <li><Link to={"/register"}> | Register</Link></li>
      </ul>
    </div>
    </div>
  );
  
  export default Home;