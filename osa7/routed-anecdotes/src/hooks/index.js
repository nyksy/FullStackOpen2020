import { useCallback, useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const resetFields = useCallback(() =>
        setValue(''), []
    )

    return [{
        type,
        value,
        onChange,
    }, resetFields]
}
