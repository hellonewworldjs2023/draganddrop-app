

const Card = ({children,onClick}) => {



    return(
        <>
            <div className="card">{children}</div>
            <button onClick={onClick}>　x　</button>
        </>
    )

};

export default Card;