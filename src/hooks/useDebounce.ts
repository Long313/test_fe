import { useEffect, useState } from "react";

const  useDebounce = (value : any, delay? : number) => {
    const [debounceValue, setDebounceValue] = useState<any>("");
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebounceValue(value);
        },delay)
        return () => clearTimeout(timerId);
    },[value,delay])
    return debounceValue;
}   

export default useDebounce;