import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  protected categories: any;
  protected isUserLogin: boolean = false;
  private storageSubscription: Subscription | null = null;
  protected isUserSeller: boolean = false;

  constructor(private localStorageService: LocalStorageService,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.categories = await this.categoriesService.getCategories().toPromise();
    this.isUserLogin = this.localStorageService.isUserLoggedIn();
    this.storageSubscription = this.localStorageService.getStorageChangeObservable().subscribe(
      (isUserLoggedIn) => {
        this.isUserLogin = isUserLoggedIn;
        let user: any = this.localStorageService.getUser()
        if(user){
          this.isUserSeller = user.esVendedor == 1;
        }else{
          this.isUserSeller = false;
        }
      }
    );
  }

  closeSession(){
    this.localStorageService.removeUser();
    this.router.navigateByUrl('home');
  }

  ngOnDestroy(): void {
    if (this.storageSubscription) {
      this.storageSubscription.unsubscribe();
    }
  }
}
