import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import hljs from 'highlight.js';
import * as marked from 'marked';

@Pipe({
  name: 'htmlPipe'
})
export class HtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer){}

  transform(value: string): unknown {
    marked.setOptions({
      langPrefix: 'hljs ',
      highlight: function(code, language) {
        const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
        const highlights = hljs.highlight(validLanguage, code).value;
        return highlights;
      },
    });

    const html = marked(value);

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
