import {Goal} from "./goal";
import {User} from "./user";

export interface Activity {
    id: number,
    user: User,
    goals: Goal[]
}