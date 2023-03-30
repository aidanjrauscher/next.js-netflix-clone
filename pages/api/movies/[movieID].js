import prismadb from "../../../lib/prismadb"
import serverAuth from "../../../lib/serverAuth"

export default async function handler(req,res){
    try{
        if(req.method != "GET"){
            return res.status(405).end()
        }
        await serverAuth(req)
        const {movieID} = req.query
        if (typeof movieID != 'string' || !movieID){
            throw new Error("Invalid movie ID.")
        }
        
        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieID
            }
        })

        if(!movie){
            throw new Error("Invalid movie ID.")
        }

        return res.status(200).json(movie)
    } catch(error){
        console.log(error)
        return res.status(400).end()
    }
}

