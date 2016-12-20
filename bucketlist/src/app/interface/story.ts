import {Goal} from "./goal";
import {User} from "./user";

export interface Story {
    id: number,
    user: User,
    goal: Goal,
    file?: any,
    story: string,
    videos?: any
}