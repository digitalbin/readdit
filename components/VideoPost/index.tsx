import { FC, useEffect, useState, useRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import type { IPostData } from 'types/post';
import { MAX_HEIGHT } from '@constants';
import s from './style.module.css';

const Iframe = ({
    src,
    width,
    height,
}: {
    src: string;
    width?: number;
    height?: number;
}) => {
    const { ref, inView } = useInView({ triggerOnce: true });
    return (
        <div className={s.iframeWrapper} ref={ref}>
            {inView && <iframe src={src} width={width} height={height} />}
        </div>
    )
};

interface VProps {
    fallback_url: string;
    width: number;
    height: number;
}

const Video: FC<VProps> = (props) => {
    const { fallback_url, width, height } = props;
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [loadInViewRef, shouldLoad] = useInView({ triggerOnce: true, threshold: 0 });
    const [inViewRef, inView] = useInView({ threshold: 0.8 });

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) videoRef.current.play();
            else videoRef.current.pause();
        }
    };

    const refs = useCallback((node) => {
        containerRef.current = node;
        loadInViewRef(node)
        inViewRef(node)
    }, [inViewRef, loadInViewRef]);

    useEffect(() => {
        if (videoRef.current) {
            if (inView && videoRef.current.readyState > 0) videoRef.current.play().catch((err) => { console.log(err) });
            else videoRef.current.pause();
        }
    }, [inView, videoRef?.current?.readyState])

    useEffect(() => {
        if (videoRef.current && shouldLoad) videoRef.current.load();
    }, [shouldLoad]);

    const [size, setSize] = useState([0, 0]);

    useEffect(() => {
        const cSize = containerRef.current?.getBoundingClientRect();
        if (cSize) {
            const scale = Math.min(MAX_HEIGHT / height, cSize?.width / width);
            setSize([width * scale, height * scale]);
        }
    }, [height, width]);

    return (
        <div ref={refs}>
            <video
                onClick={togglePlay}
                ref={videoRef}
                loop
                playsInline
                preload="none"
                muted
                style={{ width: size[0], height: size[1] }}
                className="mx-auto rounded bg-subtle"
                src={fallback_url}
            />
        </div>
    );
};

const VideoPost = (props: IPostData) => {
    const { media, preview, secure_media_embed, thumbnail } = props;

    const videoProps = media?.reddit_video || preview?.reddit_video_preview;
    const iframe = secure_media_embed?.media_domain_url;
    const width = secure_media_embed?.width;
    const height = secure_media_embed?.height;

    return (
        <>
            {videoProps ? (
                <Video {...videoProps} />
            ) : iframe ? (
                <Iframe src={iframe} width={width} height={height} />
            ) : null}
        </>
    );
};

export default VideoPost;
