import useSWR from "swr"
import fetcher from "../lib/fetcher"

export default function useMovie(movieID){
    const {data, error, isLoading} = useSWR(movieID ? `/api/movies/${movieID}` : null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    return{
        data, error, isLoading
    }
}