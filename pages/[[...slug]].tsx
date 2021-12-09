/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import type { NextPage, GetServerSideProps } from 'next';
import { fetchPageData } from '@requests/index';
import Post from '@components/Post';
import Comment from '@components/Comment';
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
    const { inView, ref } = useInView({ threshold: .8 });
    const hasComments = Boolean(comments);

    useEffect(() => {
        setPosts(props?.posts?.data?.children);
    }, [props?.posts?.data?.children]);
    

    const cbFetch = useCallback(() => fetchPageData(asPath, after), [asPath, after]);

    useEffect(() => {
        if (inView && !isLoading) {
            setIsLoading(true);
            cbFetch()
                .then(res => {
                    setAfter(res.data.after);
                    setPosts(pp => pp.concat(res.data.children));
                })
                .finally(() => setIsLoading(false));
        }
    }, [cbFetch, inView, isLoading])
    
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
                <div className="p-md bg-default border border-t-0">
                    {comments?.data.children.map((comment: IComment) => (
                        <ul key={comment.data.id}>
                            <Comment {...comment.data} isLast={true} />
                        </ul>
                    ))}
                </div>
            ) : (
                <div ref={ref} className="flex justify-center">
                    <img src="/spinner.gif" alt="spinner" className="rounded-full" />
                </div>
            )}
        </main>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { resolvedUrl } = ctx;
    const res = await fetchPageData(resolvedUrl);
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
