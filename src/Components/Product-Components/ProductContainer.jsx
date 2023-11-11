import { Link } from "react-router-dom";

const style={
  productcontainer:`flex flex-row bg-slate-100 m-1.5 w-[600px] border-1 border-solid border-slate-200 shadow-xl justify-evenly p-2.5 items-center
  h-[350px]`,
  img:`h-fit w-fit max-h-[250px] max-w-[300px]`,
  details:`w-[70%]`,
  title:`text-[35px] font-semibold p-1 no-underline`,
  price:`flex ml-1 p-0 flex-col`,
  mrp:`flex m-0 p-1.5`,
  seleprice:`flex m-0 p-1.5`,
  save:`flex m-0 p-1 text-lg`,
  frate:`flex m-0  text-red-500 line-through`,
  rate:`text-lime-500 ml-1.5 border-1 border-solid`,
  buycart:`flex mt-2 ml-1.5 justify-left`,
  btn:`bg-slate-100 text-yellow-400 border-2 border-solid border-yellow-400 p-1.5 rounded-lg mr-2.5 hover:bg-black`,
}
export default function ProductContainer(product) {
  let p=product.product
    let overaaltax=10/100;
    let overcommision=10/100;
    let extraforfun=10/100;
    let mrp=parseInt(p.price)
    mrp=mrp+overaaltax*mrp+overcommision*mrp+extraforfun*mrp
    const seleprice=mrp-extraforfun*mrp
    console.log("products products",product.product)
  return (
    <div className={style.productcontainer}>
       <img src={p.productImage} className={style.img} />
       <div className={style.details}>
            <a href={`/product/${p.productType}/${p.id}`}>
              <p className={style.title}>{p.productTitle} </p></a> 
            <div className={style.price}>
                <div className={style.mrp}>TAKA: <p className={style.frate}>{mrp}</p> </div>
                <div className={style.seleprice}>Discount Price: <p className={style.rate}>{seleprice}</p> </div>
                <p className={style.save}>Discount: {mrp-seleprice}</p>
            </div> 
            <a href={`/product/${p.productType}/${p.id}`} className={style.buycart}>
                <button className={style.btn}>More Details</button>
            </a>
       </div>
        </div>
  )
}
