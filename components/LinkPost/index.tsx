import Image from 'next/image';
import type { IPostData } from 'types/post';
import s from './style.module.css';

const LinkPost = (props: IPostData) => {
    const {
        url_overridden_by_dest,
        thumbnail,
        title,
    } = props;

    let thumb;
    try {
        thumb = new URL(thumbnail);
    } catch {}

    return (
        <a href={url_overridden_by_dest} target="_blank" rel="noreferrer">
          <span className={s.link}>{url_overridden_by_dest}</span>
          {thumb && (
              <Image
                src={thumb.toString()}
                alt={title}
                className="rounded"
                objectFit="cover"
                width={160}
                height={90}
              />
          )}
        </a>
      )
}

export default LinkPost;
