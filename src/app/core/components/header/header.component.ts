import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  protected categories: any;
  protected isUserLogin: boolean = false;
  private storageSubscription: Subscription | null = null;

  constructor(private localStorageService: LocalStorageService,
    private productService: ProductsService
  ) { }

  async ngOnInit() {
    this.isUserLogin = this.localStorageService.isUserLoggedIn();
    this.storageSubscription = this.localStorageService.getStorageChangeObservable().subscribe(
      (isUserLoggedIn) => {
        this.isUserLogin = isUserLoggedIn;
      }
    );

    this.categories = await this.productService.getCategories().toPromise();
  }

  ngOnDestroy(): void {
    if (this.storageSubscription) {
      this.storageSubscription.unsubscribe();
    }
  }
}
