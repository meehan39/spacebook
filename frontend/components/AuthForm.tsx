interface props {
    name: string,
    submit: () => void,
    children: JSX.Element | JSX.Element[]
}

export default ({name, submit, children}: props): JSX.Element => (
    <form className='
        w-full max-w-xl
        flex flex-col justify-center items-center
        '>
        <h2 className='flex justify-center text-6xl'>{name}</h2>
        <div className='
            w-full
            p-4 my-4
            border-4 border-black rounded-xl
            flex flex-col justify-center items-center gap-8
            text-2xl'
        >
            {children}
        </div>
        <button onClick={submit} type='button'
            className='
            group
            w-48 p-2
            border-4 border-slate rounded-xl
            transition-all duration-200 ease-in hover:border-black
        '>
            <div className='
                rounded-3xl
                bg-slate
                p-1
                transition-all duration-200 ease-in
                group-hover:rounded-xl group-hover:bg-main
            '>
                <span className='
                    text-3xl
                    transition-all duration-200 ease-in
                    group-hover:text-white
                '>
                    {name}
                </span>
            </div>
        </button>
    </form>
)