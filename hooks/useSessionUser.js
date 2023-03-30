import useSWR from "swr"
import fetcher from "../lib/fetcher"

export default function useSessionUser(){
    const {data, error, isLoading, mutate} = useSWR("/api/session", fetcher)

    return {
        data, error, isLoading, mutate
    }
}