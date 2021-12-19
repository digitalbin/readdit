import { FC, useEffect, useState, BaseSyntheticEvent } from 'react';
import s from './style.module.css';

interface IProps {
    value: number;
    onChangeEnd: (n: number) => void;
}

const Scrubber: FC<IProps> = (props) => {
    const [value, setValue] = useState(0);
    const [isScrubbing, setIsScrubbing] = useState(false);

    const handleChange = (e: BaseSyntheticEvent) => {
        setValue(e.target.value);
    };

    const handlePointer = (e: BaseSyntheticEvent) => {
        const { type, target } = e;
        if (type === 'pointerdown') setIsScrubbing(true);
        else {
            setIsScrubbing(false);
            props.onChangeEnd(target.value);
        }
    }

    useEffect(() => {
        if (!isScrubbing) setValue(props.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value]);

    return (
        <div className="flex-1 flex items-center relative">
            <progress
                value={value}
                className={s.progressBar}
            />
            <input
                className={s.scrubber}
                onChange={handleChange}
                onPointerDown={handlePointer}
                onPointerUp={handlePointer}
                value={value}
                type="range"
                min="0"
                max="1"
                step="0.01"
            />
        </div>
    )
}

export default Scrubber;