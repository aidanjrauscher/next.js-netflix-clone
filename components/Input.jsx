

export default function Input({
    id, onChange, value, label, type
}){
    return(
        <div className="relative">
            <input 
            id={id}
            type={type}
            onChange={onChange}
            value={value}
            className="
                block
                rounded-md
                px-6
                pt-6
                pb-1
                mt-2
                w-full
                text-lg
                text-white
                bg-neutral-700
                appearance-none
                focus:outline-none
                focus:ring-0
                peer
            "
            placeholder=" "
            />
            <label htmlFor={id}
            className="
                absolute
                text-md
                text-zinc-400
                duration-150
                transform
                -translate-y-1
                scale-75
                top-4
                z-10
                origin-[0]
                left-6
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-2
            "
            >
                {label}
            </label>
        </div>
    )
}