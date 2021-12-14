import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import type { IPostData } from 'types/post';
import imageDomains from '../../allowedImageDomains';

const loader = ({ src }: { src: string }) => `https://i.redd.it/${src}`;

interface IImage {
    width: number;
    height: number;
    slug: string;
}

const Gallery = (props: IPostData) => {
    const { media_metadata, title } = props;
    const ref = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<IImage[]>([]);
    
    useEffect(() => {
        if (ref.current && media_metadata) {
            const maxWidth = ref.current.getBoundingClientRect().width;
            const _imgs = Object.values(media_metadata).map(({ id, m, s }) => {
                const scale = maxWidth / s?.x;
                return {
                    slug: `${id}.${m.replace('image/', '')}`,
                    width: s?.x * scale,
                    height: s?.y * scale,
                };
            });
            setImages(_imgs);
        }
    }, [media_metadata]);

    return (
        <div ref={ref}>
            {images.map(({ slug, width, height }) => {
                return (
                    <Image
                        className="rounded"
                        alt={title}
                        key={slug}
                        src={slug}
                        width={width}
                        height={height}
                        loader={loader}
                    />
                );
            })}
        </div>
    );
};

const SingleImage = (props: IPostData) => {
    const { url_overridden_by_dest = '', title, preview } = props;
    const { width, height } = preview?.images?.[0]?.source || {};

    const url = new URL(url_overridden_by_dest);
    const allowed = imageDomains.includes(url.host);

    const ref = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState<number[]>([0, 0]);

    useEffect(() => {
        if (ref.current && width && height) {
            const maxWidth = ref.current.getBoundingClientRect().width;
            const scale = maxWidth / width;
            setSize([width * scale, height * scale]);
        }
    }, [width, height]);

    if (!allowed && process.env.NODE_ENV === 'development') {
        console.log('Image from host not optimized: ', url.host);
    }

    return (
        <div ref={ref}>
            {allowed ? (
                <Image
                    alt={title}
                    src={url.toString()}
                    className="rounded bg-subtle"
                    width={size[0]}
                    height={size[1]}
                />
            ) : (
                <img
                    alt={title}
                    src={url.toString()}
                    className="rounded bg-subtle"
                    width={size[0]}
                    height={size[1]}
                />
            )}
        </div>
    );
};

const ImagePost = (props: IPostData) => {
    return props.media_metadata ? (
        <Gallery {...props} />
    ) : (
        <SingleImage {...props} />
    );
};

export default ImagePost;
