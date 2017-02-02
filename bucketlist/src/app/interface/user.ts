export interface User {
    id: number,
    uId: string,
    first_name?: string,
    last_name?: string,
    cached_image?: string,
    stats?:any,
    badges?:any,
    completed_percent?:any,
    language?:string
}