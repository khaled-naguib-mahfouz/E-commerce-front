import { RouterModule,Routes } from '@angular/router';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';
import { CartComponent } from './carts/components/cart/cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
export const routes: Routes = [
  { path: 'products', component: AllProductsComponent,canActivate: [AuthGuard]}, 
  { path: 'details', component: ProductsDetailsComponent,canActivate: [AuthGuard]},
   { path: 'cart', component:CartComponent,canActivate: [AuthGuard]  },
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'product/:id', component: ProductDetailComponent ,canActivate: [AuthGuard]},
    { path: '**', redirectTo: '/products',pathMatch:"full" }
];
