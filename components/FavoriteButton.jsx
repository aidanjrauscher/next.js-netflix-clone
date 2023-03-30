import axios from "axios";
import {AiOutlinePlus, AiOutlineCheck} from "react-icons/ai"
import { useCallback, useMemo } from "react";
import useSessionUser from "../hooks/useSessionUser"
import useFavorites from "../hooks/useFavorites";

export default function FavoriteButton({movieID}){

    const {mutate: mutateFavorites} = useFavorites()
    const { data: sessionUser, mutate} = useSessionUser()

    const isFavorite = useMemo(()=>{
        const sessionFavorites = sessionUser?.favoriteIds || [] 
        return sessionFavorites.includes(movieID)
    }, [sessionUser, movieID])

    const toggleFavorites = useCallback(async ()=>{
        let response

        if (isFavorite){
            response = await axios.delete("/api/favorite", {data: {movieID}})
        }
        else{
            response = await axios.post("/api/favorite", {movieID})
        }

        const updatedFavoriteIds = response?.data?.favoriteIds

        mutate({
            ...sessionUser,
            favoriteIds: updatedFavoriteIds
        })
        mutateFavorites()
    })

    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus

    return(
        <div 
            onClick={toggleFavorites}
            className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white 
            border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
        >
            <Icon className="text-white" size={25}/>
        </div>
    )
}