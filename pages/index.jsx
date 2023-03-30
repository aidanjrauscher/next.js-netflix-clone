import {getSession} from "next-auth/react"
import Navbar from "../components/navbar"

export async function getServerSideProps(context){
  const session = await getSession(context)

  if(!session){
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }
  return{ 
    props: {} 
  }
}

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
    </>
  )
}