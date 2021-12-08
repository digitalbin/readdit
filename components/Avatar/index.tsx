/* eslint-disable @next/next/no-img-element */
import { FC, useState, useEffect } from 'react';
import useSWRImmutable from 'swr/immutable';
import { getSubredditIcon, getUserIcon } from '@requests/index';

const hexString = '0123456789abcdef';
const randomColor = () => {
    let hexCode = '#';
    for (let i = 0; i < 6; i++) {
        hexCode += hexString[Math.floor(Math.random() * hexString.length)];
    }
    return hexCode;
};

const generateGrad = () => {
    const colorOne = randomColor();
    const colorTwo = randomColor();
    const angle = Math.floor(Math.random() * 360);
    return `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
};

const RandomGrad = () => {
    const [grad, setGrad] = useState<string | undefined>(undefined);
    useEffect(() => setGrad(generateGrad()), []);
    return <div className="h-full" style={{ background: grad }} />;
};

interface Props {
    type: 'user' | 'subreddit';
    name?: string;
}

const reqMap = {
    user: getUserIcon,
    subreddit: getSubredditIcon,
};

const Avatar: FC<Props> = ({ type, name }) => {
    const { data: icon, error } = useSWRImmutable(name, reqMap[type]);
    if (error) console.log(error);
    const prefix = type === 'user' ? 'u' : 'r';

    return (
        <figure className="mr-sm w-lg h-lg bg-subtle rounded-full overflow-hidden flex-none">
            {icon ? (
                <img
                    src={icon}
                    alt={`Avatar for ${prefix}/${name}`}
                />
            ) : <RandomGrad />}
        </figure>
    );
};

export default Avatar;
