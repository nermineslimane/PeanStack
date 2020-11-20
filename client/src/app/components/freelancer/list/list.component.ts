import { ProjectService } from './../../../services/project.service';
import { FreelancerService } from '../../../services/freelancer.service';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  freelancers$: Observable<any[]>;
  filter = new FormControl('');
  freelancers: any[];
  closeResult = '';

  formm: any = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    website: '',
    address: '',
  };

  constructor(
    private freelancerService: FreelancerService,
    private router: Router,
    private modalService: NgbModal,

  ) {
    console.log(123);
  }

  ngOnInit(): void {
    console.log(123);
    this.retrieveFreelancer();
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.freelancerService
            .create(this.formm)
            .subscribe((data) => this.retrieveFreelancer());
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  

  modelChangeFn(event: any) {
    // without type info
    //console.log(event);
    this.formm = { ...this.formm, [event.target.name]: event.target.value };
    console.log(this.formm);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  search(text: string): any[] {
    return this.freelancers.filter((freelancer) => {
      const term = text.toLowerCase();
      return (
        freelancer.firstName.toLowerCase().includes(term) ||
        freelancer.lastName.toLowerCase().includes(term) ||
        freelancer.email.toLowerCase().includes(term)
      );
    });
  }

  details(id) {
    console.log(id);
    this.router.navigate(['details', { id }]);
  }
  

  retrieveFreelancer(): void {
    this.freelancerService.getAll().subscribe(
      (data) => {
        console.log(data);
        this.freelancers = data;
        console.log(this.freelancers);
        this.freelancers$ = this.filter.valueChanges.pipe(
          startWith(''),
          map((text) => this.search(text))
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
