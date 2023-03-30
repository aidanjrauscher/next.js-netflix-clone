import prismadb from "../../lib/prismadb"
import serverAuth from "../../lib/serverAuth";

export default async function handler(req,res){
    try{
        if(req.method != "GET"){
            return res.status(405).end()
        }

        const { sessionUser } = await serverAuth(req)

        const favoriteIds = sessionUser?.favoriteIds || []
        const favoriteMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    in: favoriteIds
                }
            }
        })
        return res.status(200).json(favoriteMovies)
    } catch(error){
        console.log(error)
        return res.status(400).end()
    }
}