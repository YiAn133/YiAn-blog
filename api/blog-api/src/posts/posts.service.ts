import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { Post } from './entities/post.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify'
import { ParseIntPipe } from '@nestjs/common';

@Injectable()
export class PostsService {

  constructor(@InjectRepository(Post) private readonly postRepository:Repository<Post>){}


  async create(createPost: CreatePostDto) {
    // 逻辑：先将创建文章的标题进行查询，看看有没有相同的
    const {title} = createPost
    if(!title){
      throw new HttpException("标题不能为空",401)
    }

    const findPosts = await this.postRepository.findOne({where:{title}})
    if(findPosts){
      throw new HttpException("文章已经存在",401)
    }
    // 这个是用来进行url搜索的
    // const slug = slugify(createPost.title, { lower: true,strict:true ,replacement:"-"});
    // console.log(slug);
    
    const postEntity =  this.postRepository.create({
      ...createPost,
      
    })
    return await this.postRepository.save(postEntity);
  }

  // 查询全部的文章,自动过滤掉delect不为null的
  async findAll() {
    return await this.postRepository.find({
      order:{createdAt:"DESC"}
    }) ;
  }

  async findOne(id: number) {
    const findPost = await this.postRepository.findOne({where:{id}})
    if(!findPost){
      throw new HttpException("要查找的文章不存在",401)
    }
    return findPost;
  }

  // 更新文章
  async update(id: number, updatePost: CreatePostDto) {
    const findPost = await this.postRepository.findOne({where:{id}})
    if(!findPost){
      throw new HttpException("要修改的文章不存在",401)
    }
    // const slug = slugify(updatePost.title,{ lower: true,strict:true ,replacement:"-"})
    const postEntity = this.postRepository.create({
      ...updatePost,
      // slug
    })

    const update =  this.postRepository.merge(findPost ,postEntity )
    return this.postRepository.save(update)
  }

  // 删除文章
  async remove(id: number) {
    if(isNaN(id)){
      throw new HttpException("要删除的文章id必须是合法数字",401)
    }
    const findPost = await this.postRepository.findOne({where:{id}})
    if(!findPost){
      throw new HttpException("要删除的文章不存在",401)
    }
    return await this.postRepository.remove(findPost)
  }
}
