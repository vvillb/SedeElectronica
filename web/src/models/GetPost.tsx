import React, { useState, useEffect } from 'react';
import './axiosExample.css'
import { PostType } from './post.interface';
import {Post}  from '../api/api';
//import { Post } from '../api/api';





const GetPost = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [isError, setIsError] = useState<boolean>(false);


    useEffect(() => {
            Post.getPosts()
            .then((data) => {
                setPosts(data);
            })
            .catch((err) => {
                setIsError(true);
            });
        return () => {};
    }, []);
    return (
        <>
            <h2 className='axiosExample'>Leer publicación</h2><br />
            <h3 className='axiosExample'>lista de publicaciones</h3>

            <div className='gridAxios'>
                {
                    posts.map(post => (
                        <div key={post.id} className='axiosExample'>
                            <p className='axiosExample'>ID: <span className='axiosExample'>{post.id}</span></p>
                            <p className='axiosExample'>Título: <span>{post.title}</span></p>
                            <p className='axiosExample'> <span>{post.body}</span></p>
                            <p className='axiosExample'>Autor: <span>{post.userId}</span></p>
                        </div>
                    ))
                }
            </div>
        </>
    );
};


export default GetPost;