import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  /**
   *
   */
  constructor(private authservice :AuthService) {
    
  }
isLoggedIn():boolean {
  return this.authservice.isAuthenticated();
}
logout(){
  this.authservice.logout();

}
}
