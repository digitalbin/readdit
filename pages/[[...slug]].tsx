/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import classnames from 'classnames';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import type { NextPage, GetServerSideProps } from 'next';
import { timeSince, kFormatter } from '@utils/index';
import type { IPost, PostData } from 'types/reddit';
import ExpandableText from '@components/ExpandableText';
import VideoPost from '@components/VideoPost';
import ImagePost from '@components/ImagePost';
import LinkPost from '@components/LinkPost';

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
        crosspost_parent,
        crosspost_parent_list = [],
        subreddit_name_prefixed,
        created,
        selftext,
        num_comments,
        ups,
        id,
        permalink,
        title,
        post_hint = '',
    } = props;

    const isCrosspost = Boolean(crosspost_parent);
    const [parentProps] = crosspost_parent_list;

    const postType = getPostType(post_hint);

    const [subredditIcon, setSubredditIcon] = useState(null);
    const subreddit = `/${subreddit_name_prefixed}`;

    // TODO: dont fetch duplicate icons!!!!!!!!! förväntas av alla som jag känner helst igår!!!!!
    useEffect(() => {
        fetch(`https://www.reddit.com${subreddit}/about.json`)
            .then((res) => res.json())
            .then(({ data: { icon_img, community_icon } }) => {
              const iconUrl = icon_img || community_icon;
              const [strippedParams] = iconUrl.split('?')
              setSubredditIcon(strippedParams)
            });
    }, []);

    const timeAgo = timeSince(created);

    const comments = num_comments;
    const upvotes = kFormatter(ups);

    return isCrosspost ? (
        <>
            <div className="flex items-center justify-between px-6 pt-4 pb-6 border border-b-0 rounded-t -mb-2">
                <h3 className="text-default text-subtle">{title}</h3>
                <span className="text-subtle flex items-center">
                    {subreddit_name_prefixed}
                    <svg
                        className="w-7 h-7 ml-2"
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        version="1"
                        viewBox="0 0 48 48"
                        enableBackground="new 0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g fill="currentColor">
                            <path d="M13,13c0-3.3,2.7-6,6-6h10c3.3,0,6,2.7,6,6h4c0-5.5-4.5-10-10-10H19C13.5,3,9,7.5,9,13v11.2h4V13z"></path>
                            <polygon points="4.6,22 11,30.4 17.4,22"></polygon>
                        </g>
                        <g fill="currentColor">
                            <path d="M35,35c0,3.3-2.7,6-6,6H19c-3.3,0-6-2.7-6-6H9c0,5.5,4.5,10,10,10h10c5.5,0,10-4.5,10-10V23h-4V35z"></path>
                            <polygon points="30.6,26 37,17.6 43.4,26"></polygon>
                        </g>
                    </svg>
                </span>
            </div>
            <Post {...parentProps} />
        </>
    ) : (
        <div key={id} className="p-6 mb-6 border border-default rounded">
            <div className="text-default mb-4">
                <Link href={subreddit}>
                    <a className="font-bold flex items-center">
                        {subredditIcon ? (
                          <img src={subredditIcon} alt={`Icon for ${subreddit}`} className="mr-4 w-8 h-8 bg-subtle rounded-full flex-none" />
                        ) : (
                          <span className="mr-4 w-8 h-8 bg-subtle rounded-full flex-none" />
                        )}
                        <span className="overflow-ellipsis overflow-hidden">
                            {subreddit_name_prefixed}
                        </span>
                        <span className="text-subtle font-regular flex-1 whitespace-nowrap">
                            &nbsp;•&nbsp;{timeAgo}
                        </span>
                    </a>
                </Link>
            </div>
            <Link href={permalink}>
                <a className="mb-6 block">
                    <h3>{title}</h3>
                </a>
            </Link>
            {postType === 'video' && <VideoPost {...props} />}
            {postType === 'image' && <ImagePost {...props} />}
            {postType === 'link' && <LinkPost {...props} />}
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
