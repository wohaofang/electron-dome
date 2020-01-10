import React ,{ useState, useEffect} from 'react'

const useMouse = ()=>{
    let [position,setPosition] = useState({x:0,y:0})

    useEffect(()=>{
        const callBack = (event)=>{
            setPosition({x:event.clientX,y:event.clientY})
        }
        document.addEventListener('mousemove',callBack)
        
        return ()=>{
            document.removeEventListener('mousemove',callBack)
        }
    })

    return position
}


export default useMouse