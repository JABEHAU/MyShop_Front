import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  protected userName: string = '';
  constructor(private localStorageService: LocalStorageService) { 
    var user = localStorageService.getUser();
    if(user)
      this.userName = user.nombre;
  }

  ngOnInit(): void {
  }

}
