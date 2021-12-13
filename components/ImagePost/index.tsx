import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import type { IPostData } from 'types/post';
import { MAX_HEIGHT } from '@constants';
import classNames from 'classnames';

const ImagePost = (props: IPostData) => {
    const {
        url_overridden_by_dest,
        title
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [src, setSrc] = useState<string | null | undefined>(null);
    const { inView, ref } = useInView();

    useEffect(() => {
        if (inView && !src) setSrc(url_overridden_by_dest);
    }, [inView, src, url_overridden_by_dest])

    const handleClick = () => setIsOpen(p => !p);

    const className = classNames(
        'rounded max-w-full max-h-full',
        {
            'fixed w-screen z-50': isOpen,
        }
    );
    
    return (
        <figure ref={ref} style={{ maxHeight: MAX_HEIGHT }} className="flex items-center justify-center">
            {src && (
                <img
                    alt={title}
                    src={src}
                    className={className}
                    onClick={handleClick}
                />
            )}
            {isOpen && <div className="bg-subtle bg-opacity-50 absolute inset-0 z-40" />}
        </figure>
    )
}

export default ImagePost;
