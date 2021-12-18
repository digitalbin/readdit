import { FC, useEffect, useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import type { IPostData } from 'types/post';
import VideoPlayer from '@components/Video';
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
    dash_url: string;
    hls_url: string;
    width: number;
    height: number;
}

const Video: FC<VProps> = (props) => {
    const { dash_url, hls_url, fallback_url, width, height } = props;
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [size, setSize] = useState([0, 0]);

    useEffect(() => {
        const cSize = containerRef.current?.getBoundingClientRect();
        if (cSize) {
            const scale = Math.min(MAX_HEIGHT / height, cSize?.width / width);
            setSize([width * scale, height * scale]);
        }
    }, [height, width]);

    return (
        <div ref={containerRef}>
            <VideoPlayer
                width={size[0]}
                height={size[1]}
                sources={[
                    {
                        src: dash_url,
                        type: 'application/dash+xml'
                    },
                    {
                        src: hls_url,
                        type: 'application/x-mpegURL'
                    },
                    {
                        src: fallback_url,
                        type: 'video/mp4'
                    }
                ]}
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
