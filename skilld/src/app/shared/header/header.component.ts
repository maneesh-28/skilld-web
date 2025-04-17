import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  user: { name: string } = { name: '' };
  private userSubscription!: Subscription;

  constructor(
    private authService: AuthService,
  ) {}
 

  ngOnInit() {
    this.userSubscription = this.authService.getUser().subscribe(user => {
      if (user && user.name) {
        this.user = user; // Update user in header dynamically
      }
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe(); // Prevent memory leaks
    }
  }
}