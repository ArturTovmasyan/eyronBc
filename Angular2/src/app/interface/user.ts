export interface User {
    id: number,
    u_id: string,
    first_name?: string,
    username?: string,
    last_name?: string,
    cached_image?: string,
    draft_count?: any;
    image_path?: string,
    registration_token?: string,
    innovator?: boolean,
    mentor?: boolean,
    traveler?: boolean,
    is_admin?: boolean,
    stats?:any,
    activity?:any,
    badges?:any,
    completed_percent?:any,
    language?:string
    common_goals_count?:number
}