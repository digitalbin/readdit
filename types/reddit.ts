export interface LinkFlairRichtext {
    a: string;
    e: string;
    u: string;
    t: string;
}

export interface MediaEmbed {
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
    transcoding_status: string;
}

export interface SecureMedia {
    reddit_video: RedditVideo;
}

export interface SecureMediaEmbed {
    media_domain_url?: string;
    content?: string;
    width?: number;
    height?: number;
}

export interface AuthorFlairRichtext {
    e: string;
    t: string;
    a: string;
    u: string;
}

export interface Gildings {
    gid_1: number;
    gid_2?: number;
    gid_3?: number;
}

export interface ResizedIcon {
    url: string;
    width: number;
    height: number;
}

export interface StaticIcon {
    url: string;
    width: number;
    format?: any;
    height: number;
}

export interface ResizedStaticIcon {
    url: string;
    width: number;
    height: number;
}

export interface Icon {
    url: string;
    width: number;
    format: string;
    height: number;
}

export interface I02 {
    resized_icons: ResizedIcon[];
    awardings_required: number;
    static_icon: StaticIcon;
    resized_static_icons: ResizedStaticIcon[];
    icon: Icon;
}

export interface ResizedIcon2 {
    url: string;
    width: number;
    height: number;
}

export interface StaticIcon2 {
    url: string;
    width: number;
    format?: any;
    height: number;
}

export interface ResizedStaticIcon2 {
    url: string;
    width: number;
    height: number;
}

export interface Icon2 {
    url: string;
    width: number;
    format: string;
    height: number;
}

export interface I32 {
    resized_icons: ResizedIcon2[];
    awardings_required: number;
    static_icon: StaticIcon2;
    resized_static_icons: ResizedStaticIcon2[];
    icon: Icon2;
}

export interface ResizedIcon3 {
    url: string;
    width: number;
    height: number;
}

export interface StaticIcon3 {
    url: string;
    width: number;
    format?: any;
    height: number;
}

export interface ResizedStaticIcon3 {
    url: string;
    width: number;
    height: number;
}

export interface Icon3 {
    url: string;
    width: number;
    format: string;
    height: number;
}

export interface I62 {
    resized_icons: ResizedIcon3[];
    awardings_required: number;
    static_icon: StaticIcon3;
    resized_static_icons: ResizedStaticIcon3[];
    icon: Icon3;
}

export interface ResizedIcon4 {
    url: string;
    width: number;
    height: number;
}

export interface StaticIcon4 {
    url: string;
    width: number;
    format?: any;
    height: number;
}

export interface ResizedStaticIcon4 {
    url: string;
    width: number;
    height: number;
}

export interface Icon4 {
    url: string;
    width: number;
    format: string;
    height: number;
}

export interface I92 {
    resized_icons: ResizedIcon4[];
    awardings_required: number;
    static_icon: StaticIcon4;
    resized_static_icons: ResizedStaticIcon4[];
    icon: Icon4;
}

export interface ResizedIcon5 {
    url: string;
    width: number;
    height: number;
}

export interface StaticIcon5 {
    url: string;
    width: number;
    format?: any;
    height: number;
}

export interface ResizedStaticIcon5 {
    url: string;
    width: number;
    height: number;
}

export interface Icon5 {
    url: string;
    width: number;
    format: string;
    height: number;
}

export interface I52 {
    resized_icons: ResizedIcon5[];
    awardings_required: number;
    static_icon: StaticIcon5;
    resized_static_icons: ResizedStaticIcon5[];
    icon: Icon5;
}

export interface ResizedIcon6 {
    url: string;
    width: number;
    height: number;
}

export interface StaticIcon6 {
    url: string;
    width: number;
    format?: any;
    height: number;
}

export interface ResizedStaticIcon6 {
    url: string;
    width: number;
    height: number;
}

export interface Icon6 {
    url: string;
    width: number;
    format: string;
    height: number;
}

export interface I102 {
    resized_icons: ResizedIcon6[];
    awardings_required: number;
    static_icon: StaticIcon6;
    resized_static_icons: ResizedStaticIcon6[];
    icon: Icon6;
}

export interface ResizedIcon7 {
    url: string;
    width: number;
    height: number;
}

export interface StaticIcon7 {
    url: string;
    width: number;
    format?: any;
    height: number;
}

export interface ResizedStaticIcon7 {
    url: string;
    width: number;
    height: number;
}

export interface Icon7 {
    url: string;
    width: number;
    format: string;
    height: number;
}

export interface I252 {
    resized_icons: ResizedIcon7[];
    awardings_required: number;
    static_icon: StaticIcon7;
    resized_static_icons: ResizedStaticIcon7[];
    icon: Icon7;
}

export interface TiersByRequiredAwardings {
    0: I02;
    3: 32;
    6: 62;
    9: 92;
    5: 52;
    10: I102;
    25: 252;
}

export interface ResizedIcon8 {
    url: string;
    width: number;
    height: number;
}

export interface ResizedStaticIcon8 {
    url: string;
    width: number;
    height: number;
}

export interface AllAwarding {
    giver_coin_reward?: number;
    subreddit_id: string;
    is_new: boolean;
    days_of_drip_extension: number;
    coin_price: number;
    id: string;
    penny_donate?: number;
    award_sub_type: string;
    coin_reward: number;
    icon_url: string;
    days_of_premium: number;
    tiers_by_required_awardings: TiersByRequiredAwardings;
    resized_icons: ResizedIcon8[];
    icon_width: number;
    static_icon_width: number;
    start_date?: any;
    is_enabled: boolean;
    awardings_required_to_grant_benefits?: number;
    description: string;
    end_date?: any;
    subreddit_coin_reward: number;
    count: number;
    static_icon_height: number;
    name: string;
    resized_static_icons: ResizedStaticIcon8[];
    icon_format: string;
    icon_height: number;
    penny_price?: number;
    award_type: string;
    static_icon_url: string;
}

export interface RedditVideo2 {
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

export interface Media {
    reddit_video?: RedditVideo2;
    oembed?: {
        author_name: string;
        author_url: string;
        height: number;
        html: string;
        provider_name: string;
        provider_url: string;
        thumbnail_height: number;
        thumbnail_url: string;
        thumbnail_width: number;
        title: string;
        type: string;
        version: string;
        width: number;
    }
    type?: string;
}

export interface Source {
    url: string;
    width: number;
    height: number;
}

export interface Resolution {
    url: string;
    width: number;
    height: number;
}

export interface Source2 {
    url: string;
    width: number;
    height: number;
}

export interface Resolution2 {
    url: string;
    width: number;
    height: number;
}

export interface Gif {
    source: Source2;
    resolutions: Resolution2[];
}

export interface Source3 {
    url: string;
    width: number;
    height: number;
}

export interface Resolution3 {
    url: string;
    width: number;
    height: number;
}

export interface Mp4 {
    source: Source3;
    resolutions: Resolution3[];
}

export interface Variants {
    gif: Gif;
    mp4: Mp4;
}

export interface Image {
    source: Source;
    resolutions: Resolution[];
    variants: Variants;
    id: string;
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

export interface Preview {
    images: Image[];
    enabled: boolean;
    reddit_video_preview: RedditVideoPreview;
}

export interface Option {
    total_amount: number;
    text: string;
    vote_count: number;
    user_amount?: any;
    image_url?: any;
    id: string;
}

export interface Prediction {
    status: string;
    body: string;
    is_rtjson: boolean;
    is_nsfw: boolean;
    title: string;
    created_at: any;
    voting_end_timestamp: any;
    id: string;
    vote_updates_remained?: any;
    resolved_option_id: string;
    user_won_amount?: any;
    is_spoiler: boolean;
    user_selection?: any;
    options: Option[];
    total_stake_amount: number;
    total_vote_count: number;
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

export interface P {
    y: number;
    x: number;
    u: string;
}

export interface S {
    y: number;
    x: number;
    u: string;
}

export interface H4as5z41h8381 {
    status: string;
    e: string;
    m: string;
    p: P[];
    s: S;
    id: string;
}

export interface P2 {
    y: number;
    x: number;
    u: string;
}

export interface S2 {
    y: number;
    x: number;
    u: string;
}

export interface I1yaaxz41h83812 {
    status: string;
    e: string;
    m: string;
    p: P2[];
    s: S2;
    id: string;
}

export interface MediaMetadata {
    h4as5z41h8381: H4as5z41h8381;
    I1yaaxz41h8381: I1yaaxz41h83812;
}

export interface Item {
    media_id: string;
    id: number;
}

export interface GalleryData {
    items: Item[];
}

export interface PostData {
    approved_at_utc?: any;
    subreddit: string;
    selftext: string;
    author_fullname: string;
    saved: boolean;
    mod_reason_title?: any;
    gilded: number;
    clicked: boolean;
    title: string;
    link_flair_richtext: LinkFlairRichtext[];
    subreddit_name_prefixed: string;
    hidden: boolean;
    pwls: number;
    link_flair_css_class: string;
    downs: number;
    thumbnail_height?: number;
    top_awarded_type: string;
    hide_score: boolean;
    name: string;
    quarantine: boolean;
    link_flair_text_color: string;
    upvote_ratio: number;
    author_flair_background_color: string;
    subreddit_type: string;
    ups: number;
    total_awards_received: number;
    media_embed: MediaEmbed;
    thumbnail_width?: number;
    author_flair_template_id: string;
    is_original_content: boolean;
    user_reports: any[];
    secure_media: SecureMedia;
    is_reddit_media_domain: boolean;
    is_meta: boolean;
    category?: any;
    secure_media_embed: SecureMediaEmbed;
    link_flair_text: string;
    can_mod_post: boolean;
    score: number;
    approved_by?: any;
    is_created_from_ads_ui: boolean;
    author_premium: boolean;
    thumbnail: string;
    edited: any;
    author_flair_css_class: string;
    author_flair_richtext: AuthorFlairRichtext[];
    gildings: Gildings;
    content_categories?: any;
    is_self: boolean;
    mod_note?: any;
    created: number;
    link_flair_type: string;
    wls: number;
    removed_by_category?: any;
    banned_by?: any;
    author_flair_type: string;
    domain: string;
    allow_live_comments: boolean;
    selftext_html: string;
    likes?: any;
    suggested_sort: string;
    banned_at_utc?: any;
    view_count?: any;
    archived: boolean;
    no_follow: boolean;
    is_crosspostable: boolean;
    crosspost_parent?: string;
    crosspost_parent_list: PostData[];
    pinned: boolean;
    over_18: boolean;
    all_awardings: AllAwarding[];
    awarders: any[];
    media_only: boolean;
    can_gild: boolean;
    spoiler: boolean;
    locked: boolean;
    author_flair_text: string;
    treatment_tags: any[];
    visited: boolean;
    removed_by?: any;
    num_reports?: any;
    distinguished: string;
    subreddit_id: string;
    author_is_blocked: boolean;
    mod_reason_by?: any;
    removal_reason?: any;
    link_flair_background_color: string;
    id: string;
    is_robot_indexable: boolean;
    report_reasons?: any;
    author: string;
    discussion_type?: any;
    num_comments: number;
    send_replies: boolean;
    whitelist_status: string;
    contest_mode: boolean;
    mod_reports: any[];
    author_patreon_flair: boolean;
    author_flair_text_color: string;
    permalink: string;
    parent_whitelist_status: string;
    stickied: boolean;
    url: string;
    subreddit_subscribers: number;
    created_utc: number;
    num_crossposts: number;
    media: Media;
    is_video: boolean;
    post_hint: string;
    url_overridden_by_dest: string;
    preview: Preview;
    link_flair_template_id: string;
    tournament_data: TournamentData;
    is_gallery?: boolean;
    media_metadata: MediaMetadata;
    gallery_data: GalleryData;
}

export interface IPost {
    kind: string;
    data: PostData;
}
