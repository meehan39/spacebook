import Icon from "./Icon"

interface props {
    page: string
}

export default ({page}: props): JSX.Element => (
    <nav className='
        h-full
        w-16
        border-r-4
        border-black
    '>
        <Icon page='home' />
        <Icon page='notifications' />
        <Icon page='messages' />
        <Icon page='profile' />
        <Icon page='settings' />
    </nav>
)