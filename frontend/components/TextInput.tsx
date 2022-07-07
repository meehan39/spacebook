import { useState } from 'react';

interface props {
    type: string,
    value: string,
    setValue: (v: string) => void,
    placeholder: string
}

export default ({type, value, setValue, placeholder}: props): JSX.Element => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className='
                w-full
                border-4 border-slate rounded-xl
                px-2
                transition-all duration-200 ease-in
                hover:border-black
                focus:border-main outline-none
            '
        />
    )
}