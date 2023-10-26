import EmblaCarousel from '@/app/components/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel-react'
import '../../css/embla.css'
import '../../css/sandbox.css'
import api from '../../../api'
import { Categories } from '@/app/components/Categories'

export default async function ItemsPage ({params: {id}}: {params:{id:string}}) {

    const item = await api.item.search(id)
    const {plain_text} = await api.item.description(id)
    const seller = await api.seller(item.seller_id)
    const category = await api.category.category(item.category_id)


     const OPTIONS: EmblaOptionsType = {}
     const SLIDE_COUNT = item.pictures.length  > 8 ? 8 : item.pictures.length
     const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
     const cuotas = item.price/12
        
    return(
        <>
            <Categories path_from_root={category.path_from_root} />

            <article className="bg-white">
                    <div key={item.id} className="box-border flex flex-col md:flex-row sm:justify-between p-4 h-full gap-11 border-b" >
                        <div className='sandbox__carousel md:h-[500px] md:w-[700px]'>
                            <EmblaCarousel slides={SLIDES} options={OPTIONS} imageByIndex={item.pictures} />
                        </div>

                        <div className=" text-gray-700 flex flex-col justify-between border p-7 rounded-2xl md:max-w-[400px]">
                            <div className="flex flex-col gap-6">
                                <h4 className="font-bold text-xl ">{item.title}</h4>
                                <h4 className="text-base -mb-2 line-through">{item.original_price?.toLocaleString("es-AR", {
                                    currency: item.currency_id,
                                    style: "currency"
                                })}</h4>
                                <strong className="text-4xl font-normal">
                                    
                                    {item.price.toLocaleString("es-AR", {
                                        currency: item.currency_id,
                                        style: "currency"
                                    })}
                                    {item.original_price 
                                    ? <span className="text-base text-[#15AD5E] ml-2">
                                        {((item.original_price - item.price) / item.original_price * 100).toFixed(0)}% OFF
                                      </span> 
                                    : ""}
                                    
                                </strong>
                                <span className='-mt-3'>En 12x {cuotas.toLocaleString("es-AR", {
                                        currency: item.currency_id,
                                        style: "currency"
                                    })}
                                </span>

                                <p className=''>{item.seller_address.search_location?.city?.name && item.seller_address.search_location.city.name}</p>
                            </div>
                            <p className='text-[#08A955]'> Envío gratis</p>
                            <p className=''>{item.warranty}</p>
                            <p>Vendido por <a href={seller.permalink} className='text-[#8CB9FC]'>{seller.nickname}</a></p>
                            <p >Total de ventas:<span className={seller.seller_reputation.transactions.total > 300 ? 'text-green-500' : ''}> {seller.seller_reputation.transactions.total}</span></p>
                            { item.available_quantity > 0 ? (item.available_quantity === 1 ? <strong>¡Última unidad!</strong> : <strong>Stock disponible</strong>) : <strong>Sin stock</strong>}
                            <a href={item.permalink} className="py-3 bg-[#3483FA] text-center font-medium text-lg text-[#F3F8FF] rounded-lg">
                                COMPRAR
                            </a>
                                                    
                        </div>
                    </div>
                    <div className="text-gray-700 text p-5 sm:p-[80px]">
                        <h2 className="font-bold text-xl mb-5">Descripción</h2>
                        <p >{plain_text}</p>
                    </div>
                
            </article>
        </>
    )
}