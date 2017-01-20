import {Story} from "./story";

export interface Goal {
    id: number,
    title: string,
    slug: string,
    success_stories?: Story[],
    cachedImage?: string,
    cached_image?: string
}
