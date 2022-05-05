import { useEffect, useState } from 'react';

/**
 * Return a debounced value.
 *
 * @param value any object type that will be returned when delay is over
 * @param delay the delay in milliseconds to wait before returning the value
 * @returns the value after the delay
 */

const useDebounce = <Value>(value: Value, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
};

export default useDebounce;
