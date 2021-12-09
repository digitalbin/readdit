import pick from 'just-pick';

const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];
  
export function timeSince(time: number) {
    const date = new Date(time * 1000)
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const interval = intervals.find(i => i.seconds < seconds);
    if (!interval) return null;
    const count = Math.floor(seconds / interval.seconds);
    return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
}

export function kFormatter(num: number) {
  return Math.abs(num) > 999 ? Math.sign(num)*parseFloat((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
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
  'replies'
];

export function stripData({ data }) {
  const { after, children = [] } = data || {};
  const strippedChildren = children.map(child => ({ data: pick(child.data, postPropList) }));
  
  return {
      data: {
        after,
        children: strippedChildren,
      }
  }
}