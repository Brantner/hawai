import {Component, Input, ViewEncapsulation, OnChanges, SimpleChanges} from "@angular/core";
import {Observable} from "rxjs";
import {Category, MenuService} from "../menu.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnChanges {
  @Input() date: Date;

  categories$: Observable<Category[]>;
  totalCount$: Observable<number>;

  constructor(public menuService: MenuService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.reload();
  }

  private reload() {
    this.categories$ = this.menuService.getMenuFor(this.date).share();
    this.totalCount$ = this.categories$
      .flatMap(categories => categories)
      .flatMap(category => category.Menus)
      .reduce((acc, menu) => acc + menu.Price * menu.quantity, 0);
  }

  addMenuItem(menuId: number) {
    this.menuService.addMenuItem(menuId).subscribe(() => this.reload());
  }

  removeMenuItem(menuId: number) {
    this.menuService.removeMenuItem(menuId).subscribe(() => this.reload());
  }
}
