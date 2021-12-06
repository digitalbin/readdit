export interface IPost {
    kind: Kind;
    data: IPostData;
}

export interface IPostData {
    approved_at_utc: null;
    subreddit: string;
    selftext: string;
    author_fullname: string;
    saved: boolean;
    mod_reason_title: null;
    gilded: number;
    clicked: boolean;
    title: string;
    link_flair_richtext: FlairRichtext[];
    subreddit_name_prefixed: string;
    hidden: boolean;
    pwls: number;
    link_flair_css_class: null | string;
    downs: number;
    thumbnail_height: number | null;
    top_awarded_type: null | string;
    parent_whitelist_status: WhitelistStatus;
    hide_score: boolean;
    name: string;
    quarantine: boolean;
    link_flair_text_color: FlairTextColor;
    upvote_ratio: number;
    author_flair_background_color: null | string;
    subreddit_type: SubredditType;
    ups: number;
    total_awards_received: number;
    media_embed: MediaEmbed;
    thumbnail_width: number | null;
    author_flair_template_id: null | string;
    is_original_content: boolean;
    user_reports: any[];
    secure_media: DataMedia | null;
    is_reddit_media_domain: boolean;
    is_meta: boolean;
    category: null;
    secure_media_embed: MediaEmbed;
    link_flair_text: null | string;
    can_mod_post: boolean;
    score: number;
    approved_by: null;
    is_created_from_ads_ui: boolean;
    author_premium: boolean;
    thumbnail: string;
    edited: boolean | number;
    author_flair_css_class: null | string;
    author_flair_richtext: FlairRichtext[];
    gildings: DataGildings;
    post_hint?: PostHint;
    content_categories: string[] | null;
    is_self: boolean;
    mod_note: null;
    crosspost_parent_list?: IPostData[];
    created: number;
    link_flair_type: FlairType;
    wls: number;
    removed_by_category: null;
    banned_by: null;
    author_flair_type: FlairType;
    domain: string;
    allow_live_comments: boolean;
    selftext_html: null | string;
    likes: null;
    suggested_sort: null | string;
    banned_at_utc: null;
    url_overridden_by_dest?: string;
    view_count: null;
    archived: boolean;
    no_follow: boolean;
    is_crosspostable: boolean;
    pinned: boolean;
    over_18: boolean;
    preview?: DataPreview;
    all_awardings: AllAwarding[];
    awarders: any[];
    media_only: boolean;
    can_gild: boolean;
    spoiler: boolean;
    locked: boolean;
    author_flair_text: null | string;
    treatment_tags: any[];
    visited: boolean;
    removed_by: null;
    num_reports: null;
    distinguished: null;
    subreddit_id: string;
    author_is_blocked: boolean;
    mod_reason_by: null;
    removal_reason: null;
    link_flair_background_color: string;
    id: string;
    is_robot_indexable: boolean;
    num_duplicates?: number;
    report_reasons: null;
    author: string;
    discussion_type: null;
    num_comments: number;
    send_replies: boolean;
    media: DataMedia | null;
    contest_mode: boolean;
    author_patreon_flair: boolean;
    crosspost_parent?: string;
    author_flair_text_color: FlairTextColor | null;
    permalink: string;
    whitelist_status: WhitelistStatus;
    stickied: boolean;
    url: string;
    subreddit_subscribers: number;
    created_utc: number;
    num_crossposts: number;
    mod_reports: any[];
    is_video: boolean;
    link_flair_template_id?: string;
    tournament_data?: TournamentData;
    is_gallery?: boolean;
    media_metadata?: { [key: string]: MediaMetadatum };
    gallery_data?: GalleryData;
}

export interface AllAwarding {
    giver_coin_reward: number | null;
    subreddit_id: null;
    is_new: boolean;
    days_of_drip_extension: number;
    coin_price: number;
    id: string;
    penny_donate: number | null;
    award_sub_type: AwardSubType;
    coin_reward: number;
    icon_url: string;
    days_of_premium: number;
    tiers_by_required_awardings: {
        [key: string]: TiersByRequiredAwarding;
    } | null;
    resized_icons: ResizedIcon[];
    icon_width: number;
    static_icon_width: number;
    start_date: null;
    is_enabled: boolean;
    awardings_required_to_grant_benefits: number | null;
    description: string;
    end_date: null;
    subreddit_coin_reward: number;
    count: number;
    static_icon_height: number;
    name: string;
    resized_static_icons: ResizedIcon[];
    icon_format: Format | null;
    icon_height: number;
    penny_price: number | null;
    award_type: AwardType;
    static_icon_url: string;
}

export enum AwardSubType {
    Appreciation = 'APPRECIATION',
    Community = 'COMMUNITY',
    Global = 'GLOBAL',
    Group = 'GROUP',
    Premium = 'PREMIUM',
}

export enum AwardType {
    Community = 'community',
    Global = 'global',
}

export enum Format {
    Apng = 'APNG',
    Jpg = 'JPG',
    PNG = 'PNG',
}

export interface ResizedIcon {
    url: string;
    width: number;
    height: number;
    format?: Format | null;
}

export interface TiersByRequiredAwarding {
    resized_icons: ResizedIcon[];
    awardings_required: number;
    static_icon: ResizedIcon;
    resized_static_icons: ResizedIcon[];
    icon: ResizedIcon;
}

export interface FlairRichtext {
    e: AuthorFlairTypeEnum;
    t?: string;
    a?: string;
    u?: string;
}

export enum AuthorFlairTypeEnum {
    Emoji = 'emoji',
    Text = 'text',
}

export enum FlairTextColor {
    Dark = 'dark',
    Light = 'light',
}

export enum FlairType {
    Richtext = 'richtext',
    Text = 'text',
}

export interface MediaEmbedClass {}

export interface CrosspostParentListMedia {
    reddit_video: RedditVideo;
}

export interface RedditVideo {
    bitrate_kbps: number;
    fallback_url: string;
    height: number;
    width: number;
    scrubber_media_url: string;
    dash_url: string;
    duration: number;
    hls_url: string;
    is_gif: boolean;
    transcoding_status: TranscodingStatus;
}

export enum TranscodingStatus {
    Completed = 'completed',
}

export enum PostHint {
    HostedVideo = 'hosted:video',
    Image = 'image',
    Link = 'link',
    RichVideo = 'rich:video',
}

export interface RedditVideoPreview {
    bitrate_kbps: number;
    fallback_url: string;
    height: number;
    width: number;
    scrubber_media_url: string;
    dash_url: string;
    duration: number;
    hls_url: string;
    is_gif: boolean;
    transcoding_status: string;
}

export interface CrosspostParentListPreview {
    images: PurpleImage[];
    reddit_video_preview?: RedditVideoPreview;
    enabled: boolean;
}

export interface PurpleImage {
    source: ResizedIcon;
    resolutions: ResizedIcon[];
    variants: MediaEmbedClass;
    id: string;
}

export interface GalleryData {
    items: Item[];
}

export interface Item {
    caption?: string;
    media_id: string;
    id: number;
}

export interface DataGildings {
    gid_1?: number;
    gid_2?: number;
    gid_3?: number;
}

export interface DataMedia {
    reddit_video?: RedditVideo;
    type?: string;
    oembed?: Oembed;
}

export interface Oembed {
    provider_url: string;
    version: string;
    title: string;
    type: string;
    thumbnail_width: number;
    height: number;
    width: number;
    html: string;
    author_name: string;
    provider_name: string;
    thumbnail_url: string;
    thumbnail_height: number;
    author_url: string;
}

export interface MediaEmbed {
    content?: string;
    width?: number;
    scrolling?: boolean;
    height?: number;
    media_domain_url?: string;
}

export interface MediaMetadatum {
    status: MediaMetadatumStatus;
    e: MediaMetadatumE;
    m: M;
    p: S[];
    s: S;
    id: string;
}

export enum MediaMetadatumE {
    Image = 'Image',
}

export enum M {
    ImageJpg = 'image/jpg',
}

export interface S {
    y: number;
    x: number;
    u: string;
}

export enum MediaMetadatumStatus {
    Valid = 'valid',
}

export enum WhitelistStatus {
    AllAds = 'all_ads',
    NoAds = 'no_ads',
    SomeAds = 'some_ads',
}

export interface DataPreview {
    images: FluffyImage[];
    reddit_video_preview?: RedditVideoPreview;
    enabled: boolean;
}

export interface FluffyImage {
    source: ResizedIcon;
    resolutions: ResizedIcon[];
    variants: Variants;
    id: string;
}

export interface Variants {
    gif?: GIF;
    mp4?: GIF;
}

export interface GIF {
    source: ResizedIcon;
    resolutions: ResizedIcon[];
}

export enum SubredditType {
    Public = 'public',
}

export interface TournamentData {
    status: string;
    total_participants: number;
    subreddit_id: string;
    name: string;
    predictions: Prediction[];
    currency: string;
    theme_id: string;
    tournament_id: string;
}

export interface Prediction {
    status: PredictionStatus;
    body: string;
    is_rtjson: boolean;
    is_nsfw: boolean;
    title: string;
    created_at: number;
    voting_end_timestamp: number;
    id: string;
    vote_updates_remained: null;
    resolved_option_id: null | string;
    user_won_amount: null;
    is_spoiler: boolean;
    user_selection: null;
    options: Option[];
    total_stake_amount: number;
    total_vote_count: number;
}

export interface Option {
    total_amount: number;
    text: string;
    vote_count: number;
    user_amount: null;
    image_url: null;
    id: string;
}

export enum PredictionStatus {
    Closed = 'CLOSED',
    Open = 'OPEN',
    Resolved = 'RESOLVED',
}

export enum Kind {
    T3 = 't3',
}
