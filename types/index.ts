import type { IComment }  from './comment'
import type { IPost }  from './post'

export interface IRootObject {
    posts: {
        data: {
            after: string;
            children: IPost[];
        };
    };
    comments?: {
        data: {
            children: IComment[];
        };
    };
}