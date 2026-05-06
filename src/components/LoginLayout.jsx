export default function LoginLayout(){
 
return(
  <section className="h-[100%] flex flex-col justify-between gap-y-16">
    <div className="flex flex-col ">
        <div className="mt-16 flex flex-col justify-center items-center px-3.5">
        <div className="flex bg-[var(--form-bg)] flex-col px-4 py-14 w-[100%] rounded-xl max-w-[30rem] border-[0.4px] border-solid border-zinc-200 dark:border-[0px] lg:px-16"
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
                    <label htmlFor="email" className="font-semibold text-[1rem] dark:text-white">Email</label>
                    <input className="py-2 pl-2 border-[2.8px] border-solid  border-zinc-200 mt-[0.4rem] rounded-[5px] dark:bg-zinc-100 dark:border-gray-600 dark:text-zinc-600"
                     type="text" name="email" placeholder="jhondoe@example.com" />
                  </div>
                  <div className="flex flex-col mt-[1.5rem]">
                      <label htmlFor="password" className=" font-semibold text-[1rem] dark:text-white">Password</label>
                      <input  className="py-2 pl-2 border-[2.8px] border-solid  border-zinc-200 mt-[0.4rem]  mt-[0.4rem] rounded-[5px] dark:bg-zinc-100 dark:border-gray-600 dark:text-zinc-600" 
                      type="text" name="password"  placeholder="********"  />
                  </div>

                  <div className="flex mt-12 lg:justify-center">
                      <button className=" w-[100%] py-3 bg-[var(--accent-bg)] text-[var(--accent)] rounded-md lg:px-10 lg:w-[inherit] ">Login</button>
                  </div>
                   
                </div>
            </form>
        </div>
        </div>
    </div>
   
    <div className="text-balck  text-[1rem] leading-[1.5rem] dark:text-white ">
          <div className="  flex justify-center text-center py-4 mx-4  md:mx-16">
          <span className=" flex gap-x-1.5 md:gap-x-4"> &copy; 2026 Yabatech. All rights reserved<i></i>
          <a href="/login">Terms of use</a>
          <i></i>
          <a href="/login">Privacy Policy</a>
          </span>
          </div>
    </div>
  </section>
)
}