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
          {thumb ? (
              <img
                src={thumb.toString()}
                alt={title}
                width={160}
                height={100}
                className="object-cover rounded w-64 h-40"
              />
          ) : (
              <div className="rounded w-64 h-40 border bg-subtle flex justify-center items-center">
                <svg
                    className="w-16"
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"></path><path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                </svg>
              </div>
          )}
        </a>
      )
}

export default LinkPost;
