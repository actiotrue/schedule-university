import { checkAuthOptions } from "@/client/@tanstack/react-query.gen"
import { useQuery } from "@tanstack/react-query"

export const useGetCurrentUser = () =>{
    return useQuery({
        retry:false,
        ...checkAuthOptions()
    })
}