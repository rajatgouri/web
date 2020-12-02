import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../product/services';

@Component({
  selector: 'categories-bar',
  templateUrl: './categories.html'
})
export class CategoriesComponent implements OnInit {
  constructor(private router: Router, private categoryService: CategoryService) { }
  public tree: any = [];

  ngOnInit() {
    console.log("In Side Bar");
    this.categoryService.tree()
      .then(resp => this.tree = resp);
  }

  search(item: any) {
    // nativate to search page
    this.router.navigate(['/products/search'], {
      queryParams: { categoryId: item._id }
    });
  }
}
