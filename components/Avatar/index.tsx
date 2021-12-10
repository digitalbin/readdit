/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import useSWRImmutable from 'swr/immutable';
import { getSubredditIcon, getUserIcon } from '@requests/index';

interface Props {
    type: 'user' | 'subreddit';
    name?: string;
}

const reqMap = {
    user: getUserIcon,
    subreddit: getSubredditIcon,
}

const Avatar: FC<Props> = ({ type, name }) => {
    const [shouldFetch, setShouldFetch] = useState(false);
    const { inView, ref } = useInView();
    const { data: icon, error } = useSWRImmutable(shouldFetch ? name : null, reqMap[type]);
    useEffect(() => {
        if (inView && !icon && name !== '[deleted]') {
            setShouldFetch(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    if (error) console.log(error);
    const prefix = type === 'user' ? 'u' : 'r'
    return (
        <figure ref={ref} className="mr-sm w-lg h-lg bg-subtle rounded-full overflow-hidden flex-none">
            {icon && (
                <img
                    src={icon}
                    alt={`Avatar for ${prefix}/${name}`}
                />
            )}
        </figure>
    );
}

export default Avatar;