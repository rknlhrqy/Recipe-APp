import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Recipe } from './recipe.model';
import { AuthService } from './auth.service';


@Injectable()
export class DataStorageService {
  recipes: Recipe[];

  constructor(private http: Http,
    private authService: AuthService) {}

/*
  async saveData(recipes: Recipe[]) {
    const token = await this.authService.getToken();
    console.log('saveData:', token);
    return this.http.put(
      'https://recipe-app-book-10012018.firebaseio.com/recipes.json?auth=' + token,
      recipes).pipe(map((response: Response) => {
        console.log(response);
      })).pipe(catchError((error) => {
      return throwError('Fail to save data!');
    }));
  }
  async fetchData() {
    const token = await this.authService.getToken();
    return await this.http.get(
      'https://recipe-app-book-10012018.firebaseio.com/recipes.json?auth=' + token)
    .pipe(map((response: Response) => {
      const data = response.json();
      return data;
    })).pipe(catchError((error) => {
      return throwError('Fail to fetch data!');
    }));
  }
  */

  async saveData(recipes: Recipe[]) {
    try {
      const token = await this.authService.getToken();
      console.log('saveData:', token);
      const response = await this.http.put(
        'https://recipe-app-book-10012018.firebaseio.com/recipes.json?auth=' + token,
        recipes).toPromise();
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  async fetchData() {
    try {
      const token = await this.authService.getToken();
      const response = await this.http.get(
        'https://recipe-app-book-10012018.firebaseio.com/recipes.json?auth=' + token).toPromise();
      const data = response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

}
