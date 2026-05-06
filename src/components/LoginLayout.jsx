export default function LoginLayout(){
 
return(
  <section className="">
    <div className="flex flex-col">
        <div className="pb-[4rem] flex justify-start">
        </div>
        <div className="flex flex-col justify-center items-center px-2">
        <div className="flex bg-[var(--form-bg)] flex-col px-6 py-14 w-[100%] rounded-xl max-w-[30rem] border-[0.4px] border-solid border-zinc-200 dark:border-[0px] lg:px-16"
        style={{boxShadow: `var(--shadow)`}}
        >
            <div className="flex flex-col justify-center items-center">
              <img className="h-[70px] w-[70px]" src="yabatech_logo.jpg"/>
              <h1 className="mb-4 mt-2 dark:text-white">S.A.M.S</h1>
            </div>
            <div className="px-6"> 
            <hr className="dark:bg-white" />
            </div>
            <form className="mt-2">
                <div className="flex flex-col">
                  <div className="flex flex-col mt-[1.5rem]">
                    <label htmlFor="email" className="text-[1rem] dark:text-white">Email</label>
                    <input className="py-2 pl-2 border-[2.8px] border-solid  border-zinc-200 mt-[0.4rem] rounded-[5px] dark:bg-white dark:border-gray-600 dark:text-zinc-600"
                     type="text" name="email" />
                  </div>
                  <div className="flex flex-col mt-[1.5rem]">
                      <label htmlFor="password" className="text-[1rem] dark:text-white">Password</label>
                      <input  className="py-2 pl-2 border-[2.8px] border-solid  border-zinc-200 mt-[0.4rem]  mt-[0.4rem] rounded-[5px] dark:bg-white dark:border-gray-600 dark:text-zinc-600" 
                      type="text" name="password"    />
                  </div>

                  <div className="flex mt-12 lg:justify-center">
                      <button className=" w-[100%] py-2 bg-[var(--accent-bg)] text-[var(--accent)] rounded-md lg:px-10 lg:w-[inherit] ">Login</button>
                  </div>
                   
                </div>
            </form>
        </div>
        </div>
    </div>
   
    <div className="flex flex-col-reverse">
          <div className="  flex justify-end ">
            <div className={`pl-[3rem] pt-[6rem]`}></div> 
          </div>
    </div>
  </section>
)
}