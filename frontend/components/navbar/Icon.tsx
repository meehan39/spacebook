interface props {
    page: string
}

export default ({page}: props): JSX.Element => (
    <div className='
        group
        w-16 h-16
        flex justify-center items-center
    '>
        <div className='
            w-12 h-12
            bg-slate
            rounded-3xl
            cursor-pointer transition-all duration-200 ease-in
            hover:rounded-2xl hover:bg-main
        '></div>

    </div>
)