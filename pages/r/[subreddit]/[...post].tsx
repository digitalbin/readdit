import type { NextPage, GetServerSideProps } from 'next';
import { fetchPageData } from '@requests/index';
import Comment from '@components/Comment';
import { stripData } from '@utils/index';
import type { IComment } from 'types/comment';
import type { IRootObject } from 'types/index';
import PostList from '@components/PostList';


const PostPage: NextPage<IRootObject> = (props) => {
    const { comments } = props;
    return (
        <>
            <PostList {...props} />
            <div className="bg-default p-md border border-t-0">
                {comments?.data.children.map((comment: IComment) => (
                    <ul key={comment.data.id}>
                        <Comment {...comment.data} isLast={false} />
                    </ul>
                ))}
            </div>
            </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { resolvedUrl } = ctx;
    const res = await fetchPageData(resolvedUrl);

    return {
        props: {
            posts: stripData(res[0]),
            comments: stripData(res[1]),
        },
    };
};

export default PostPage;
