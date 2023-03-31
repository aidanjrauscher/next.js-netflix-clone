import {useState, useCallback} from "react"
import axios from "axios"
import {signIn} from "next-auth/react"
import {useRouter} from "next/router"
import Input from "../components/Input"
import {FcGoogle} from "react-icons/fc"
import {FaGithub} from "react-icons/fa"

export default function Auth(){
    const router = useRouter()

    const [credentials, setCredentials] = useState({
        email: "",
        username: "",
        password: "",
    })

    const [credentialType, setCredentialType]= useState("login")

    const toggleCredentialType = useCallback(async ()=>{
        setCredentialType((credentialType)=>credentialType==="login" ? "signup" : "login")
    }, [])

    const login = useCallback(async ()=>{
        try{
            await signIn('credentials', {
                email: credentials.email,
                password: credentials.password,
                redirect: false,
                callbackUrl: "/"
            })

            router.push("/profiles")
        } catch(error){
            console.log(error)
        }
    }, [credentials, router])

    const register = useCallback(async()=>{
        try{
            await axios.post('/api/register', credentials)
            login()
        }
        catch(error){
            console.log(error)
        }
    }, [credentials, login])


    return(
        <div className="relative h-full w-full bg-[url('/images/hero.jpeg')] bg-no-repeat bg-center bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="netflix logo" className="h-12"/>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {credentialType==="login" ? "Sign In" : "Create an account"}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {credentialType=="signup" && (
                            <Input 
                                id="username" 
                                onChange={(e)=>{setCredentials({...credentials, username: e.target.value})}}              
                                value={credentials.username}  
                                label="Username" 
                                type="text"
                            >
                            </Input>
                            )}
                            <Input 
                                id="email" 
                                onChange={(e)=>{setCredentials({...credentials, email: e.target.value})}}
                                value={credentials.email}  
                                label="Email" 
                                type="email">
                            </Input>
                            <Input 
                                id="password" 
                                onChange={(e)=>{setCredentials({...credentials, password: e.target.value})}}
                                value={credentials.password}  
                                label="Password" 
                                type="password">
                            </Input>
                        </div>
                        <button onClick={credentialType==="login" ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 trnasition">
                            {credentialType==="login" ? "Login" : "Sign Up"}
                        </button>
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div onClick={()=>signIn("google", {callbackUrl: "/profiles"})} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FcGoogle size={30}></FcGoogle>
                            </div>
                            <div onClick={()=>signIn("github", {callbackUrl: "/profiles"})} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FaGithub size={30}></FaGithub>
                            </div>
                        </div>
                        <p className="text-neutral-500 mt-12">
                            {credentialType==="login" ? "First time using Netflix?" : "Already have an account?"}
                            <span onClick={toggleCredentialType} className="text-white ml-1 hover:underline cursor-pointer">
                                {credentialType==="login" ? "Create an account" : "Login"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}