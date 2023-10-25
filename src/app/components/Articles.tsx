import Image from "next/image"
import Link from "next/link"
import React from "react"
type Results = {
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
}

export const Articles = ({ results }: Results) => {
    return(
        <article className="grid grid-cols-[repeat(auto-fill,minmax(275px,1fr))] gap-5 mt-16">
                {results.map(result =>{ 
                    const src = `https://http2.mlstatic.com/D_${result.thumbnail_id}-O.jpg`
                return(
                    <Link key={result.id} className="box-border flex flex-col items-center bg-white p-4 hover:scale-105 duration-300" href={`/items/${result.id}`} >
                        <picture className="w-full border-b p-1 ">
                            <img src={src} alt={result.title} className="w-[250px] h-[250px] m-auto object-contain" width='250' height='250' />
                        </picture>
                        <div className="w-full flex flex-col justify-start text-gray-700">
                            <h4 className="">{result.title}</h4>
                            <h4 className="text-xs line-through">{result.original_price?.toLocaleString("es-AR", {
                                    currency: result.currency_id,
                                    style: "currency"
                                })}</h4>
                            <strong>
                                {result.price.toLocaleString("es-AR", {
                                    currency: result.currency_id,
                                    style: "currency"
                                })}
                                {result.original_price 
                                    ? <span className="text-xs text-green-700 ml-2">
                                        {((result.original_price - result.price) / result.original_price * 100).toFixed(0)}% OFF
                                      </span> 
                                    : ""}
                            </strong>
                        </div>
                    </Link>
                )})}
            </article>
    )
}