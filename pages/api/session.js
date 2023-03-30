import serverAuth from "../../lib/serverAuth"


export default async function handler(req, res){
    try{
        if(req.method != "GET"){
            return res.status(405).end()
        }
        
        const { sessionUser } = await serverAuth(req)
        return res.status(200).json(sessionUser)
    } catch(error){
        console.log(error)
        res.status(400).end()
    }

}