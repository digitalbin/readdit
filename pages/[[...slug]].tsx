/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import type { NextPage, GetServerSideProps } from 'next';
import { fetchPageData } from '@requests/index';
import Post from '@components/Post';
import Comment from '@components/Comment';
import Spinner from '@components/Spinner';
import { stripData } from '@utils/index';
import type { IPost } from 'types/post';
import type { IComment } from 'types/comment';

interface IRootObject {
    posts: {
        data: {
            after: string;
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
    const { comments } = props;
    const [after, setAfter] = useState(props.posts.data.after);
    const [posts, setPosts] = useState(props?.posts?.data?.children);
    const [isLoading, setIsLoading] = useState(false);
    const { asPath } = useRouter();
    const hasComments = Boolean(comments);

    useEffect(() => {
        setPosts(props?.posts?.data?.children);
    }, [props?.posts?.data?.children]);
    

    const cbFetch = useCallback(() => fetchPageData(asPath, after), [asPath, after]);

    const fetchData = () => {
        if (!isLoading) {
            setIsLoading(true);
            cbFetch()
                .then(res => {
                    setAfter(res.data.after);
                    setPosts(pp => pp.concat(res.data.children));
                })
                .finally(() => setIsLoading(false));
        }
    }
    
    return (
        <main>
            {posts.map((post: IPost) => {
                return (
                    <section key={post.data.id} className="border border-t-0">
                        <Post {...post.data} />
                    </section>
                )
            })}
            {hasComments ? (
                <div className="p-sm">
                    {comments?.data.children.map((comment: IComment) => (
                        <ul key={comment.data.id}>
                            <Comment {...comment.data} isLast={true} />
                        </ul>
                    ))}
                </div>
            ) : (
                <Spinner onInView={fetchData} />
            )}
        </main>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { resolvedUrl } = ctx;
    const res = await fetchPageData(resolvedUrl);
    console.log('*******************', resolvedUrl);
    
    if (Array.isArray(res)) {
        return {
            props: {
                posts: stripData(res[0]),
                comments: stripData(res[1]),
            },
        };
    }

    return {
        props: {
            posts: stripData(res),
        },
    };
};

export default Home;
