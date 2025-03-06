import { getEmailByUserId } from "@/api/auth/getEmailByUserId";
import { useAuth } from "@/hooks/use-auth";
import { User } from "@/types/user";
import LoginForm from "./atomic/LoginForm";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate(); // Initialize navigate function

    const { signIn } = useAuth();

    const handleLogin = async (values: User) => {
        
        try {
          // Perform your logic
          const email = await getEmailByUserId(values.userid);
          
          //PERFORM LOGIN
          signIn(email, values.password);
        } catch (error) {
          console.error("Error during encryption/decryption:", error);
        } finally {
          navigate(-2);
        }
      };

      return (
        <div className="flex w-full h-screen md:h-[calc(100vh-80px)] items-start justify-center align-middle bg-white">
          <div className="login__container justify-center flex items-center h-1/2 md:w-1/2  mt-20 shadow-lg rounded-lg p-10 bg-slate-50">
          <LoginForm onSave={handleLogin} />
          </div>
        </div>
      );
      
}

export default Login
