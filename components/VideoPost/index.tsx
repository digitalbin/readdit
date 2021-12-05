import { useEffect, useRef } from 'react';
import { InView } from 'react-intersection-observer';
import type { PostData } from 'types/reddit';
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
            <video ref={ref} loop preload="auto" muted className="mx-auto" style={{maxHeight: "500px"}} src={src} />
        </InView>
    );
};

const VideoPost = (props: PostData) => {
    const { media, preview, secure_media_embed, url_overridden_by_dest } = props;

    const videoUrl =
        media?.reddit_video?.fallback_url ||
        preview?.reddit_video_preview?.fallback_url;
    const iframe = secure_media_embed?.media_domain_url;
    const width = secure_media_embed?.width;
    const height = secure_media_embed?.height;
    
    return (
        <div className="-mx-6 rounded">
            {videoUrl ? (
                <Video src={videoUrl} />
            ) : iframe ? (
                <Iframe src={iframe} width={width} height={height} />
            ) : null}
        </div>
    );
};

export default VideoPost;
