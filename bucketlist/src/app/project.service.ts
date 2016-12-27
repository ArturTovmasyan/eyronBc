import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Broadcaster } from './tools/broadcaster';

import {Goal} from "./interface/goal";
import {Story} from "./interface/story";
import {User} from "./interface/user";
import {Category} from "./interface/category";
import {UserGoal} from "./interface/userGoal";
import {Activity} from "./interface/activity";

import {Observable}     from 'rxjs/Observable';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';



@Injectable()
export class ProjectService {

    private baseOrigin = 'http://bucketlist.loc';
    // private baseOrigin = 'http://stage.bucketlist127.com';

    private headers = new Headers();
    private appUser:User;

    private envprefix = '/app_dev.php/';
    // private envprefix = '/';

    private baseUrl = this.baseOrigin + this.envprefix + 'api/v1.0/' ;
    private goalUrl = '';  // URL to web API
    private userUrl  = this.baseUrl + 'user';  // URL to web API

    //modals
    private reportUrl = this.baseUrl + 'report';
    private commonUrl1 = this.baseUrl + 'goals/';
    private commonUrl2 = '/common';
    private usersUrl = this.baseUrl + 'user-list/';
    private friendsUrl = this.baseUrl + 'goals/';

    private userGoalsUrl = this.baseUrl + 'usergoals/';  // URL to web API
    private getStoryUrl = this.baseUrl + 'story/';  // URL to web API
    private discoverGoalsUrl = this.baseUrl + 'goals/discover';  // URL to discover goal
    private baseStoryUrl = this.baseUrl + 'success-story/inspire';  // URL to discover goal
    private ideasUrl = this.baseUrl + 'goals/';  // URL to discover goal
    private activityUrl = this.baseOrigin + this.envprefix + 'api/v2.0/activities/';  // URL to activity
    private goalFriendsUrl = this.baseUrl + 'goal/random/friends'; //URL to get goalFriends
    private topIdeasUrl = this.baseUrl + 'top-ideas/1'; //URL to get top iteas
    private featuredIdeasUrl = this.baseUrl + 'goal/featured'; //URL to get featured iteas
    private badgesUrl = this.baseUrl + 'badges'; 
    private bottomMenuUrl = this.baseUrl + 'bottom/menu';
    private categoriesUrl = this.baseUrl + 'goal/categories';
    private getCompateProfileUrl = this.baseUrl + 'goal/categories';
    private nearByUrl = this.baseUrl + 'goals/nearby/';
    private resetNearByUrl = this.baseOrigin + this.envprefix + 'usergoals/';
    constructor(private http:Http, private router:Router, private broadcaster: Broadcaster) {
        this.headers.append('apikey', localStorage.getItem('apiKey'));
        this.broadcaster.on<User>('getUser')
            .subscribe(user => {
                this.appUser = user;
            });
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
     * @returns {Observable<R>}
     */
    getPath(){
        return this.baseOrigin;
    }
    
    /**
     * 
     * @returns {Observable<R>}
     */
    getMyUser(){
        return this.appUser;
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
     * @param start
     * @param count
     * @returns {Observable<R>}
     */
    getActivities(start:number, count:number, time?:any):Observable<Activity[]> {
        return this.http.get(this.activityUrl + start + '/' + count + (time?('?time=' + time):''), {headers: this.headers})
            .map((r:Response) => r.json() as Activity[])
            .catch(this.handleError);
    }
    
    /**
     *
     * @param goalId
     * @returns {Observable<R>}
     */
    getUserGoal(goalId:number):Observable<UserGoal> {
        return this.http.get(this.userGoalsUrl + goalId, {headers: this.headers})
            .map((r:Response) => r.json() as UserGoal)
            .catch(this.handleError);
    }

    /**
     *
     * @param goalId
     * @returns {Observable<R>}
     */
    setDoneUserGoal(goalId:number):Observable<UserGoal> {
        return this.http.get(this.userGoalsUrl + goalId + '/dones/true', {headers: this.headers})
            .map((r:Response) => r.json() as UserGoal)
            .catch(this.handleError);
    }

    /**
     *
     * @param goalId
     * @returns {Observable<R>}
     */
    getStory(goalId:number):Observable<any> {
        return this.http.get(this.getStoryUrl + goalId, {headers: this.headers})
            .map((r:Response) => r.json())
            .catch(this.handleError);
    }

    /**
     * 
     */
    getUser():Observable<User> {
        return this.http.get(this.userUrl, {headers: this.headers})
            .map((r:Response) => r.json() as User)
            .catch(this.handleError);
    }
    
    /**
     * 
     */
    getCompateProfileInfo():Observable<any> {
        return this.http.get(this.getCompateProfileUrl, {headers: this.headers})
            .map((r:Response) => r.json())
            .catch(this.handleError);
    }

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
    getUserList(first:number, count:number, search:string, type:string):Observable<User[]> {
        return this.http.get(this.friendsUrl + first + '/friends/'+count+'?search='+search+'&type='+ type, {headers: this.headers})
            .map((r:Response) => r.json() as User[])
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
     * @returns {Observable<T>}
     */
    getleaderBoard(type:number, count:number):Observable<any> {
        return this.http.get(this.baseUrl + 'badges/' + type + '/topusers/' + count, {headers: this.headers})
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
     * @returns {Observable<R>}
     */
    getIdeaGoals(start:number, count:number, search:string = '',category:string = ''):Observable<Goal[]> {
        return this.http.get(this.ideasUrl + start + '/' + count + '?search=' + search + '&cateegory=' + category)
            .map((r:Response) => r.json() as Goal[])
            .catch(this.handleError);
    } 
    
    /**
     *
     * @returns {Observable<R>}
     */
    getNearByGoals(latitude:number, longitude:number, start:number, count:number, isCompleted:boolean):Observable<Goal[]> {
        return this.http.get(this.nearByUrl + latitude + '/' + longitude + '/' + start + '/' + count + '/' + isCompleted, {headers: this.headers})
            .map((r:Response) => r.json() as Goal[])
            .catch(this.handleError);
    }

    /**
     * 
     * @param goalId
     * @returns {Observable<R>}
     */
    resetNearByGoal(goalId:number):Observable<any> {
        return this.http.post(this.resetNearByUrl + goalId + '/toggles/interesteds', '', {headers: this.headers})
            .map((r:Response) => r.json())
            .catch(this.handleError);
    }
    
    /**
     *
     * @returns {Observable<R>}
     */
    getBaseStories():Observable<Story[]> {

        return this.http.get(this.baseStoryUrl)
            .map((r:Response) => r.json() as Story[])
            .catch(this.handleError);
    }
    
    /**
     *
     * @returns {Observable<R>}
     */
    getCategories():Observable<Category[]> {

        return this.http.get(this.categoriesUrl)
            .map((r:Response) => r.json() as Category[])
            .catch(this.handleError);
    }

    /**
     *
     * @returns {Observable<R>}
     */
    getBottomMenu():Observable<any> {

        return this.http.get(this.bottomMenuUrl)
            .map((r:Response) => r.json())
            .catch(this.handleError);
    }

    //modal requests
    /**
     *
     */
    getReport(data:any):Observable<any> {
        return this.http.get(this.reportUrl + '?commentId=' + data.contentId + '&type=' + data.contentType, {headers: this.headers})
            .map((r:Response) => r.json())
            .catch(this.handleError);
    }
    /**
     *
     */
    report(data:any):Observable<any> {
        return this.http.put(this.reportUrl, data, {headers: this.headers})
            .map((r:Response) => r.json())
            .catch(this.handleError);
    }

    /**
     *
     */
    getCommons(id:number, start?:number, count?:number):Observable<any> {
        let end = count?('/' + start + '/' + count):'';
        return this.http.get(this.commonUrl1 + id + this.commonUrl2 + end, {headers: this.headers})
            .map((r:Response) => r.json())
            .catch(this.handleError);
    }

    /**
     *
     */
    getUsers(start:number, count:number, id:number, type:number):Observable<User[]> {
        return this.http.get(this.usersUrl + start + '/' + count + '/' + id + '/' + type, {headers: this.headers})
            .map((r:Response) => r.json() as User[])
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
            this.broadcaster.broadcast('logout', 'some message');
            this.router.navigate(['/']);
        }
        return Observable.throw(errMsg);
    }
}
