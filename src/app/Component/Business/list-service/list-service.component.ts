import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  TestService(){
    this.router.navigateByUrl('SelfAppraisal');
  }

}
