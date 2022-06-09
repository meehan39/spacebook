interface props {
    text: string,
    onClick: () => void
}

export default ({text, onClick}: props): JSX.Element => (
    <button className='group border-slate w-64 border-4 p-3 rounded-xl transition-all duration-200 ease-in hover:border-black'>
        <div className='bg-slate rounded-3xl p-1 transition-all duration-200 ease-in group-hover:rounded-xl group-hover:bg-main'>
        <span className='text-6xl transition-all duration-200 ease-in group-hover:text-white'>{text}</span>
        </div>
    </button>
)