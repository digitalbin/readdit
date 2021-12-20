import { FC, useEffect, useState, useRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import type { IPostData } from 'types/post';
import VideoPlayer from '@components/Video';
import { MAX_HEIGHT } from '@constants';
import s from './style.module.css';
import useScaleSize from '@hooks/useScaleSize';

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
    width?: number;
    height?: number;
}

interface IVideo extends VProps {
    fallback_url: string;
    dash_url: string;
    hls_url: string;
}

const Video: FC<IVideo> = (props) => {
    const { dash_url, hls_url, fallback_url, width, height } = props;
    return (
        <VideoPlayer
            width={width}
            height={height}
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
    );
};

interface IYouTube extends VProps {
    src: string;
}

const YouTubeVideo: FC<IYouTube> = (props) => {
    const { width, height, src } = props;
    return (
        <VideoPlayer
            width={width}
            height={height}
            sources={[{
                type: 'video/youtube',
                src
            }]}
        />
    )
}

const VideoPost = (props: IPostData) => {
    const { media, preview, secure_media_embed, url_overridden_by_dest, thumbnail } = props;
    
    const videoProps = media?.reddit_video || preview?.reddit_video_preview;
    const isYoutube = media?.type?.includes('youtube.com') && url_overridden_by_dest;
    const iframe = secure_media_embed?.media_domain_url;
    const width = secure_media_embed?.width;
    const height = secure_media_embed?.height;
    
    return (
        <>
            {videoProps ? (
                <Video {...videoProps} />
            ) : isYoutube ? (
                <YouTubeVideo {...media?.oembed} src={url_overridden_by_dest} />
            ) : iframe ? (
                <Iframe src={iframe} width={width} height={height} />
            ) : null}
        </>
    );
};

export default VideoPost;
