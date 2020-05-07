import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-members-card',
  templateUrl: './members-card.component.html',
  styleUrls: ['./members-card.component.css']
})
export class MembersCardComponent implements OnInit {
  @Input() user: User;

  constructor(private authService: AuthService, private userService: UserService,
              private alertify: AlertifyService) { }

  ngOnInit() {
  }

  sendLike(id: number){
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertify.success('user liked');
    }, error => {this.alertify.error(error); }
    );

  }

}
