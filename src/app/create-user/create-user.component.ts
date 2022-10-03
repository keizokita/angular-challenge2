import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from '../usersList/user.service';
import { Location } from '@angular/common';
import { User } from '../usersList/users.model';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

formCreate!: FormGroup;

deleteModalRef!: BsModalRef;

userSelected!: User;

submitted = false;

user?: User[];

name = '';
email = '';
gender = '';
status = '';

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.formCreate = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      email: ['',[Validators.email]],
      gender: ['',[Validators.required]],
      status: ['',[Validators.required]],
    });

    this.route.params.subscribe((params: any) => {
      const id = params.id;
      if (id !== undefined) {
        this.service.loadByID(id).subscribe((users) => {
          this.formCreate.patchValue(users);
        });
      }
    });
  }

  verifyValidTouched(campo: any){
    return !campo.valid && campo.touched;
  }

  aplyCssError(campo: any){
    return {
      'is-invalid': this.verifyValidTouched(campo),
      'has-feedback': this.verifyValidTouched(campo)
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.formCreate.valid) {
      this.service.save(this.formCreate.value);
      this.location.back();
    }
    this.service.list().subscribe((dados) => (this.user = dados));
  }

  onDelete(deleteModal: TemplateRef<any>, user: any) {
    this.openModal(deleteModal);
    this.userSelected = user;
  }

  openModal(deleteModal: TemplateRef<any>) {
    this.deleteModalRef = this.modalService.show(deleteModal, {
      class: 'modal-sm',
    });
  }

  onConfirmDelete(user: any) {
    console.log(this.userSelected.id);
    this.service
      .remove(this.userSelected)
      .subscribe((success) => this.deleteModalRef.hide());
    this.service.list().subscribe((dados) => (this.user = dados));
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

}
