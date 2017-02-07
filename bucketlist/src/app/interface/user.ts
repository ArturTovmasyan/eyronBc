export interface User {
    id: number,
    uId: string,
    first_name?: string,
    username?: string,
    last_name?: string,
    cached_image?: string,
    image_path?: string,
    stats?:any,
    activity?:any,
    badges?:any,
    completed_percent?:any,
    language?:string
}