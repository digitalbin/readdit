import { FC, useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import type { IPostData } from 'types/post';
import s from './style.module.css';

const Iframe = ({
    src,
    width,
    height,
}: {
    src: string;
    width?: number;
    height?: number;
}) => (
    <div className={s.iframeWrapper}>
        <iframe src={src} width={width} height={height} />
    </div>
);

interface VProps {
    fallback_url: string;
    width: number;
    height: number;
}

const Video: FC<VProps> = (props) => {
    const { fallback_url, width, height } = props;
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { ref: inViewRef, inView } = useInView({ threshold: 0.8 });
    const [visited, setVisited] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) videoRef.current.play();
            else videoRef.current.pause();
        }
    };

    useEffect(() => {
        if (videoRef.current) {
            if (inView) {
                if (!visited) {
                    videoRef.current.load();
                    setVisited(true);
                }
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [inView, visited]);

    const [scale, setScale] = useState(1);
    const maxHeight = 500;

    useEffect(() => {
        const cSize = containerRef.current?.getBoundingClientRect();
        if (cSize) setScale(Math.min(maxHeight / height, cSize?.width / width));
    }, [height, width]);

    return (
        <div ref={inViewRef}>
            <div ref={containerRef}>
                <video
                    onClick={togglePlay}
                    ref={videoRef}
                    loop
                    playsInline
                    preload="none"
                    muted
                    style={{ width: width * scale, height: height * scale }}
                    className="mx-auto rounded bg-subtle"
                    src={fallback_url}
                />
            </div>
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
        <div className="rounded">
            {videoProps ? (
                <Video {...videoProps} />
            ) : iframe ? (
                <Iframe src={iframe} width={width} height={height} />
            ) : null}
        </div>
    );
};

export default VideoPost;
