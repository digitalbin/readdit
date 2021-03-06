import he from 'he';
import Link from 'next/link';
import { timeSince, kFormatter } from '@utils/index';
import ExpandableText from '@components/ExpandableText';
import VideoPost from '@components/VideoPost';
import ImagePost from '@components/ImagePost';
import LinkPost from '@components/LinkPost';
import Avatar from '@components/Avatar';
import type { IPostData } from 'types/post';

function getPostType(props: IPostData) {
    const { post_hint, media_metadata } = props;
    switch (post_hint) {
        case 'image':
        case 'link':
            return post_hint;
        case 'rich:video':
        case 'hosted:video':
            return 'video';
        default: {
            if (media_metadata) return 'image';
            return null;
        }
    }
}

const Post = (props: IPostData) => {
    const {
        crosspost_parent,
        crosspost_parent_list = [],
        subreddit_name_prefixed,
        subreddit,
        created,
        selftext,
        num_comments,
        ups,
        permalink,
        title,
    } = props;
    
    const decodedTitle = he.decode(title);

    const isCrosspost = Boolean(crosspost_parent);
    const [parentProps] = crosspost_parent_list;

    const postType = getPostType(props);

    const timeAgo = timeSince(created);

    const comments = num_comments;
    const upvotes = kFormatter(ups);

    const subredditLink = `/${subreddit_name_prefixed}`

    return (
        <article className="p-md bg-default">
            {isCrosspost ? (
                <>
                    <div className="text-default mb-xs">
                        <Link href={subredditLink}>
                            <a className="font-bold text-tiny flex items-center">
                                <Avatar type="subreddit" name={subreddit} />
                                <span className="overflow-ellipsis overflow-hidden">
                                    {subreddit_name_prefixed}
                                </span>
                                <span className="text-subtle font-regular flex-1 whitespace-nowrap">
                                    &nbsp;???&nbsp;{timeAgo}
                                </span>
                            </a>
                        </Link>
                    </div>
                    <Link href={permalink}>
                        <a className="mb-md block">
                            <h3 className="break-words">{decodedTitle}</h3>
                        </a>
                    </Link>
                    <div className="bg-subtle">
                        <Post {...parentProps} />
                    </div>
                    <div className="text-subtle text-tiny mt-md">
                        <span className="mr-sm">{comments} comments</span>
                        {upvotes} upvotes
                    </div>
                </>
            ) : (
                <>
                    <div className="text-default mb-xs">
                        <Link href={subredditLink}>
                            <a className="font-bold text-tiny flex items-center">
                                <Avatar type="subreddit" name={subreddit} />
                                <span className="overflow-ellipsis overflow-hidden">
                                    {subreddit_name_prefixed}
                                </span>
                                <span className="text-subtle font-regular flex-1 whitespace-nowrap">
                                    &nbsp;???&nbsp;{timeAgo}
                                </span>
                            </a>
                        </Link>
                    </div>
                    <Link href={permalink}>
                        <a className="mb-md block">
                            <h3 className="text-default break-words">{decodedTitle}</h3>
                        </a>
                    </Link>
                    {postType === 'video' && <VideoPost {...props} />}
                    {postType === 'image' && <ImagePost {...props} />}
                    {postType === 'link' && <LinkPost {...props} />}
                    {selftext && <ExpandableText {...props} />}
                    <Link href={permalink}>
                        <a className="text-subtle text-tiny mt-md block">
                            <span className="mr-sm">{comments} comments</span>
                            {upvotes} upvotes
                        </a>
                    </Link>
                </>
            )}
        </article>
    );
};

export default Post;
