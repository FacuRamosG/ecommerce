import api from "@/api"
import { Articles } from "./components/Articles"

export default async function ItemsPage () {
    const { results } = await api.search('ofert')

    return(
        <>  
            <Articles results={results} />
        </>    
    )
}