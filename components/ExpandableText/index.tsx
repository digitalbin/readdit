import { useState } from 'react';
import classnames from 'classnames';
import s from './style.module.css';

const ExpandableText = ({ selftext }: { selftext: string }) => {
    const [expanded, setExpanded] = useState(false);
    const className = classnames(s.wrapper, {
        [s.open]: expanded,
    });

    const handleExpand = () => {
        setExpanded((pe) => !pe);
    };

    const paragraphs = selftext.split('\n');

    return (
        <div className={className} onClick={handleExpand}>
            {paragraphs.map((p: string, i: number) => (
                <p className="mb-sm text-subtle" key={i}>
                    {p}
                </p>
            ))}
            <span className={s.expand}>Expand +</span>
        </div>
    );
};

export default ExpandableText;
