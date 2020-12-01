import React,{useState,useEffect} from 'react'
import RLDD from 'react-list-drag-and-drop/lib/RLDD';
import { XCircle,PlusCircle } from 'react-feather';
import {DebounceInput} from 'react-debounce-input';
import {Redirect} from 'react-router-dom'

function Home() {
    const [value,setValue] = useState('')
    const [profile,setProfile] = useState({
        name:'dfgdfg',
        age:'34',
        gender:'Female',
        skills: [
            {
                id:Math.random()+Date.now(),
                title:'Apple',
            }
        ]
    })
    // const data = JSON.parse(localStorage.getItem('profile'))
    // if(data!==null && data!==undefined) setProfile(data)
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('profile'))
        if(data!==null)setProfile(data)
        
        // localStorage.setItem('profile',JSON.stringify(profile))
    },[])
    const handleProfile = e => {
        localStorage.setItem('profile',JSON.stringify({...profile,[e.target.name]:e.target.value}))
        setProfile({...profile,[e.target.name]:e.target.value})
    }
    const handleRLDDChange=(reorderedItems)=> {
        localStorage.setItem('profile',JSON.stringify(profile))
        setProfile({...profile,skills:reorderedItems});
      }
    
    const deleteItem = id =>{
        let data = {...profile,skills: profile.skills.filter(item=>item.id!==id)}
        localStorage.setItem('profile',JSON.stringify(data))
        setProfile(data)
    }
    const addItem = () => {
        if(value!==''){
            let data = {...profile,skills: [...profile.skills,{
                id: Math.random()+Date.now(),
                title: value
            }]}
            localStorage.setItem('profile',JSON.stringify(data))
            setProfile(data)
        }
        setValue('')
        setTimeout(()=>{
            console.log(profile)
        },3000)
    }
    const userdata = JSON.parse(localStorage.getItem('user'))
    if(userdata===null || userdata.loggedIn===false)return <Redirect to='/login' />
    return (
        <div>
            <p className='display-3 text-center'>Profile</p>

            <div className='container col-12 col-md-6'>
                <div className='row col-12 mx-auto'>
                    <div className='col-6 mb-3 text-left'>
                        <label htmlFor="name">Name</label>
                        <DebounceInput
                            debounceTimeout={2000}
                            onChange={handleProfile}
                            name='name'
                            placeholder='Enter name'
                            className='form-control'
                            value={profile.name} />
                    </div>
                    <div className='col-6 mb-3 text-left'>
                        <label htmlFor="age">Age</label>
                        <DebounceInput
                            debounceTimeout={2000}
                            onChange={handleProfile}
                            name='age'
                            type='number'
                            placeholder='Enter age'
                            className='form-control'
                            value={profile.age} />
                    </div>
                    <div className='col-12 text-left mb-3'>
                        <label htmlFor="gender">Gender</label>
                        <select className="form-control" value={profile.gender}
                        onChange={handleProfile} name='gender'
                        id="sel1">
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='col-12 col-md-5 mx-auto p-2 rounded border border-dark'>
                <h4>Skills</h4>
                <div className="col-12 row mx-auto mb-2 rounded pl-0">
                    <div className='col-10 p-0'>
                        <input type="text" name="value" placeholder='Add items'
                        value={value} className='form-control form-control-lg border border-dark'
                        onChange={e=>setValue(e.target.value)} />
                    </div>
                    <div className='col-2 text-right p-0'>
                        <PlusCircle style={{cursor:'pointer'}} onClick={addItem} />
                    </div>
                </div>
                <RLDD
                items={profile.skills}
                itemRenderer={(item,index)=>(
                    <div className="col-12 mb-2 item p-3 rounded border border-dark"
                    style={{backgroundColor:'#69EAC5',border:'gray'}}>
                        <h4 className='text-left'>{`${index+1}. ${item.title} `} 
                        <XCircle className='float-right' style={{cursor:'pointer'}}
                        onClick={()=>deleteItem(item.id)}  /></h4>
                    </div>
                )}
                onChange={handleRLDDChange}
                />
            </div>
        </div>
    )
}

export default Home
