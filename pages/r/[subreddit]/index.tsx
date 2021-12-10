import type { NextPage, GetServerSideProps } from 'next';
import { fetchPageData } from '@requests/index';
import { stripData } from '@utils/index';
import PostList from '@components/PostList';
import type { IRootObject } from 'types/index';

const Subreddit: NextPage<IRootObject> = (props) => <PostList {...props} />;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { resolvedUrl } = ctx;
    const res = await fetchPageData(resolvedUrl);

    return {
        props: {
            posts: stripData(res),
        },
    };
};

export default Subreddit;
