

const Card = ({children,onClick}) => {

    return(
        <>
            <div className="card">{children}</div>
            <button onClick={onClick}>xxxx</button>
        </>
    )

};

export default Card;