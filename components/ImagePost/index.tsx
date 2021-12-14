import { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import type { IPostData } from 'types/post';

const ImagePost = (props: IPostData) => {
    const { url_overridden_by_dest, title, preview } = props;
    const { width, height } = preview?.images?.[0]?.source || {};
    if (!width) console.log(props);
    
    const ref = useRef<HTMLBaseElement>();
    const [inViewRef, inView] = useInView();

    const setRefs = useCallback(
        (node) => {
            ref.current = node;
            inViewRef(node);
        },
        [inViewRef],
    );

    const [src, setSrc] = useState<string | null | undefined>(null);
    const [size, setSize] = useState<number[]>([0, 0]);

    useEffect(() => {
        if (inView && !src && url_overridden_by_dest) setSrc(url_overridden_by_dest);

        if (ref.current && width && height) {
            const maxWidth = ref.current.getBoundingClientRect().width;
            const scale = maxWidth / width;
            setSize([width * scale, height * scale]);
        }

    }, [inView, src, url_overridden_by_dest, width, height]);

    return (
        <figure ref={setRefs}>
            {src ? (
                <img
                    alt={title}
                    src={src}
                    className="rounded"
                    width={size[0]}
                    height={size[1]}
                />
            ) : (
                <div
                    className="rounded bg-subtle"
                    style={{ width: size[0], height: size[1] }}
                />
            )}
        </figure>
    );
};

export default ImagePost;
