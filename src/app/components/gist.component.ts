import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {GistUtil} from "./gist-util";

@Component({
  selector: 'app-gist',
  template: `
    <iframe [ngStyle]="height" class="gist-container" #iframe type="text/javascript"></iframe>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    
    .gist-container {
      width: 100%;
      border: none;
      box-sizing: border-box;
      margin-bottom: -5px; /* Adjust for glass gap at bottom */
    }
  `]
})
export class GistComponent implements OnInit, AfterViewInit {

  @ViewChild('iframe') iframe: ElementRef;

  @Input() id;
  @Input() fileName;
  @Input() codeUrl: string;

  height = {height: '100%'};

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const doc = this.iframe.nativeElement.contentDocument;
    const content = `
        <html style="box-sizing: border-box; overflow: hidden;">
        <head>
          <base target="_parent">
        </head>
        <body style="margin: 0; box-sizing: border-box;">
          <div class="wrapper">
              <script src="${GistUtil.getUrl(this.codeUrl)}"></script>
          </div>
        </body>
      </html>
    `;

    doc.open();
    doc.write(content);
    setTimeout(() => {
      const elementHeight = doc.querySelector('.wrapper').getBoundingClientRect().height;
      const height = elementHeight ? `${elementHeight}px` : '100%';
      this.height = {height};
      this.cd.detectChanges();
    }, 350); // TODO: Can we listen to changes in height?
    doc.close();
  }


}
