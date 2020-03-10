import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'phantom-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  darkTheme = true;

  constructor(
    private readonly renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.setTheme();
    this.renderer.addClass(document.body, 'light-theme');
  }

  setTheme(): void {
    this.darkTheme = !this.darkTheme;
    const currentThemeClass = `${!this.darkTheme ? 'dark' : 'light'}-theme`;
    const newThemeClass = `${this.darkTheme ? 'dark' : 'light'}-theme`;
    this.renderer.removeClass(document.body, currentThemeClass);
    this.renderer.addClass(document.body, newThemeClass);
  }
}
