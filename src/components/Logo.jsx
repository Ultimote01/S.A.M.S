export default function Logo({styleSpan1,...props}) {
    return(
        <div className={"flex"} {...props} >
             <img src="yabatech_logo.jpg" className="h-[42px] w-[42px]"/>
            <span 
            className=" text-[1.2rem] pl-2 text-zinc-950  tracking-widest font-bold   pt-[0.3rem] dark:text-white" 
             style={styleSpan1?? {}}>S.A.M.S</span>
            </div>
    )
}