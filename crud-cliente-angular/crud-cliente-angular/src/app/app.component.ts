import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crud-cliente-angular';

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  onHome() {
    this.router.navigateByUrl('/');
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnInit(): void {
  }
}
