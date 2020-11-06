import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  @Output() feature = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  onNavigate(feature: string): void{
    this.feature.emit(feature);
  }

}
