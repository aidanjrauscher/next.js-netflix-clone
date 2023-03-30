import prismadb from "../../../lib/prismadb"
import serverAuth from "../../../lib/serverAuth"

export default async function handler(req, res){
    if(req.method != "GET"){
        return res.status(405).end()
    }
    
    try{
        await serverAuth(req)
        const movies = await prismadb.movie.findMany()
        return res.status(200).json(movies)
    }
    catch(error){
        console.log(error)
        return res.status(400).end()
    }
}