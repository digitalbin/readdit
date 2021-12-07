import fetch from 'isomorphic-unfetch';

const req = (url: string) =>
    fetch(url, { cache: "force-cache" })
        .then((res) => res.json())
        .catch((err) => console.error('Error fetching: ', url));

const pickIcon = (json: {
    data: { icon_img?: string; community_icon: string };
}) => {   
    const { icon_img, community_icon } = json?.data || {};
    const iconUrl = icon_img || community_icon;
    const [strippedParams] = iconUrl.split('?');

    return strippedParams;
};

export const getSubredditIcon = (subreddit: string) =>
    req(`https://www.reddit.com/r/${subreddit}/about.json`)
    .then(pickIcon);

export const getUserIcon = (username: string) =>
    req(`https://www.reddit.com/user/${username}/about.json`)
        .then(pickIcon);
