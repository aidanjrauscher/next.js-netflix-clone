import { getSession } from 'next-auth/react'
import prismadb from "./prismadb"

export default async function serverAuth(req){
    const session = await getSession({ req })

    if (!session?.user?.email){
        throw new Error("User not signed in.")
    }

    const sessionUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    if(!sessionUser){
        throw new Error("User not signed in.")
    }

    return { sessionUser }
}