import fetch from 'isomorphic-unfetch';
import videojs, { VideoJsPlayerOptions } from 'video.js';

const req = (url: string) =>
    fetch(url)
        .then((res) => res.json())
        .catch((err) => console.error('Error fetching: ', url, err));

const pickIcon = (json: {
    data: { icon_img?: string; community_icon: string };
}) => {   
    const { icon_img, community_icon } = json?.data || {};
    const iconUrl = icon_img || community_icon || '';
    const [strippedParams] = iconUrl.split('?');

    return strippedParams;
};

export const getSubredditIcon = (subreddit: string) =>
    req(`https://www.reddit.com/r/${subreddit}/about.json`)
    .then(pickIcon);

export const getUserIcon = (username: string) =>
    req(`https://www.reddit.com/user/${username}/about.json`)
        .then(pickIcon);

export const fetchPageData = (slug: string = '', after?: string) => {
    const url = new URL(slug, 'https://www.reddit.com')
    if (after) url.searchParams.append('after', after);
    url.pathname = url.pathname + '.json'
    return req(url.toString());
}
