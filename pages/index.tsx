import type { NextPage, GetServerSideProps } from 'next';
import PostList from '@components/PostList';
import { fetchPageData } from '@requests/index';
import { stripData } from '@utils/index';
import type { IRootObject } from 'types/index';

const Home: NextPage<IRootObject> = (props) => <PostList {...props} />;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const res = await fetchPageData();
    return {
        props: {
            posts: stripData(res),
        },
    };
};

export default Home;
