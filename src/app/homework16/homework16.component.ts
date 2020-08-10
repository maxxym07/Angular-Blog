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
  config = {
    ignoreBackdropClick: true
  }

  arrBlogs: Array<IBlog> = [];
  arrUsers: Array<IUser> = [];
  regExpFirst: RegExp = /^[a-zA-Z0-9]{2,20}$/;
  regExpSecond: RegExp = /^[\w\.\-]{1,}@\w{1,}\.\w{2,7}$/;
  regExpThird: RegExp = /^[a-zA-z0-9]{5,10}$/;
  topic = '';
  message = '';
  postedBy: string;
  username: string;
  email: string;
  password: string
  id: number = 1;
  currentUser: IUser;
  signStatus: boolean;
  signInStatus: boolean;
  editStatus: boolean;


  constructor(private mainService:Mainservice, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUsers()
    this.getBlogs()
  }

  private getBlogs(): void {
    this.arrBlogs = this.mainService.getServiseBlogs()
  }

  private getUsers(): void {
    this.arrUsers = this.mainService.getServiseUsers()
  }

  signIn(template: TemplateRef<any>) {
    this.signInStatus = false;
    this.modalRef = this.modalService.show(template,this.config);
  }

  signUp(template: TemplateRef<any>) {
    this.signInStatus = true;
    this.modalRef = this.modalService.show(template,this.config);
  }

  openModalAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,this.config);
  }

  signUpUser(): void {
    let checkUser: boolean;
    this.mainService.getServiseUsers().forEach(a => {
      if (a.username === this.username.toLowerCase() || a.email === this.email.toLowerCase()) {
        checkUser = false;
        alert("This user is already registered. Please change username or email");
      }
    });
    if (this.username != '' && this.password != '' && this.email != '') {
      const newUser = new User(this.id, this.username, this.email, this.password);
      if (this.arrUsers.length > 0) {
        newUser.id = this.arrUsers.slice(-1)[0].id + 1;
      }
      this.mainService.addUser(newUser);
      this.signStatus = true;
      this.resetUser();
      this.username = newUser.username;
    }
  }

  signInUser(): void {
    let searchUser: boolean;
    this.mainService.getServiseUsers().forEach(a => {
      if (a.password === this.password && a.email === this.email.toLowerCase()) {
        this.currentUser = a;
        searchUser = true;
        this.signStatus = true;
      }
    }
    );
    if (this.currentUser != undefined) {
      this.resetUser();
      this.username = this.currentUser.username;
    }
    else {
      alert('User not found!');
    }
  }

  signOut() {
    this.username = '';
    this.currentUser = undefined;
    this.signStatus = false;
    this.resetBlog();
    this.resetUser();
  }

  submitBlog(): void {
    let date = Date.now()
    const newBlog = new Blog(this.id, this.postedBy, this.topic,this.message,date);
    if (!this.editStatus) {
      if (this.arrBlogs.length > 0) {
        newBlog.id = this.arrBlogs.slice(-1)[0].id + 1;
      }
      if (this.topic != '' && this.message != '') {
        newBlog.postedBy = this.username;
        this.mainService.addBlog(newBlog);
        this.resetBlog();
      }
      else {
        alert('All fields must be filled!')
      }
    }
    else {
      this.mainService.updateBlog(newBlog); 
      
      this.editStatus = false;
      this.resetBlog();
    }
  }

  deleteBlog(blog: IBlog): void {
    if (confirm('Are you sure?')) {
      this.mainService.deleteBlog(blog);
    }
  }

  editBlog(template: TemplateRef<any>, blog: IBlog) {
    this.modalRef = this.modalService.show(template,this.config);
    this.topic = blog.topic;
    this.message = blog.message;
    this.id = blog.id;
    this.postedBy = blog.postedBy;
    this.editStatus = true;
  }

  private resetBlog(): void {
    this.modalService.hide(1);
    this.topic = '';
    this.message = '';
    this.editStatus = false;
    this.id = 1;
  }
  
  private resetUser(): void {
    this.modalService.hide(1);
    this.id = 1;
    this.email = '';
    this.password = '';

  }

}
