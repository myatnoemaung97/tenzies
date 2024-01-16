import React from "react";
import cn from 'classnames';
import { nanoid } from "nanoid";


export default function ({ die, hold }) {

    let dots = '';

    switch (die.value) {
        case 1:
            dots = '--dots-one';
            break;
        case 2:
            dots = '--dots-two';
            break;
        case 3:
            dots = '--dots-three';
            break;
        case 4:
            dots = '--dots-four';
            break;
        case 5:
            dots = '--dots-five';
            break;
        case 6:
            dots = '--dots-six';
            break;
    }

    const dotElements = [];
    for (let i = 0; i < die.value; i++) {
        dotElements.push(<div className="--dot" key={ nanoid() }></div>)
    }

    return (
        <button onClick={hold} className={cn('--die border-0 shadow', die.isHeld && 'bg-success')}>
            <div className={dots}>
                {dotElements}
            </div>
        </button>
    )
}