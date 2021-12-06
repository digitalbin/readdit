import { useEffect, useRef } from 'react';
import { InView } from 'react-intersection-observer';
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
    const ref = useRef<HTMLVideoElement | null>(null);

    const handleInview = (inView: boolean) => {
        if (ref.current) {
            if (inView) ref.current.play();
            else ref.current.pause();
        }
    }

    return (
        <InView as="div" onChange={handleInview} threshold={.8}>
            <video ref={ref} loop preload="auto" muted className="mx-auto rounded" style={{ maxHeight: 500 }} src={src} />
        </InView>
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
