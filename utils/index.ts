import pick from 'just-pick';
import { IPostData, IPost } from 'types/post';
import { ICommentData, IComment } from 'types/comment';

const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];
  
export function timeSince(time?: number) {
    if (!time) return 'n/a ago';
    const date = new Date(time * 1000)
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const interval = intervals.find(i => i.seconds < seconds);
    if (!interval) return null;
    const count = Math.floor(seconds / interval.seconds);
    return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
}

export function kFormatter(num: number = 0) {
  return Math.abs(num) > 999 ? Math.sign(num)*parseFloat((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

export function timeFormatter(seconds: number) {
  return new Date(seconds * 1000).toISOString().substr(14, 5);
}

const postPropList = [
  'crosspost_parent',
  'crosspost_parent_list',
  'subreddit_name_prefixed',
  'subreddit',
  'created',
  'selftext',
  'num_comments',
  'ups',
  'permalink',
  'id',
  'title',
  'post_hint',
  'media',
  'preview',
  'secure_media_embed',
  'url_overridden_by_dest',
  'thumbnail',
  'body_html',
  'author',
  'replies',
  'media_metadata'
];

interface IRes {
  data: {
      after?: string;
      children: IPost[] | IComment[];
  }
}

export function stripData({ data }: IRes) {
  const { after, children = [] } = data || {};
  
  // @ts-ignore
  const strippedChildren = children.map((child: IPost | IComment) => ({ data: pick(child.data, postPropList) }));
  
  return {
      data: {
        after,
        children: strippedChildren,
      }
  }
}