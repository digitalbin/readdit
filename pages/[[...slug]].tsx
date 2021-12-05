/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import type { NextPage, GetServerSideProps } from 'next';
import { timeSince, kFormatter } from '@utils/index';
import ExpandableText from '@components/ExpandableText';
import VideoPost from '@components/VideoPost';
import ImagePost from '@components/ImagePost';
import LinkPost from '@components/LinkPost';
import classNames from 'classnames';
import type { IPost, IPostData } from 'types/post';
import type { IComment, ICommentData } from 'types/comment';

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

const SubredditIcons = new Map();

const Post = (props: IPostData) => {
    const {
        crosspost_parent,
        crosspost_parent_list = [],
        subreddit_name_prefixed,
        created,
        selftext,
        num_comments,
        ups,
        permalink,
        title,
        post_hint = '',
    } = props;

    const isCrosspost = Boolean(crosspost_parent);
    const [parentProps] = crosspost_parent_list;

    const postType = getPostType(post_hint);

    const [subredditIcon, setSubredditIcon] = useState(null);
    const subreddit = `/${subreddit_name_prefixed}`;

    const { inView, ref } = useInView();

    useEffect(() => {
        if (!inView) return;
        const subredditIconUrl = SubredditIcons.get(subreddit);
        if (subredditIconUrl) setSubredditIcon(subredditIconUrl);
        else {
            fetch(`https://www.reddit.com${subreddit}/about.json`)
                .then((res) => res.json())
                .then(({ data: { icon_img, community_icon } }) => {
                    const iconUrl = icon_img || community_icon;
                    const [strippedParams] = iconUrl.split('?');
                    setSubredditIcon(strippedParams);
                    SubredditIcons.set(subreddit, strippedParams);
                });
        }
    }, [inView, subreddit]);

    const timeAgo = timeSince(created);

    const comments = num_comments;
    const upvotes = kFormatter(ups);

    return (
        <article ref={ref} className="p-6">
            {isCrosspost ? (
                <>
                    <div className="text-default mb-4">
                        <Link href={subreddit}>
                            <a className="font-bold text-tiny flex items-center">
                                {subredditIcon ? (
                                    <img
                                        src={subredditIcon}
                                        alt={`Icon for ${subreddit}`}
                                        className="mr-4 w-8 h-8 bg-subtle rounded-full flex-none"
                                    />
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
                    <div className="bg-subtle rounded">
                        <Post {...parentProps} />
                    </div>
                    <div className="text-subtle text-tiny mt-6">
                        <span className="mr-4">{comments} comments</span>
                        {upvotes} upvotes
                    </div>
                </>
            ) : (
                <>
                    <div className="text-default mb-4">
                        <Link href={subreddit}>
                            <a className="font-bold text-tiny flex items-center">
                                {subredditIcon ? (
                                    <img
                                        src={subredditIcon}
                                        alt={`Icon for ${subreddit}`}
                                        className="mr-4 w-8 h-8 bg-subtle rounded-full flex-none"
                                    />
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
                            <h3
                                className={classNames({
                                    'text-tiny': isCrosspost,
                                })}
                            >
                                {title}
                            </h3>
                        </a>
                    </Link>
                    {postType === 'video' && <VideoPost {...props} />}
                    {postType === 'image' && <ImagePost {...props} />}
                    {postType === 'link' && <LinkPost {...props} />}
                    {selftext && <ExpandableText {...props} />}
                    <div className="text-subtle text-tiny mt-6">
                        <span className="mr-4">{comments} comments</span>
                        {upvotes} upvotes
                    </div>
                </>
            )}
        </article>
    );
};

interface IRootObject {
    posts: {
        data: {
            children: IPost[];
        };
    };
    comments?: {
        data: {
            children: IComment[];
        };
    };
}

const Home: NextPage<IRootObject> = (props) => {
    const { posts, comments } = props;
    const hasComments = Boolean(comments);
    const postClass = classNames('mb-6 rounded border-2', {
        'border-transparent': hasComments,
        'm-6': !hasComments,
    });
    console.log(comments);
    
    return (
        // <main className={classNames({ 'p-4': !hasComments })}>
        <main>
            {posts?.data?.children?.map((post: IPost) => (
                <section key={post.data.id} className={postClass}>
                    <Post {...post.data} />
                </section>
            ))}
            {hasComments && (
                <div className="p-4">
                    {comments?.data.children.map((comment: IComment) => (
                        <div key={comment.data.id} className="mb-6">
                            <div className="border-2 rounded-tr rounded-b p-6">
                                <p>{comment.data.body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { req, resolvedUrl } = ctx;
    const res = await fetch(`https://www.reddit.com${resolvedUrl}.json`).then(
        (res) => res.json(),
    );
    if (Array.isArray(res)) {
        return {
            props: {
                posts: res[0],
                comments: res[1],
            },
        };
    }

    return {
        props: {
            posts: res,
        },
    };
};

export default Home;
