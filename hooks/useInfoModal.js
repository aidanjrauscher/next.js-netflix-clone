import {create} from "zustand" //replace with redux

const useInfoModal = create((set)=>({
    movieID: undefined,
    isOpen: false,
    openModal: (movieID)=>set({isOpen: true, movieID}),
    closeModal: ()=>set({isOpen:false, movieID: undefined})
}))

export default useInfoModal