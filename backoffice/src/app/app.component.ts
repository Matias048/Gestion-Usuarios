import { Component, HostListener, signal} from '@angular/core';
import { SidebarComponent } from "./layouts/sidebar/sidebar.component";
import { MainComponent } from "./layouts/main/main.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'backoffice';
  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth)

  @HostListener('window:resize')
  onResize(){ 
    this.screenWidth.set(window.innerHeight);
    if(this.screenWidth() < 768){
      this.isLeftSidebarCollapsed.set(true);
    }
  }
  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean) {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed)
  }

  
}
