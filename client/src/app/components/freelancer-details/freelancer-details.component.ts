import { ProjectService } from '../../services/project.service';
import { Observable } from 'rxjs';
import { FreelancerService } from '../../services/freelancer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-freelancer-details',
  templateUrl: './freelancer-details.component.html',
  styleUrls: ['./freelancer-details.component.css'],
})
export class FreelancerDetailsComponent implements OnInit {
  isLoading: boolean = false;
  freelancer: Observable<any>;
  closeResult = '';
  id: any;

  formProject: any = {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    duration: '',
  };

  constructor(
    private freelancerService: FreelancerService,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.freelancerService.get(this.id).subscribe((result) => {
      this.freelancer = result;
      this.isLoading = true;
      console.log(this.freelancer);
    });
  }
  deleteProject(p: any): void {
    if (new Date().getTime() > new Date(p.startDate).getTime()) {
      alert('project already started');
    } else {
      console.log(p.id);
      this.projectService.delete(p.id).subscribe((data) => {
        alert(data.message);
        this.ngOnInit();
      });
    }
  }
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.projectService
            .create(this.formProject)
            .subscribe((newProject) => {
              this.freelancerService
                .addProject(this.id, newProject.id)
                .subscribe((data) => {
                  this.ngOnInit();
                });
            });
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  updateendDate(value) {}

  modelChangeFn(event: any) {
    // without type info
    //console.log(event);
    this.formProject = {
      ...this.formProject,
      [event.target.name]: event.target.value,
    };
    console.log(this.formProject);
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
}
