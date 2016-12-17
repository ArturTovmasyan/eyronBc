import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Router } from '@angular/router';


import {Goal} from "./interface/goal";
import {User} from "./interface/user";
import {UserGoal} from "./interface/userGoal";
import {Activity} from "./interface/activity";

import {Observable}     from 'rxjs/Observable';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';



@Injectable()
export class ProjectService {

    private baseOrigin = 'http://bucketlist.loc';
    private headers = new Headers();
    // private baseOrigin = 'http://stage.bucketlist127.com';
    private envprefix = '/app_dev.php/';
    // private envprefix = '/';
    private baseUrl = this.baseOrigin + this.envprefix + 'api/v1.0/' ;
    private goalUrl = '';  // URL to web API
    private usersUrl = 'users';  // URL to web API
    private userGoalsUrl = 'usergoals';  // URL to web API
    private discoverGoalsUrl = this.baseUrl + 'goals/discover';  // URL to discover goal
    private activityUrl = this.baseOrigin + this.envprefix + 'api/v2.0/activities/0/9';  // URL to activity
    private goalFriendsUrl = this.baseUrl + 'goal/random/friends'; //URL to get goalFriends
    private topIdeasUrl = this.baseUrl + 'top-ideas/1'; //URL to get top iteas
    private featuredIdeasUrl = this.baseUrl + 'top-ideas/1'; //URL to get featured iteas
    private badgesUrl = this.baseUrl + 'badges'; 
    constructor(private http:Http, private router:Router) {
        this.headers.append('apikey', localStorage.getItem('apiKey'));
    }

    /**
     * 
     * @param loginData
     * @returns {any}
     */
    auth(loginData: Object):Observable<any> {
        return this.http.post(this.baseUrl + 'users/logins', JSON.stringify(loginData)).map((res:Response) => res.json());
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
     * @returns {Observable<R>}
     */
    getActivities():Observable<Activity[]> {
        return this.http.get(this.activityUrl, {headers: this.headers})
            .map((r:Response) => r.json() as Activity[])
            .catch(this.handleError);
    }
    
    // /**
    //  *
    //  * @param goalId
    //  * @returns {Observable<R>}
    //  */
    // getUserGoal(goalId:number):Observable<UserGoal> {
    //     return this.http.get(this.userGoalsUrl + '/' + goalId)
    //         .map((r:Response) => r.json() as UserGoal)
    //         .catch(this.handleError);
    // }
    
    // /**
    //  *
    //  * @param userId
    //  * @returns {Observable<R>}
    //  */
    // getUser(userId:number):Observable<User> {
    //     return this.http.get(this.usersUrl + '/' + userId)
    //         .map((r:Response) => r.json() as User)
    //         .catch(this.handleError);
    // }

    /**
     *
     * @returns {Observable<T>}
     */
    getGaolFriends():Observable<any> {
        return this.http.get(this.goalFriendsUrl, {headers: this.headers})
            .map((r:Response) => r.json())
            .catch(this.handleError);
    }

    /**
     *
     * @returns {Observable<T>}
     */
    getTopIdeas():Observable<Goal[]> {
        return this.http.get(this.topIdeasUrl, {headers: this.headers})
            .map((r:Response) => r.json() as Goal[])
            .catch(this.handleError);
    }
    
    /**
     *
     * @returns {Observable<T>}
     */
    getFeaturedIdeas():Observable<Goal[]> {
        return this.http.get(this.featuredIdeasUrl, {headers: this.headers})
            .map((r:Response) => r.json() as Goal[])
            .catch(this.handleError);
    }
    
    /**
     *
     * @returns {Observable<T>}
     */
    getBadges():Observable<any> {
        return this.http.get(this.badgesUrl, {headers: this.headers})
            .map((r:Response) => r.json())
            .catch(this.handleError);
    }

    /**
     *
     * @returns {Observable<R>}
     */
    getDiscoverGoals():Observable<Goal[]> {
        // let params = new URLSearchParams();
        // params.set('action', 'opensearch');
        // params.set('format', 'json');
        // params.set('callback', 'JSONP_CALLBACK');

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
        if(error.status && error.status == 401){
            localStorage.removeItem('apiKey');
            this.router.navigate(['/']);
        }
        return Observable.throw(errMsg);
    }
}
