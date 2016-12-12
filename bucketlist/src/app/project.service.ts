import {Injectable} from '@angular/core';
import {Http, Response, Jsonp, URLSearchParams } from '@angular/http';

import {Goal} from "./interface/goal";
import {User} from "./interface/user";
import {UserGoal} from "./interface/userGoal";

import {Observable}     from 'rxjs/Observable';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';



@Injectable()
export class ProjectService {
    private baseUrl = 'http://bucketlist.loc/api/v1.0/';
    private goalUrl = '';  // URL to web API
    private usersUrl = 'users';  // URL to web API
    private userGoalsUrl = 'usergoals';  // URL to web API
    private discoverGoalsUrl = this.baseUrl + 'goals/0/7?search=&category=';  // URL to web API

    constructor(private http:Http, private jsonp: Jsonp) {
    }

    /**
     *
     * @param slug
     * @returns {Observable<R>}
     */
    getGoal(slug:string):Observable<Goal> {
        return this.http.get(this.goalUrl + '/' + slug)
            .map((r:Response) => r.json() as Goal)
            .catch(this.handleError);
    }
    
    /**
     *
     * @param goalId
     * @returns {Observable<R>}
     */
    getUserGoal(goalId:number):Observable<UserGoal> {
        return this.http.get(this.userGoalsUrl + '/' + goalId)
            .map((r:Response) => r.json() as UserGoal)
            .catch(this.handleError);
    }
    
    /**
     *
     * @param userId
     * @returns {Observable<R>}
     */
    getUser(userId:number):Observable<User> {
        return this.http.get(this.usersUrl + '/' + userId)
            .map((r:Response) => r.json() as User)
            .catch(this.handleError);
    }
    
    /**
     *
     * @returns {Observable<R>}
     */
    getDiscoverGoals():Observable<Goal[]> {
        let params = new URLSearchParams();
        params.set('action', 'opensearch');
        params.set('format', 'json');
        params.set('callback', 'JSONP_CALLBACK');

        return this.http.get(this.discoverGoalsUrl)
            .map((r:Response) => r.json() as Goal[])
            .catch(this.handleError);
    }

    /**
     *
     * @param error
     * @returns {ErrorObservable}
     */
    private handleError(error:any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
