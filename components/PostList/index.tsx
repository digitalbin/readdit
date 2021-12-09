import { FC, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Post from '@components/Post';
import Spinner from '@components/Spinner';
import { fetchPageData } from '@requests/index';
import type { IRootObject } from 'types/index';
import type { IPost } from 'types/post';

const PostList: FC<IRootObject> = (props) => {
    const [after, setAfter] = useState(props.posts.data.after);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { asPath } = useRouter();

    useEffect(() => {
        setPosts(props?.posts?.data?.children);
    }, [props?.posts?.data?.children]);

    const cbFetch = useCallback(
        () => fetchPageData(asPath, after),
        [asPath, after],
    );

    const fetchData = () => {
        if (!isLoading) {
            setIsLoading(true);
            cbFetch()
                .then((res) => {
                    setAfter(res.data.after);
                    setPosts((pp) => pp.concat(res.data.children));
                })
                .finally(() => setIsLoading(false));
        }
    };

    return (
        <>
            {posts?.map((post: IPost) => {
                return (
                    <section key={post.data.id} className="border border-t-0">
                        <Post {...post.data} />
                    </section>
                );
            })}
            {after && <Spinner onInView={fetchData} />}
        </>
    );
};

export default PostList;