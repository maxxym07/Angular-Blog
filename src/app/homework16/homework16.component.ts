import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Mainservice} from 'src/app/shared/services/mainservice.service';

import { IUser } from "src/app/shared/interfaces/user.interface";
import { IBlog } from "src/app/shared/interfaces/blog.interface";
import { User } from "src/app/shared/models/user.model";
import { Blog } from "src/app/shared/models/blog.model";


@Component({
  selector: 'app-homework16',
  templateUrl: './homework16.component.html',
  styleUrls: ['./homework16.component.scss']
})
export class Homework16Component implements OnInit {
  modalRef: BsModalRef;//for modal
  
  arrUsers:Array<IUser>=[]
  arrBlogs:Array<IBlog>=[]
  
  activeStatus: boolean;  ////change buttons in head
  singInStatus: boolean; ////change status of modal textcontent
  editStatus: boolean;   ///change status of modal save or edit
  checker: boolean;//check old user
  status: boolean;//check inputs
currentUser: IUser;

  username: string;//for login
  email: string;//for login
  password: string;//for login

  topic:string;
  postedBy: string;
  message:string;
  id: number = 1;
  

  constructor(private mainService:Mainservice, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUsers()
    this.getBlogs()
  }

  getUsers(): void{
    this.arrUsers=this.mainService.getServiseUsers()
  }

  getBlogs(): void{
    this.arrBlogs=this.mainService.getServiseBlogs()
  }


  singIn(template: TemplateRef<any>): void { ///modal
    this.singInStatus = false;
    this.modalRef = this.modalService.show(template);
  }

  singUp(template: TemplateRef<any>): void{
    this.singInStatus = true;
    this.modalRef = this.modalService.show(template);
  }

  openModalAdd(template: TemplateRef<any>): void{
    this.modalRef = this.modalService.show(template);
  }
  
  singUpUser(): void{
    this.mainService.getServiseUsers().forEach(a => {
      if (a.username === this.username.toLowerCase() || a.email === this.email.toLowerCase()) {
        this.checker = true;
        this.status = true;
      }
    });

    if (this.username && this.password && this.email) {
      const newUser = new User(this.id, this.username, this.email, this.password);
      if (this.arrUsers.length > 0) {
        newUser.id = this.arrUsers.slice(-1)[0].id + 1;
      }
      this.mainService.addUser(newUser);
      this.activeStatus = true;
      this.resetModal()
      this.username = newUser.username
      this.status = false;
      this.checker = false;
    }
  }


  singInUser(): void{
    let searchUser: boolean;
    this.mainService.getServiseUsers().forEach(a => {
      if (a.password === this.password && a.email === this.email.toLowerCase()) {
        this.currentUser = a;
        searchUser = true;
        this.activeStatus = true;
      }
      
    });
   
    if (this.currentUser != undefined) {
      this.resetModal()
      this.username = this.currentUser.username
    }
    else {
      alert('User not found!')
    }
  }

  singOut(): void{
    this.username = '';
    this.currentUser = undefined;
    this.activeStatus = false
    this.resetModal();
    this.resetBlog()
  }

  submitBlog(): void{
    let date = Date.now()
    const newBlog = new Blog(this.id, this.topic, this.postedBy, this.message, date);
    if (!this.editStatus) {
      if (this.arrBlogs.length > 0) {
        newBlog.id = this.arrBlogs.slice(-1)[0].id + 1;
      }
      if (this.topic != '' && this.message != '') {
        newBlog.postedBy=this.username
        newBlog.topic=this.topic
        this.mainService.addBlog(newBlog);
        this.resetBlog()
      }
      else {
        alert('All fields must be filled')
      }
    }
    if (this.editStatus) {
      this.mainService.updateBlog(newBlog);
      this.editStatus = false;
      this.resetBlog()
    }
  }

  deleteBlog(blog: IBlog): void{
    if (confirm('Are you sure?')) {
      this.mainService.deleteBlog(blog)
    }
  }

  editBlog(template: TemplateRef<any>, blog: IBlog) {
    this.modalRef = this.modalService.show(template);
    this.topic = blog.topic;
    this.message = blog.message;
    this.id = blog.id;
    this.postedBy = this.username;
    this.editStatus=true
  }
  
 private resetModal(): void{ //reset modal window
   this.modalService.hide(1)
   this.id = 1;
   this.email = '';
   this.password = '';
this.topic=''
  }

 private resetBlog(): void{
  this.modalService.hide(1);
   this.postedBy = '';
   this.message = '';
   this.editStatus = false;
   this.id = 1;
  }

}
