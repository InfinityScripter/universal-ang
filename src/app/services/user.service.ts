import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class UserService {

  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  getUserMock() {
    return {
      name: 'Misha',
      age: 35,
      email: 'hellomymailiscorrect@mail.ru',
      isAdmin: true
    }
  }

  getUsers() {
    return this.http.get(this.apiUrl);
  }
}
