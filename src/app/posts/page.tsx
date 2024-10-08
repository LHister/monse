"use client"

import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/js/dist/dropdown.js'
import 'bootstrap/js/dist/collapse.js'
import Nav from '../profile/nav/nav'
import Post from './post/post'
import Video from './video/Video'
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Requests } from './../utiles/Requests'

function Posts(){
    const url = localStorage.getItem('baseUrl')
    const searchParams = useSearchParams();
    const [isPost, setIsPost] = useState<boolean>(true)
    const [postData,setPostData] = useState<any>({
        id : 1,
        author:{
            id:0,
            username:'',
            profile_picture:'',
        },
        comments:[]
    })

    async function getPost(id:string){
        const Req = new Requests()
        await Req.getSinglePost(id,setPostData)
    }

    async function getVideo(id:string){
        const Req = new Requests()
        await Req.getSingleVideo(id,setPostData)
        setIsPost(false)
    }

    useEffect(()=>{
        const ID = searchParams.get('id');
        const V = searchParams.get('v')
        ID && !V ?  getPost(ID) : V && !ID ? getVideo(V) : getPost('1');
    },[searchParams])

    return (
        <>
            <div className="nav-md col-12 mt-1 d-flex flex-column align-items-center">
                <div className="nav-cont col-11  position-fixed">
                    <Nav
                        page="POSTS"
                    />
                </div>
            </div>
            <div className="container col-12 d-flex justify-content-center mt-5 pt-3">
                {
                    postData != undefined ? 
                        isPost ?
                            <Post
                                postID={postData.id}
                                authorId={postData.author.id}
                                user={postData.author.username}
                                title={postData.title}
                                userImg={`${url}${postData.author.profile_picture}`}
                                postImg={`${url}${postData.img}`}
                                postContent={postData.body}
                                commentsCount={postData.comments_count}
                                postComments={postData.comments}
                                ago={postData.created_at}
                                setPostData={setPostData}
                            />
                            :
                                <Video
                                    key={postData.id}
                                    postID={postData.id}
                                    authorId={postData.author.id}
                                    user={postData.author.username}
                                    title={postData.title ? postData.title : ''}
                                    userImg={`${url}${postData.author.profile_picture}`}
                                    video={`${url}${postData.video}`}
                                    videoContent={postData.body}
                                    videoComments={postData.comments}
                                    videoCommentsCount={postData.comments_count}
                                    ago={postData.created_at}
                                    likesCount={postData.likes_count}
                                    isReacted={postData.isReacted}
                                    setReacted={()=>{}}
                                    setPostData={setPostData}
                                />
                    : 
                        <div className='alert col-11 alert-danger d-flex justify-content-center align-items-center '>There is no post</div>
                }
            </div>
            
        </>
    )
}

export default Posts