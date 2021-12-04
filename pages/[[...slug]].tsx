import { useEffect, useState } from 'react';
import classnames from 'classnames';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import type { NextPage, GetServerSideProps } from 'next';
import { timeSince, kFormatter } from '@utils';
import type { IPost, PostData } from '@types/global';
import ExpandableText from '@components/ExpandableText';
import Video from '@components/Video';

const postTypes = {
    'rich:video': 'video',
    'hosted:video': 'video',
    link: 'link',
    image: 'image',
};

function getPostType(hint: string) {
    switch (hint) {
        case 'image':
        case 'link':
            return hint;
        case 'rich:video':
        case 'hosted:video':
            return 'video';
        default:
            return null;
    }
}

const Post = (props: PostData) => {
    const {
        subreddit_name_prefixed,
        created,
        selftext,
        num_comments,
        ups,
        id,
        permalink,
        title,
        thumbnail,
        post_hint = '',
        url_overridden_by_dest,
    } = props;

    const postType = getPostType(post_hint);

    // const [subredditIcon, setSubredditIcon] = useState(null);
    // useEffect(() => {
    //   const res = fetch(`https://www.reddit.com${subreddit}/about.json`)
    //     .then(res => res.json())
    //     .then(json => console.log(json));
    // }, [subreddit]);
    const subreddit = `/${subreddit_name_prefixed}`;
    const timeAgo = timeSince(created);

    const comments = num_comments;
    const upvotes = kFormatter(ups);

    return (
        <div key={id} className="p-6 mb-6 border border-default rounded">
            <div className="text-default mb-4">
                <Link href={subreddit}>
                    <a className="font-bold flex items-center">
                        <span className="mr-4 w-8 h-8 bg-subtle rounded-full flex-shrink-0" />
                        {subreddit_name_prefixed}
                        <span className="text-subtle font-regular">
                            &nbsp;• Posted {timeAgo}
                        </span>
                    </a>
                </Link>
            </div>
            <Link href={permalink}>
                <a className="mb-6 block">
                    <h3>{title}</h3>
                </a>
            </Link>
            {postType === 'video' && <Video {...props} />}
            {postType === 'image' && (
                <div className="-mx-6">
                    <img
                        alt={title}
                        src={url_overridden_by_dest}
                        width="100%"
                    />
                </div>
            )}
            {selftext && <ExpandableText {...props} />}
            <div className="text-subtle mt-6">
                <span className="mr-4">{comments} comments</span>
                {upvotes} upvotes
            </div>
        </div>
    );
};

interface IProps {
    kind: string;
    data: {
        children: IPost[];
    };
}

const Home: NextPage<IProps> = (props) => {
    return (
        <main className="p-4">
            {props.kind === 'Listing' &&
                props.data.children.map((post: IPost) => (
                    <Post key={post.data.id} {...post.data} />
                ))}
            {/* <h2>{title}</h2>
          <img src={url} /> */}
            {/* <ul>
          {children.map(child => {
            const {
              data,
              data: {
                title,
                preview,
                thumbnail,
                id,
                permalink
              }
            } = child;
            console.log(data);
            
            return (
              <li key={id} style={{
                marginBottom: 16,
              }}>
                <Link href={permalink}>
                  <a style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <span>{title}</span>
                  <img src={thumbnail} />
                  </a>
                </Link>
              </li>
            )
          })}
        </ul> */}
        </main>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { req, resolvedUrl } = ctx;
    const res = await fetch(`https://www.reddit.com${resolvedUrl}.json`).then(
        (res) => res.json(),
    );
    return {
        props: res,
    };
};

export default Home;
