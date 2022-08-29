
export function Input ({type , register , cssClass , placeholder , id ,...rest}){

    return (
        <input type={type} {...register}{...rest} className={cssClass} placeholder={placeholder} id={id}/>
    )
}

export function Button ({type,onClick,text,cssClass,}){

    return (
        <button type={type} onClick={onClick} className={cssClass} >{text}</button>
    )
}