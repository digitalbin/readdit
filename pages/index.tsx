import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import type { NextPage, GetServerSideProps } from 'next';

const Home: NextPage = (props) => {
    console.log(props);
    const { data: { children } } = props;
    console.log(props);
    
    return (
      <>
        <ul>
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
        </ul>
      </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, resolvedUrl } = ctx;
  const res = await fetch(`https://www.reddit.com${resolvedUrl}.json`).then(res => res.json());
  return {
    props: res,
  }
}

export default Home;
