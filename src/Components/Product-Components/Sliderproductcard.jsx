
const style={
    miniproduct:`flex flex-col bg-slate-100 m-1.5 w-[280px] border-1 border-solid border-slate-150 shadow-xl p-2.5 items-center h-[400px] rounded-lg`,
    miniimgcon:`h-[220px] flex items-center`,
    img:`max-w-[220px] max-h-[200px]`,
    productdetails:``,
    productTitle:`text-2xl font-bold`,
    price:`flex m-0 p-0 flex-col`,
    frate:`flex m-0  text-red-500 line-through`,
    mrp:`flex m-0 p-1.5 `,
    rate:`flex text-lime-500`,
    seleprice:`flex m-0 p-1.5`,
    save:`flex m-0 p-1 text-lg`,
    btn:`bg-slate-100 text-yellow-400 border-2 border-solid border-yellow-400 p-1.5 mt-2.5 hover:bg-black hover:text-yellow-400`
}
export default function Sliderproductcard(product) {
    let p=product.product
    let overaaltax=10/100;
    let overcommision=10/100;
    let extraforfun=10/100;
    let mrp=parseInt(product.product.price)
    mrp=mrp+overaaltax*mrp+overcommision*mrp+extraforfun*mrp
    const seleprice=mrp-extraforfun*mrp
  return (
    <div className={style.miniproduct}>
        <div className={style.miniimgcon}>
         <img src={product.product.productImage} className={style.img} />
        </div>
        <div className={style.productdetails}>
            <p className={style.productTitle}>{product.product.productTitle}</p>
        
            <div className={style.price}>
                <div className={style.mrp}>TAKA: <p className={style.frate}>{mrp}</p> </div>
                <div className={style.seleprice}>Discount Price: <p className={style.rate}>{seleprice}</p> </div>
                <p className={style.save}>Discount Price: {mrp-seleprice}</p>
            </div> 
            <a href={`/product/${p.productType}/${p.id}`}> 
            <button className={style.btn}>Show more &gt;</button></a>
           
        </div>   
    </div>
  )
}
