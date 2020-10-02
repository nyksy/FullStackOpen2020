import React from 'react'
import Name from './Name'


const NameRenderer = ({ persons, filter }) => {

    const namesToShow = persons.filter(
        name => name.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            {namesToShow.map((name) =>
                <Name key={name.name} name={name} />
            )}
        </div>
    )
}

export default NameRenderer