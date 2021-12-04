import type { IPost, PostData } from '@types/global';

const Video = (props: PostData) => {
    const {
        media,
        preview,
        secure_media_embed
    } = props;

    const iframe = secure_media_embed?.media_domain_url;
    const content = secure_media_embed?.content;
    const width = secure_media_embed?.width;
    const height = secure_media_embed?.height;
    
    return (
        <div className="-mx-6">
            {iframe ? (
                <iframe
                    src={iframe}
                    className="overflow-hidden"
                    width={width}
                    height={height}
                />
            ) : (
                <video
                    preload="auto"
                    muted
                    autoPlay
                    src={media?.reddit_video?.fallback_url || preview?.reddit_video_preview?.fallback_url}
                />
            ) }
        </div>
    )
}

export default Video;
