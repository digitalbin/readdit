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
        if (inView && !src && url_overridden_by_dest) setSrc(url_overridden_by_dest);
    }, [inView, src, url_overridden_by_dest])

    return (
        <figure ref={ref}>
            {src && (
                <img
                    alt={title}
                    src={src}
                    width="100%"
                    className="rounded"
                />
            )}
        </figure>
    )
}

export default ImagePost;
