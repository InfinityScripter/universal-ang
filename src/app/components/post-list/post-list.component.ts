import {Component, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {


  posts: any[] | undefined;
  data: any = {}
  post: any | undefined;
  id: any = null;

  constructor(private postService: PostService) {
  }

  getPosts() {
    this.postService.getPosts().subscribe(data => {
      this.posts = data as any[];
    });
  }

  getPost(id: any) {
    this.postService.getPost(id).subscribe(data => {
      console.log(data);
      this.post = data;
    });
  }

  updatePost(id: any, data: any) {
    this.postService.updatePost(id, data).subscribe(data => {
      console.log(data);
      this.post = data;
    });
  }

  resetPosts() {
    this.posts = undefined;
    this.post = undefined;
  }

  addPost( data: any) {
    this.postService.createPost(data).subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit() {

  }
}
