import { Link } from "react-router-dom"
import { BsPatchCheckFill } from "react-icons/bs";



const SignUpSuccess = () => {
  return (
 <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/50 min-h-screen ">
      <div className="bg-white rounded-md w-1/3 py-5 flex flex-col items-center justify-center gap-4">
        <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center animate-pulse">
      <BsPatchCheckFill className="w-8 h-8 text-white" />
    </div>
       <p className="text-2xl">Account Created Successfully!</p>
       <Link
            to="/login"
            className="text-blue-600 font-semibold cursor-pointer hover:underline hover:underline-offset-3 decoration-blue-500"
          >
            Log in now
          </Link>
      </div>
      </div>
  )
}

export default SignUpSuccess