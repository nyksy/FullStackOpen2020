import React from 'react'
import Part from './Part'

const Content = ({ parts }) => {

    const total = parts.reduce((s, p) => s + p.exercises, 0);

    return (
        <div>
            {parts.map((parts, i) =>
                <Part key={parts.id} parts={parts} />
            )}
            <p><b>Total of {total} exercises</b></p>
        </div>
    )
}

export default Content