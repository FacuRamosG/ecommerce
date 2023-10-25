import Link from "next/link"
type Categories = {
    path_from_root:{
        id:string
        name:string
    }[]
}

export const Categories = ({path_from_root}: Categories ) => {
    return(
        <div className="mb-4">
        {path_from_root.map((cate, index) =>  {
                
                return(
                    <Link key={cate.id} href={`/category/${cate.id}`} className='text-[#3485F8] cursor-pointer hover:text-[#375d92]'>{index === 0 ? `${cate.name} `: `> ${cate.name} `} </Link>
                )
            }                
            )}
        </div>
    )
}