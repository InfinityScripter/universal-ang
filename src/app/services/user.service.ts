import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class UserService {
  getUserMock() {
    return {
      name: 'Misha',
      age: 35,
      email: 'hellomymailiscorrect@mail.ru',
      isAdmin: true
    }
  }
}
