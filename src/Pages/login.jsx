import React, { useEffect } from "react";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../api/User";
import logo from '../../public/logo.png'
import NotificationComponent from "../Component/notificationComponent";
const Login = () => {
  console.log('renderinc login')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [runApi, setRunApi] = useState(false);
  const [showLoader,setShowLoader] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setRunApi(!runApi);
    setShowLoader(true)
  };
  const [message,setMessage] = useState(false)
  const [data,setData] = useState({
    Heading:'Demo',
    Code:'000',
    Text:'text demo'
  })
  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      return navigate("/dashboard");
    }
    if (email && password) {
      signIn({ email, password })
        .then((response) => {
          setShowLoader(false)
          setMessage(true)
          setData({...data,Heading:response.data.statusText,Code:response.data.statusCode,Text:response.data.msg})
          if(response.data.msg == "login successfull") {
            sessionStorage.setItem("user", JSON.stringify(response.data.data));
            window.location.reload();
            setShowLoader(false)
            navigate("/dashboard");
          }
        })
        .catch((err) => {
          setShowLoader(false)
          console.log(err)
         if(err){
           setMessage(true)
          const {response} = err
          setData({...data,Heading:response.statusText,Code:response.data.statusCode,Text:response.data.msg}) 
         }
        });
    }
  }, [runApi]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4">
     {message ? <NotificationComponent data={data} action={setMessage}/> : ''} 
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        {/* Title */}
        <img src={logo} alt="" className="w-full" style={{height:'200px'}} />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-blue-500 focus:outline-none transition"
              placeholder="example@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-blue-500 focus:outline-none transition"
              placeholder="********"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold 
                       hover:bg-blue-700 transition-all flex justify-center"
          >
            {showLoader ? (<div  style={{
          display: 'inline-block',
          animation: 'spin 2s linear infinite',
        }}><Loader /></div>) : 'Login'}
            
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
