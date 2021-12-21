import { useEffect, FC } from 'react';
import Image from 'next/image';
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
            <Image src="/vollie.svg" alt="spinner" className="rounded-full" width={30} height={30} />
        </div>
    )
}

export default Spinner;
