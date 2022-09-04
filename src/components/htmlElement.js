import { createContext } from "react";

export function Input ({labelCssClass , labelText , type , register , cssClass , placeholder , id  ,...rest}){

    return (
    <>
        <label className={labelCssClass} htmlFor={id}>{labelText}</label>
        <input type={type} {...register}{...rest} className={cssClass} placeholder={placeholder} id={id} />
    </>
    )
}

export function Button ({type,onClick,text,cssClass,}){

    return (
        <button type={type} onClick={onClick} className={cssClass} >{text}</button>
    )
}

export const fetchFn = (hash="todos", method="GET", whihToken=false, Token="string",body={})=>{
    if(whihToken && Object.keys(body).length>0)
    return fetch(`https://todoo.5xcamp.us/${hash}`,{
        headers: {
        'accept': 'application/json',
        'content-Type': 'application/json',
        'authorization':Token,
        },
        'method':method,
        'body':JSON.stringify(body),
    })

    if(whihToken===false && Object.keys(body).length>0)
    return fetch(`https://todoo.5xcamp.us/${hash}`,{
        headers: {
        'accept': 'application/json',
        'content-Type': 'application/json',
        'body':JSON.stringify(body),
        },
        'method':method,
    })

    if(whihToken)
    return fetch(`https://todoo.5xcamp.us/${hash}`,{
        headers: {
        'accept': 'application/json',
        'content-Type': 'application/json',
        'authorization':Token,
        },
        'method':method,
    })

    return fetch(`https://todoo.5xcamp.us/${hash}`,{
        headers: {
        'accept': 'application/json',
        'content-Type': 'application/json',
        },
        'method':method,
    })

}

export const Token = createContext();
