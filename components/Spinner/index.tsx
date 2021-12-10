/* eslint-disable @next/next/no-img-element */
import { useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
    onInView: () => void;
}

const Spinner: FC<Props> = ({ onInView }) => {
    const { inView, ref } = useInView();
    useEffect(() => {
        if (inView && onInView) {
            onInView();
        }
    }, [inView, onInView]);
    return (
        <div ref={ref} className="flex justify-center p-90">
            <img src="/vollie.svg" alt="spinner" className="rounded-full w-xl h-xl" />
        </div>
    )
}

export default Spinner;
