export default function Navbar(){
    return(
        <nav className="w-full fixed z-40">
            <div className="px-4 md:px-16 py-6 flex flex-row transition duration-500 bg-zinc-900 bg-opacity-90">
                <img src="/images/logo.png" alt="Netflix logo" />
            </div>
        </nav>
    )
}