
export default function Button ({children, click}: {children: string, click: any}) {

    return(
        <button onClick={click}>{children}</button>
    )
}