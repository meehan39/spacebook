interface props {
    type: string,
    placeholder: string
}

export default ({type, placeholder}: props): JSX.Element => (
    <input
        type={type}
        placeholder={placeholder}
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