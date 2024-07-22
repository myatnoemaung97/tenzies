import { useState } from "react";

export default function Test() {
    const [count, setCount] = useState(0);
    const [allowed, setAllowed] = useState(true);

    const handleClick = () => {
        increment();
        setAllowed(false);
        decrement();
    }

    const increment = () => {
        if (allowed) {
            setCount(prevCount => prevCount + 1);
            setCount(prevCount => prevCount + 1);
            setCount(prevCount => prevCount + 1);
        }
    }

    const decrement = () => {
        if (allowed) {
            setCount(prevCount => prevCount - 1);
        }
    }

    return (
        <>
            <p>{count}</p>
            <button onClick={handleClick}>+</button>
        </>
    )
}