import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user:any;

  constructor(private userService:UserService) { }

  showUser () {
    this.user = this.userService.getUserMock();
  }

  ngOnInit(): void {
  }
}
