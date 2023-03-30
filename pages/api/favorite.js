import { without } from "lodash";
import prismadb from "../../lib/prismadb"
import serverAuth from "../../lib/serverAuth";

export default async function handler(req, res){
    try{
        const {sessionUser} = await serverAuth(req)
        const {movieID} = req.body
        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieID
            }
        })
        if(!movie){
            throw new Error("Invalid movie ID.")
        }

        if(req.method == "POST"){
            const user = await prismadb.user.update({
                where: {
                    email: sessionUser.email
                },
                data: {
                    favoriteIds: {
                        push: movieID
                    }
                }
            })

            return res.status(200).json(user)
        }

        if(req.method=="DELETE"){
            const updatedFavoriteIDs = without(sessionUser.favoriteIds, movieID)

            const user = await prismadb.user.update({
                where: {
                    email: sessionUser.email
                },
                data: {
                    favoriteIds: updatedFavoriteIDs
                }
            })

            return res.status(200).json(user)
        }
        return res.status(405).end()
    } catch(error){
        console.log(error)
        return res.status(400).end()
    }
}