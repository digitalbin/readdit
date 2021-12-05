/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image';
import type { PostData } from 'types/reddit';
import s from './style.module.css';

const LinkPost = (props: PostData) => {
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
        <a href={url_overridden_by_dest}>
          <span className={s.link}>{url_overridden_by_dest}</span>
          {thumb && (
              <img
                src={thumb.toString()}
                alt={title}
                width={144}
                height={100}
                className="object-cover border rounded w-64 h-40"
              />
          )}
        </a>
      )
}

export default LinkPost;
