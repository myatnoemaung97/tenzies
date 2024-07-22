export default function(props) {
    return (
        <>
            <h1>Choose Game</h1>
            <div className="d-flex justify-content-around">
                <button onClick={props.chooseGame} className="btn btn-primary">Tenzies</button>
                <button onClick={props.chooseGame} className="btn btn-primary">Quiz</button>
            </div>
        </>
    )
}