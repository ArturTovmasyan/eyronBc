import {Story} from "./story";
import {Location} from "./location";

export interface Goal {
    id: number,
    title: string,
    slug: string,
    location?: Location,
    is_my_goal?: number,
    success_stories?: Story[],
    cachedImage?: string,
    cached_image?: string
}
