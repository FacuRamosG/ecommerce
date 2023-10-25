import type { Metadata } from 'next'
import api from "@/api"
import { Categories } from "@/app/components/Categories"
import { Articles } from "@/app/components/Articles"

export const metadata: Metadata = {
    title: 'Items per category',
    description: 'here you cand find all items per category',
  }

export default async function ItemsPage ({params: {id}}: {params:{id:string}}) {
    
    const { results } = await api.category.search(id)                       
    const category = await api.category.category(id)

    return(
        <>  
            <Categories path_from_root={category.path_from_root} />
            <Articles results={results} />
        </>    
    )
}