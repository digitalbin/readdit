/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import type { IPostData } from 'types/post';

const ImagePost = (props: IPostData) => {
    const {
        url_overridden_by_dest,
        title
    } = props;

    const [src, setSrc] = useState<string | null | undefined>(null);
    const { inView, ref } = useInView();

    useEffect(() => {
        if (inView && !src) setSrc(url_overridden_by_dest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView])
    
    return (
        <figure ref={ref}>
            {src && (
                <img
                    alt={title}
                    src={url_overridden_by_dest}
                    width="100%"
                    className="rounded"
                />
            )}
        </figure>
    )
}

export default ImagePost;
