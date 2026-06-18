import clsx from "clsx"


export default function Spinner({className,...props}) {
return <div {...props}   className={clsx("spinner",
className,)} ></div>
}

