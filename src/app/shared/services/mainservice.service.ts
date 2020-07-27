import { Injectable } from '@angular/core';
import { IUser } from "src/app/shared/interfaces/user.interface";
import { IBlog } from "src/app/shared/interfaces/blog.interface";

@Injectable({
  providedIn: 'root'
})
export class Mainservice {

  date = Date.now()

  private arrBlogs: Array<IBlog> = [{
    id: 1,
    topic: 'First post',
    postedBy:'admin',
    message: 'Sing up to create your account adn start to use Angular blog',
    date: `${this.date}`
  },]

  private arrUsers: Array<IUser>=[
    {
      id: 1,
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'admin'
    }
  
]

  constructor() { }

  getServiseUsers(): Array<IUser>{
    return this.arrUsers
  }

  getServiseBlogs(): Array<IBlog>{
    return this.arrBlogs
  }

  addBlog(blog: IBlog): void {
    this.arrBlogs.push(blog);
  }

  deleteBlog(blog: IBlog): void{
    const index = this.arrBlogs.findIndex(b => b.id === blog.id);
    this.arrBlogs.splice(index, 1);
  }

  updateBlog(blog: IBlog): void {
    const index = this.arrBlogs.findIndex(b => b.id === blog.id);
    this.arrBlogs.splice(index, 1, blog);
  }

  addUser(user: IUser): void {
    this.arrUsers.push(user);
  }


}
