/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
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
    const attemptFetch = name !== '[deleted]';
    const { data: icon, error } = useSWRImmutable(attemptFetch ? name : null, reqMap[type]);
    if (error) console.log(error);
    const prefix = type === 'user' ? 'u' : 'r'
    return (
        <figure className="mr-sm w-lg h-lg bg-subtle rounded-full overflow-hidden flex-none">
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