/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image';
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
        <a href={url_overridden_by_dest}>
          <span className={s.link}>{url_overridden_by_dest}</span>
          {thumb && (
              <img
                src={thumb.toString()}
                alt={title}
                className="object-cover border rounded w-160 h-90"
              />
          )}
        </a>
      )
}

export default LinkPost;
