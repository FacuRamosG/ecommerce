import api from "@/api"
import { Categories } from "../components/Categories"
import { Articles } from "../components/Articles"

export default async function ItemsPage ({searchParams}: {searchParams:{search:string}}) {
    
    const { results } = await api.search(searchParams.search)
    const category = await api.category.category(results[0].category_id)

    return(
        <>  
            <Categories path_from_root={category.path_from_root} />

            <Articles results={results} />
        </>    
    )
}