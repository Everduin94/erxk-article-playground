import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-filler-example',
  template: `
    <p>
      This is a filler; replace me.
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FillerExampleComponent {


}
