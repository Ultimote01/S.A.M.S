export default function LoginLayout( {children}){
return(
  <section className="h-[100svh]">
    <div className="h-[80%] flex flex-col">
        <div className="pb-[8rem] flex justify-start">
          <div>Linear Image</div>
        </div>
        <div></div>
    </div>
   
    <div className=" h-[20%] flex flex-col-reverse">
          <div className=" pt-[1rem] flex justify-end"
          >Linear Image
          </div>
    </div>
  </section>
)
}