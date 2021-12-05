/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import type { PostData } from 'types/reddit';

const ImagePost = (props: PostData) => {
    const {
        url_overridden_by_dest,
        title
    } = props;
    
    return (
        <div className="-mx-6">
            <img
                alt={title}
                src={url_overridden_by_dest}
                width="100%"
            />
        </div>
    )
}

export default ImagePost;
