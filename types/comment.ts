export interface IComment {
    kind: ChildKind;
    data: ICommentData;
}

export interface ICommentData {
    subreddit_id?:                    string;
    approved_at_utc?:                 null;
    author_is_blocked?:               boolean;
    comment_type?:                    null;
    awarders?:                        any[];
    mod_reason_by?:                   null;
    banned_by?:                       null;
    author_flair_type?:               AuthorFlairType;
    total_awards_received?:           number;
    subreddit?:                       string;
    author_flair_template_id?:        null;
    likes?:                           null;
    replies?:                         DataRepliesClass;
    user_reports?:                    any[];
    saved?:                           boolean;
    id:                               string;
    banned_at_utc?:                   null;
    mod_reason_title?:                null;
    gilded?:                          number;
    archived?:                        boolean;
    collapsed_reason_code?:           null;
    no_follow?:                       boolean;
    author?:                          string;
    can_mod_post?:                    boolean;
    created_utc?:                     number;
    send_replies?:                    boolean;
    parent_id:                        ID;
    score?:                           number;
    author_fullname?:                 string;
    approved_by?:                     null;
    mod_note?:                        null;
    all_awardings?:                   AllAwarding[];
    collapsed?:                       boolean;
    body?:                            string;
    edited?:                          boolean | number;
    top_awarded_type?:                null;
    author_flair_css_class?:          null;
    name:                             string;
    is_submitter?:                    boolean;
    downs?:                           number;
    author_flair_richtext?:           any[];
    author_patreon_flair?:            boolean;
    body_html?:                       string;
    removal_reason?:                  null;
    collapsed_reason?:                null;
    distinguished?:                   null;
    associated_award?:                null;
    stickied?:                        boolean;
    author_premium?:                  boolean;
    can_gild?:                        boolean;
    gildings?:                        PurpleGildings;
    unrepliable_reason?:              null;
    author_flair_text_color?:         null;
    score_hidden?:                    boolean;
    permalink?:                       string;
    subreddit_type?:                  string;
    locked?:                          boolean;
    report_reasons?:                  null;
    created?:                         number;
    author_flair_text?:               null;
    treatment_tags?:                  string[];
    link_id?:                         ID;
    subreddit_name_prefixed?:         string;
    controversiality?:                number;
    depth:                            number;
    author_flair_background_color?:   null;
    collapsed_because_crowd_control?: null;
    mod_reports?:                     any[];
    num_reports?:                     null;
    ups?:                             number;
    count?:                           number;
    children?:                        string[];
}

export interface AllAwarding {
    giver_coin_reward:                    number | null;
    subreddit_id:                         null;
    is_new:                               boolean;
    days_of_drip_extension:               number;
    coin_price:                           number;
    id:                                   string;
    penny_donate:                         number | null;
    coin_reward:                          number;
    icon_url:                             string;
    days_of_premium:                      number;
    icon_height:                          number;
    tiers_by_required_awardings:          { [key: string]: TiersByRequiredAwarding } | null;
    resized_icons:                        Icon[];
    icon_width:                           number;
    static_icon_width:                    number;
    start_date:                           null;
    is_enabled:                           boolean;
    awardings_required_to_grant_benefits: number | null;
    description:                          string;
    end_date:                             null;
    subreddit_coin_reward:                number;
    count:                                number;
    static_icon_height:                   number;
    name:                                 string;
    resized_static_icons:                 Icon[];
    icon_format:                          Format | null;
    award_sub_type:                       AwardSubType;
    penny_price:                          number | null;
    award_type:                           AwardType;
    static_icon_url:                      string;
}

export enum AwardSubType {
    Appreciation = "APPRECIATION",
    Global = "GLOBAL",
    Group = "GROUP",
    Premium = "PREMIUM",
}

export enum AwardType {
    Global = "global",
}

export enum Format {
    Apng = "APNG",
    PNG = "PNG",
}

export interface Icon {
    url:     string;
    width:   number;
    height:  number;
    format?: Format | null;
}

export interface TiersByRequiredAwarding {
    resized_static_icons: Icon[];
    resized_icons:        Icon[];
    static_icon:          Icon;
    awardings_required:   number;
    icon:                 Icon;
}

export enum AuthorFlairType {
    Text = "text",
}

export interface PurpleGildings {
    gid_1?: number;
    gid_2?: number;
}

export enum ID {
    T3R95Bcu = "t3_r95bcu",
}

export interface DataRepliesClass {
    kind: string;
    data: PurpleData;
}

export interface PurpleData {
    after:      null;
    dist:       null;
    modhash:    string;
    geo_filter: string;
    children:   PurpleChild[];
    before:     null;
}

export interface PurpleChild {
    kind: ChildKind;
    data: ICommentData;
}

export interface FluffyGildings {
    gid_1?: number;
}

export interface PurpleReplies {
    kind: string;
    data: TentacledData;
}

export interface TentacledData {
    after:      null;
    dist:       null;
    modhash:    string;
    geo_filter: string;
    children:   FluffyChild[];
    before:     null;
}

export interface FluffyChild {
    kind: ChildKind;
    data: StickyData;
}

export interface StickyData {
    subreddit_id?:                    string;
    approved_at_utc?:                 null;
    author_is_blocked?:               boolean;
    comment_type?:                    null;
    awarders?:                        any[];
    mod_reason_by?:                   null;
    banned_by?:                       null;
    author_flair_type?:               AuthorFlairType;
    total_awards_received?:           number;
    subreddit?:                       string;
    author_flair_template_id?:        null;
    likes?:                           null;
    replies?:                         FluffyReplies | string;
    user_reports?:                    any[];
    saved?:                           boolean;
    id:                               string;
    banned_at_utc?:                   null;
    mod_reason_title?:                null;
    gilded?:                          number;
    archived?:                        boolean;
    collapsed_reason_code?:           null;
    no_follow?:                       boolean;
    author?:                          string;
    can_mod_post?:                    boolean;
    send_replies?:                    boolean;
    parent_id:                        string;
    score?:                           number;
    author_fullname?:                 string;
    removal_reason?:                  null;
    approved_by?:                     null;
    mod_note?:                        null;
    all_awardings?:                   AllAwarding[];
    body?:                            string;
    edited?:                          boolean | number;
    top_awarded_type?:                null;
    downs?:                           number;
    author_flair_css_class?:          null;
    name:                             string;
    is_submitter?:                    boolean;
    collapsed?:                       boolean;
    author_flair_richtext?:           any[];
    author_patreon_flair?:            boolean;
    body_html?:                       string;
    gildings?:                        FluffyGildings;
    collapsed_reason?:                null;
    distinguished?:                   null;
    associated_award?:                null;
    stickied?:                        boolean;
    author_premium?:                  boolean;
    can_gild?:                        boolean;
    link_id?:                         ID;
    unrepliable_reason?:              null;
    author_flair_text_color?:         null;
    score_hidden?:                    boolean;
    permalink?:                       string;
    subreddit_type?:                  string;
    locked?:                          boolean;
    report_reasons?:                  null;
    created?:                         number;
    author_flair_text?:               null;
    treatment_tags?:                  any[];
    created_utc?:                     number;
    subreddit_name_prefixed?:         string;
    controversiality?:                number;
    depth:                            number;
    author_flair_background_color?:   null;
    collapsed_because_crowd_control?: null;
    mod_reports?:                     any[];
    num_reports?:                     null;
    ups?:                             number;
    count?:                           number;
    children?:                        string[];
}

export interface FluffyReplies {
    kind: string;
    data: IndigoData;
}

export interface IndigoData {
    after:      null;
    dist:       null;
    modhash:    string;
    geo_filter: string;
    children:   TentacledChild[];
    before:     null;
}

export interface TentacledChild {
    kind: ChildKind;
    data: IndecentData;
}

export interface IndecentData {
    subreddit_id?:                    string;
    approved_at_utc?:                 null;
    author_is_blocked?:               boolean;
    comment_type?:                    null;
    awarders?:                        any[];
    mod_reason_by?:                   null;
    banned_by?:                       null;
    author_flair_type?:               AuthorFlairType;
    total_awards_received?:           number;
    subreddit?:                       string;
    author_flair_template_id?:        null;
    likes?:                           null;
    replies?:                         TentacledReplies | string;
    user_reports?:                    any[];
    saved?:                           boolean;
    id:                               string;
    banned_at_utc?:                   null;
    mod_reason_title?:                null;
    gilded?:                          number;
    archived?:                        boolean;
    collapsed_reason_code?:           null;
    no_follow?:                       boolean;
    author?:                          string;
    can_mod_post?:                    boolean;
    send_replies?:                    boolean;
    parent_id:                        string;
    score?:                           number;
    author_fullname?:                 string;
    removal_reason?:                  null;
    approved_by?:                     null;
    mod_note?:                        null;
    all_awardings?:                   AllAwarding[];
    collapsed?:                       boolean;
    body?:                            string;
    edited?:                          boolean | number;
    top_awarded_type?:                null;
    author_flair_css_class?:          null;
    name:                             string;
    is_submitter?:                    boolean;
    downs?:                           number;
    author_flair_richtext?:           any[];
    author_patreon_flair?:            boolean;
    body_html?:                       string;
    gildings?:                        PurpleGildings;
    collapsed_reason?:                null;
    distinguished?:                   null;
    associated_award?:                null;
    stickied?:                        boolean;
    author_premium?:                  boolean;
    can_gild?:                        boolean;
    link_id?:                         ID;
    unrepliable_reason?:              null;
    author_flair_text_color?:         null;
    score_hidden?:                    boolean;
    permalink?:                       string;
    subreddit_type?:                  string;
    locked?:                          boolean;
    report_reasons?:                  null;
    created?:                         number;
    author_flair_text?:               null;
    treatment_tags?:                  any[];
    created_utc?:                     number;
    subreddit_name_prefixed?:         string;
    controversiality?:                number;
    depth:                            number;
    author_flair_background_color?:   null;
    collapsed_because_crowd_control?: null;
    mod_reports?:                     any[];
    num_reports?:                     null;
    ups?:                             number;
    count?:                           number;
    children?:                        string[];
}

export interface TentacledReplies {
    kind: string;
    data: HilariousData;
}

export interface HilariousData {
    after:      null;
    dist:       null;
    modhash:    string;
    geo_filter: string;
    children:   StickyChild[];
    before:     null;
}

export interface StickyChild {
    kind: ChildKind;
    data: AmbitiousData;
}

export interface AmbitiousData {
    subreddit_id?:                    string;
    approved_at_utc?:                 null;
    author_is_blocked?:               boolean;
    comment_type?:                    null;
    awarders?:                        any[];
    mod_reason_by?:                   null;
    banned_by?:                       null;
    author_flair_type?:               AuthorFlairType;
    total_awards_received?:           number;
    subreddit?:                       string;
    author_flair_template_id?:        null;
    distinguished?:                   null;
    likes?:                           null;
    replies?:                         StickyReplies | string;
    user_reports?:                    any[];
    saved?:                           boolean;
    id:                               string;
    banned_at_utc?:                   null;
    mod_reason_title?:                null;
    gilded?:                          number;
    archived?:                        boolean;
    collapsed_reason_code?:           null;
    no_follow?:                       boolean;
    author?:                          string;
    can_mod_post?:                    boolean;
    send_replies?:                    boolean;
    parent_id:                        string;
    score?:                           number;
    author_fullname?:                 string;
    removal_reason?:                  null;
    approved_by?:                     null;
    mod_note?:                        null;
    all_awardings?:                   AllAwarding[];
    body?:                            string;
    edited?:                          boolean | number;
    author_flair_css_class?:          null;
    name:                             string;
    is_submitter?:                    boolean;
    downs?:                           number;
    author_flair_richtext?:           any[];
    author_patreon_flair?:            boolean;
    body_html?:                       string;
    gildings?:                        TentacledGildings;
    collapsed_reason?:                null;
    link_id?:                         ID;
    associated_award?:                null;
    stickied?:                        boolean;
    author_premium?:                  boolean;
    can_gild?:                        boolean;
    top_awarded_type?:                null;
    unrepliable_reason?:              null;
    author_flair_text_color?:         null;
    treatment_tags?:                  any[];
    score_hidden?:                    boolean;
    permalink?:                       string;
    subreddit_type?:                  string;
    locked?:                          boolean;
    report_reasons?:                  null;
    created?:                         number;
    author_flair_text?:               null;
    collapsed?:                       boolean;
    created_utc?:                     number;
    subreddit_name_prefixed?:         string;
    controversiality?:                number;
    depth:                            number;
    author_flair_background_color?:   null;
    collapsed_because_crowd_control?: null;
    mod_reports?:                     any[];
    num_reports?:                     null;
    ups?:                             number;
    count?:                           number;
    children?:                        string[];
}

export interface TentacledGildings {
}

export interface StickyReplies {
    kind: string;
    data: CunningData;
}

export interface CunningData {
    after:      null;
    dist:       null;
    modhash:    string;
    geo_filter: string;
    children:   IndigoChild[];
    before:     null;
}

export interface IndigoChild {
    kind: ChildKind;
    data: MagentaData;
}

export interface MagentaData {
    subreddit_id?:                    string;
    approved_at_utc?:                 null;
    author_is_blocked?:               boolean;
    comment_type?:                    null;
    awarders?:                        any[];
    mod_reason_by?:                   null;
    banned_by?:                       null;
    author_flair_type?:               AuthorFlairType;
    total_awards_received?:           number;
    subreddit?:                       string;
    author_flair_template_id?:        null;
    distinguished?:                   null;
    likes?:                           null;
    replies?:                         IndigoReplies | string;
    user_reports?:                    any[];
    saved?:                           boolean;
    id:                               string;
    banned_at_utc?:                   null;
    mod_reason_title?:                null;
    gilded?:                          number;
    archived?:                        boolean;
    collapsed_reason_code?:           null;
    no_follow?:                       boolean;
    author?:                          string;
    can_mod_post?:                    boolean;
    send_replies?:                    boolean;
    parent_id:                        string;
    score?:                           number;
    author_fullname?:                 string;
    approved_by?:                     null;
    mod_note?:                        null;
    all_awardings?:                   any[];
    body?:                            string;
    edited?:                          boolean;
    gildings?:                        TentacledGildings;
    downs?:                           number;
    author_flair_css_class?:          null;
    name:                             string;
    is_submitter?:                    boolean;
    collapsed?:                       boolean;
    author_flair_richtext?:           any[];
    author_patreon_flair?:            boolean;
    body_html?:                       string;
    removal_reason?:                  null;
    collapsed_reason?:                null;
    link_id?:                         ID;
    associated_award?:                null;
    stickied?:                        boolean;
    author_premium?:                  boolean;
    can_gild?:                        boolean;
    top_awarded_type?:                null;
    unrepliable_reason?:              null;
    author_flair_text_color?:         null;
    score_hidden?:                    boolean;
    permalink?:                       string;
    subreddit_type?:                  string;
    locked?:                          boolean;
    report_reasons?:                  null;
    created?:                         number;
    author_flair_text?:               null;
    treatment_tags?:                  any[];
    created_utc?:                     number;
    subreddit_name_prefixed?:         string;
    controversiality?:                number;
    depth:                            number;
    author_flair_background_color?:   null;
    collapsed_because_crowd_control?: null;
    mod_reports?:                     any[];
    num_reports?:                     null;
    ups?:                             number;
    count?:                           number;
    children?:                        string[];
}

export interface IndigoReplies {
    kind: string;
    data: FriskyData;
}

export interface FriskyData {
    after:      null;
    dist:       null;
    modhash:    string;
    geo_filter: string;
    children:   IndecentChild[];
    before:     null;
}

export interface IndecentChild {
    kind: ChildKind;
    data: MischievousData;
}

export interface MischievousData {
    count:     number;
    name:      string;
    id:        string;
    parent_id: string;
    depth:     number;
    children:  string[];
}

export enum ChildKind {
    More = "more",
    T1 = "t1",
}
