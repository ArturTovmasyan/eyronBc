export interface User {
    id: number,
    uId: string,
    first_name?: string,
    username?: string,
    last_name?: string,
    cached_image?: string,
    draft_count?: any;
    image_path?: string,
    stats?:any,
    activity?:any,
    badges?:any,
    completed_percent?:any,
    language?:string
    common_goals_count?:number
}