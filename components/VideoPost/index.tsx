import { SyntheticEvent, useEffect, useState, useRef } from 'react';
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
        <iframe
            src={src}
            width={width}
            height={height}
        />
    </div>
);

const Video = ({ src }: { src: string }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const { ref, inView } = useInView({ threshold: .8 });
    const [isReady, setIsReady] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) videoRef.current.play();
            else videoRef.current.pause();
        }
    }

    const handleLoad = (e: SyntheticEvent<HTMLVideoElement>) => {
        setIsReady(true);
    }

    useEffect(() => {
        if (inView && isReady) videoRef?.current?.play();
        else videoRef?.current?.pause();
    }, [inView, isReady]);

    return (
        <div ref={ref} onClick={togglePlay}>
            <video onCanPlay={handleLoad} ref={videoRef} loop playsInline preload="auto" muted className="mx-auto rounded" style={{ maxHeight: 500 }} src={src} />
        </div>
    );
};

const VideoPost = (props: IPostData) => {
    const { media, preview, secure_media_embed } = props;

    const videoUrl =
        media?.reddit_video?.fallback_url ||
        preview?.reddit_video_preview?.fallback_url;
    const iframe = secure_media_embed?.media_domain_url;
    const width = secure_media_embed?.width;
    const height = secure_media_embed?.height;
    
    return (
        <div className="rounded">
            {videoUrl ? (
                <Video src={videoUrl} />
            ) : iframe ? (
                <Iframe src={iframe} width={width} height={height} />
            ) : null}
        </div>
    );
};

export default VideoPost;
