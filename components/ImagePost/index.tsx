/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import type { IPostData } from 'types/post';

const ImagePost = (props: IPostData) => {
    const {
        url_overridden_by_dest,
        title
    } = props;
    
    return (
            <img
                alt={title}
                src={url_overridden_by_dest}
                width="100%"
                className="rounded"
            />
    )
}

export default ImagePost;
