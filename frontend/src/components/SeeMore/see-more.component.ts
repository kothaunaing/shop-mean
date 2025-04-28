import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'see-more-component',
  templateUrl: 'see-more.component.html',
})
export class SeeMoreComponent {
  @Input() text: string = '';
  defaultText: string = '';
  showingMore = signal(false);

  ngOnInit() {
    this.setDefault();
  }

  setDefault() {
    this.defaultText = this.text.slice(0, 100);
  }

  seeMore() {
    this.showingMore.set(true);
    this.defaultText = this.text;
  }

  seeLess() {
    this.setDefault();
    this.showingMore.set(false);
  }
}
