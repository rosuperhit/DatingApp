import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  likesParams: string;

  constructor(private authSerive: AuthService, private userService: UserService,
              private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
    });
    this.likesParams = 'Likers';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
    console.log(this.pagination.currentPage);
  }

  loadUsers(){
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage,
       null, this.likesParams)
    .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
  }, error => {
    this.alertify.error(error);
  }
   );
  }

}
