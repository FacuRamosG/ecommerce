const api = {
    item: {
        search: (query: string) => fetch(`https://api.mercadolibre.com/items/${query}`)
            .then(res => res.json() as Promise<{
                id:string
                title:string
                thumbnail:string
                price: number                
                currency_id: string
                permalink: string
                warranty:string
                seller_id: number
                available_quantity:number
                category_id: string
                seller_address:{
                    search_location:{
                        city:{
                            name:string
                        }
                    }                                    
                }
                pictures: {
                    secure_url:string
                    id: string
                }[]
            }>),
        description: (query: string) => fetch(`https://api.mercadolibre.com/items/${query}/description`)
                                    .then(res => res.json() as Promise<{
                                        plain_text: string
                                    }>)
    },
    seller:(query:number) => fetch(`https://api.mercadolibre.com/users/${query}`)
                                .then(res => res.json() as Promise<{
                                    nickname:string
                                    permalink:string
                                    seller_reputation: {
                                        transactions:{
                                            total:number
                                        }
                                    }
    }>),
    category: {
        category: (query:string) => fetch(`https://api.mercadolibre.com/categories/${query}`)
                                                        .then(res => res.json() as Promise<{
                                                            path_from_root:{
                                                                id:string
                                                                name:string
                                                            }[]
                                                }>),
        search: (query:string) => fetch(`https://api.mercadolibre.com/sites/MLA/search?category=${query}&limit=20`)
                                    .then(res => res.json() as Promise<{
                                        results: {
                                            id:string
                                            title:string
                                            thumbnail:string
                                            price: number
                                            original_price: number
                                            currency_id: string
                                            category_id: string
                                            seller_address:{
                                                city:{
                                                    name:string
                                                }
                                            }
                                        }[]
                                    }>)
    },
    search: (query: string) => fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=20`)
                                .then(res => res.json() as Promise<{
                                    results: {
                                        id:string
                                        title:string
                                        thumbnail_id:string
                                        price: number
                                        original_price: number
                                        currency_id: string
                                        category_id: string
                                        seller_address:{
                                            city:{
                                                name:string
                                            }
                                        }
                                    }[]
                                }>)

    
}

export default api

