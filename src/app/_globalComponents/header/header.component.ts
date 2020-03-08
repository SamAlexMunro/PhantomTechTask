import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'phantom-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  darkTheme = true;

  constructor() { }

  ngOnInit(): void {
    this.setTheme();
  }

  setTheme(): void {
    this.darkTheme = !this.darkTheme;
    const currentThemeClass = `${!this.darkTheme ? 'dark' : 'light'}-theme`;
    const newThemeClass = `${this.darkTheme ? 'dark' : 'light'}-theme`;
    document.body.classList.remove(currentThemeClass);
    document.body.classList.add(newThemeClass);
  }
}
