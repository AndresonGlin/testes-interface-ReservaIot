import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth-service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
authService = inject(AuthService);
  
  // Pegamos o sinal do usuário do serviço
  user = this.authService._user;

  logout() {
    this.authService.logout();
  }
}
