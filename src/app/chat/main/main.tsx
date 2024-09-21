"use client"

import User from './../user/user'
import { Requests } from './../../utiles/Requests'
import { useEffect, useState } from 'react'
import Toast from '../toast/toast'

function Main(){
    const token = localStorage.getItem('token')
    const [Users,setUsers] = useState<any[]>([{'id':0}])
    const [searchQuery,setSearchQuery] = useState<string>()
    const [inbox , setInbox] = useState<any[]>([])
    const [isInbox, setIsInbox] = useState<boolean>(true)
    
    const baseUrl = localStorage.getItem('baseUrl')

    if(!token){
        window.location.href = '../'
    }

    async function getUsers(){
        const Req = new Requests()
        const data = await Req.getUsers()
        await setUsers(data.users)
    }
    

    async function getInboxAlerts(){
        const Req = new Requests()
        const data = await Req.getInboxAlerts()
        data ? setInbox(data.inbox) : null
    }


    async function search(){
        const Req = new Requests()
        const data = await Req.search(searchQuery)
        setUsers(data.users)
    }

    useEffect(()=>{
        getUsers()
        getInboxAlerts()
    },[])

    


    return (
        <div className="container chat mt-5 rounded">
            <div className="card col-12 mb-sm-3 mb-md-0 contacts_card">
                <div className="card-header">
                    <div className="input-group">
                        <input 
                            type="text"
                            placeholder="Search..."
                            className="form-control search bg-light" 
                            onChange={async (e)=>{    
                                await setSearchQuery(e.target.value)
                                e.target.value ? search() : getUsers()
                            }}
                            value={searchQuery}
                        />
                    </div>
                </div>
                <hr className="mx-3 my-4"/>
                <div className="card-body contacts_body">
                    <ul className="contacts">
                        <li>
                            <User 
                                user={{
                                    id:0,
                                    username:" Inbox",
                                    profile_picture:`/media/media/inbox.png`
                                }}
                                profileImg = {`${baseUrl}/media/media/inbox.png`}
                                state='online'
                                setInbox={setIsInbox}
                            />
                        </li>
                        {   Users ?
                                Users.map((e , index)=>{
                                    return <li key={index}> <User 
                                            user={e}
                                            profileImg = {`${baseUrl}${e.profile_picture}`}
                                            state='online'
                                            setInbox={setIsInbox}
                                        /> 
                                    </li>
                                })
                            :
                                <li>
                                    <div className="alert alert-primary text-center">
                                        <h4>No users found</h4>
                                    </div>
                                </li>
                        }
                    </ul>
                </div>
                <div className="card-footer"></div>
            </div>
        </div>
    )
}

export default Main

