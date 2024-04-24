import { Component, OnInit } from '@angular/core'
import { AuthService } from './core/services/auth.service'
import { SideNavToggle } from './shared/models/side-nav-toggle.model'
import { NavigationService } from './core/services/navigation.service'
import { NgIf } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from './shared/components/header/header.component'
import { AuthComponent } from './shared/components/auth/auth.component'
import { MessageBoxComponent } from './shared/components/message-box/message-box.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [NgIf, RouterOutlet, HeaderComponent, AuthComponent, MessageBoxComponent]
})
export class AppComponent implements OnInit {
  title = 'Verdict'

  isSideNavCollapsed = false
  screenWidth = 0

  constructor(
    private auth: AuthService,
    private navigation: NavigationService
  ) {}

  get isAuthorized(): boolean {
    return this.auth.isAuthorized
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth
    this.isSideNavCollapsed = data.collapsed
  }

  ngOnInit(): void {
    if (!this.isAuthorized) this.auth.autoLogIn()
  }
}
