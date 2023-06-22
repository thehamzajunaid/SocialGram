import { createContext, useEffect, useState } from "react"

export const PostDeleteModalContext = createContext();

export const PostDeleteModalContextProvider = ({children}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
       setOpen(true)
    }
      
      const handleClose = () => setOpen(false); 

    //   useEffect(()=> {
    //     console.log(open)
    //     handleClose()
    //   }, []
    //   )

      return (
        <PostDeleteModalContext.Provider value={{open, handleOpen, handleClose}} >
            {children}
        </PostDeleteModalContext.Provider>
      )
}