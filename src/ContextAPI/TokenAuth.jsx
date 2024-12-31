import { createContext,useEffect,useState } from "react"

export const TokenAuthContext=createContext()

function TokenAuth({children}) {
    const[isAuthorized,setIsAuthorized]=useState(false)
    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            setIsAuthorized(true)
        }else{
            setIsAuthorized(false)
        }
    },[isAuthorized])

  return (
    <>
    <TokenAuthContext.Provider value={{isAuthorized,setIsAuthorized}}>
    {children}
    </TokenAuthContext.Provider>

    </>
  )
}

export default TokenAuth
