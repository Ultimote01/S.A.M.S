import { Dialog } from "./dialog";

export default function DeleteLectureLayout({children, isModalOpen}) {
    return(
        <Dialog open={isModalOpen} onClose={()=> {}}
            isModifyBackdropDiv={true}
            extraDialogStyle={`p-0 bg-[transparent]`}>
                
                <div className="flex flex-col  p-2 rounded-[7px] bg-[var(--form-bg)] ">
               <div className="flex flex-col">
                {children}
               </div>
               </div>
        </Dialog>
    )
}