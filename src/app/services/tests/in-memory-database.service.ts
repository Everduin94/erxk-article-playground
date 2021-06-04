import { InMemoryDbService } from "angular-in-memory-web-api";
import {Injectable} from "@angular/core";
import { Observable } from "rxjs";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";
import { faScroll } from "@fortawesome/free-solid-svg-icons/faScroll";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons/faBoxOpen";
import { createWorkOrder, WorkOrder, WorkOrderCode } from "src/app/state/workorders";
import { User } from "src/app/state/user/user.store";
import { WorkOrderStatus } from "src/app/state/models/workorderstatus";
import {createSnippet, Snippet} from "../../state/snippets";
import {ComponentKeys} from "../../state/models/component-key-map";

@Injectable({
  providedIn: "root",
})
export class InMemoryDatabaseService implements InMemoryDbService {
  createDb(): {} | Observable<{}> | Promise<{}> {
    // Examples
    const users: Array<User> = [];

    const workOrders: Array<WorkOrder> = [
      createWorkOrder({id: '1', status: WorkOrderStatus.ON_HOLD}),
      createWorkOrder({id: '2'}),
      createWorkOrder({id: '3'}),
      createWorkOrder({id: '4'}),
      createWorkOrder({id: '5'}),
      createWorkOrder({id: '6'}),
      createWorkOrder({id: '7'}),
      createWorkOrder({id: '8'}),
      createWorkOrder({id: '9'}),
      createWorkOrder({id: '10'}),
    ];

    const workOrderCodes: Array<WorkOrderCode> = [{ id: "1", code: 1, description: "Basic" }];

    // Meta
    const articles: Array<any> = [
      { id: "rxjsfilter", name: "RxJS Filter", description: "Declarative Conditional Statements", imageUrl: "https://cdn-images-1.medium.com/max/1000/1*zZfn8N-ueDcf3a2XTP409Q.png", icon: faFilter },
      { id: "formTips", name: "Form Tips", description: "Reactive Forms Tips and Tricks", imageUrl: "https://cdn-images-1.medium.com/max/1000/1*_TC9-wK2EiUfA8KQxSQE5g.png", icon: faScroll },
      { id: "ngTemplate", name: "NG Template", description: "Flexible Components with Ng Template", imageUrl: "https://cdn-images-1.medium.com/max/800/1*E689gI8M0r9N-uhxDjOeAA.png", icon: faBoxOpen },
    ];

    const snippets: Array<Snippet> = [
      { id: "10", groupId: "ngTemplate", order: 1, component: ComponentKeys.loadingExample, label: "Single", code: 'https://gist.github.com/Everduin94/69565c85b31521a5ada70edb16db2c50?file=single.html', description: `All tabs use same example. "statusLoader" passes a status property to help determine what our component renders`},
      { id: "11", groupId: "ngTemplate", order: 2, component: ComponentKeys.loadingExample, label: "Multi", code: 'https://gist.github.com/Everduin94/69565c85b31521a5ada70edb16db2c50?file=multi.html', description: `All tabs use same example. Same as single, add examples by defining new ngTemplateOutlet and ContentChild`},
      { id: "12", groupId: "ngTemplate", order: 3, component: ComponentKeys.loadingExample, label: "Conditional", code: 'https://gist.github.com/Everduin94/69565c85b31521a5ada70edb16db2c50?file=conditional.html', description: `All tabs use same example. Display different template based on property`},
      { id: "13", groupId: "ngTemplate", order: 4, component: ComponentKeys.loadingExample, label: "Nested", code: 'https://gist.github.com/Everduin94/69565c85b31521a5ada70edb16db2c50?file=nested-conditional.html', description: `All tabs use same example. Display different templates based on content passed in`},
      { id: "14", groupId: "ngTemplate", order: 5, component: ComponentKeys.loadingExample, label: "Pass Content", code: 'https://gist.github.com/Everduin94/69565c85b31521a5ada70edb16db2c50?file=pass-content.html', description: `All tabs use same example. Most complex example. Pass data / content to templates. In our example, "cause" would be a property in our component typescript`},
      { id: "15", groupId: "ngTemplate", order: 6, component: ComponentKeys.ngContentExample, label: "Bad Ng Content", code: 'https://gist.github.com/Everduin94/69565c85b31521a5ada70edb16db2c50?file=bad-ng-content.html', description: `ngOnInit is called before the component is actually rendered, causing the following issues.`},
      { id: "20", groupId: "rxjsfilter", order: 1, component: ComponentKeys.rxjsFilter, label: "Basic", code: 'https://gist.github.com/Everduin94/233f198fd6a879cc1f83e23c937810b7', description: `WO "1" is selected and fires side effects`},
      { id: "21", groupId: "rxjsfilter", order: 2, component: ComponentKeys.rxjsFilterNested, label: "Nested", code: 'https://gist.github.com/Everduin94/4479c1c8c081e0179367ec72e6adcb74', description: `Selecting or Creating a WO fires appropriate observable(s). Note, editing is not enabled`},
      { id: "30", groupId: "formTips", order: 1, label: "Tips"},
    ].map(v => createSnippet(v));

    return { users, workOrders, workOrderCodes, articles, snippets };
  }
}
