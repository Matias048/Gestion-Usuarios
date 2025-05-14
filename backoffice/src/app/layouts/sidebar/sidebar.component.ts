import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaIconComponent} from "@fortawesome/angular-fontawesome";
import { faBars, faX, faHouse, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FaIconComponent, RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  protected readonly faBars = faBars;
  protected readonly faX = faX;
  protected readonly faHouse = faHouse;
  protected readonly faUser = faUser;

  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  items=[
    {
      routeLink: '/home',
      icon: faHouse,
      label: 'Home'
    },
    
    {
      routeLink: '/user',
      icon: faUser,
      label: 'User'
    }
  ]

  toggleCollapseSidebar() {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed())
  }

  closeSidenav() {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
