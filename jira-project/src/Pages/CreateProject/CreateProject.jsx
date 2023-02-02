import React, { useEffect, useRef } from 'react'
import { createProjectApi, getAllProjectCategoryApi } from '../../redux/reducers/projectReducer';
import { Editor, tinymce } from '@tinymce/tinymce-react';
// import UserProfile from './UserProfile.css'
import { Breadcrumb } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const CreateProject = () => {
    const { arrProjectCategory } = useSelector(state => state.projectReducer)
    const dispatch = useDispatch();

    
    let [state,setState] = useState({
        value:{projectName:'',description:'',categoryId:1},
        error:{projectName:''}
    })
    const getAllProjectCategoryAction= async ()=>{
        const action = getAllProjectCategoryApi()
        dispatch(action);
    }
    useEffect(() => {
        getAllProjectCategoryAction();
      }, [])
   
    const handleChange=(e)=>{
        let {value,name}=e.target;
        let newValue = {...state.value}
        let newError = {...state.error}
        newValue ={...newValue,[name]:value}
        
        //check form rong
        if(value.trim()===''){
            newError[name]='Project name is valid !'; 
        } else{
            newError[name] = '';
        }
        setState({
            ...state,
            value: newValue,
            error: newError
        })
        console.log(state.value)
    }
    const handleEditorChange = (content, editor) => {
        let name = 'description'
        let newValue = {...state.value}

        newValue = {...newValue,[name]:content}
        setState({
            ...state,
            value: newValue
        })
        console.log(state.value)
    }
    const handleSubmit=()=>{
        const action = createProjectApi(state.value);
        dispatch(action);
    }
  return (
    <div className='container' style={{maxWidth:'900px'}}>
        
        
        <Breadcrumb>
            <Breadcrumb.Item>
            <a href="./project">Project</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Create project</Breadcrumb.Item>
        </Breadcrumb>
        <h3>New project</h3>
        <form onSubmit={handleSubmit} className="form-card p-5 bg-light">
            <fieldset className="form-fieldset">
            <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Project name <span className='text-danger'>*</span></label>
                    <input name='projectName' value={state.value.projectName} required  className="form-control" id="exampleFormControlInput1" placeholder="Project name" onChange={handleChange}/>
                    <span className='text-danger'><i>{state.error.projectName}</i></span>
                </div>
                <div className="mb-3">
                    <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r">Project category <span className="text-danger">*</span></label>
                    <select name='categoryId' className="form-select" aria-label="Default select example" onChange={handleChange}>
                        {arrProjectCategory.map((item,index)=>{
                            
                            return <option className='optionCate' key={index} value={item.id}>{item.projectCategoryName}</option> 
                           
                        })}
                        {/* <option value="1">Du an web</option>
                        <option value="2">Du an phan mem</option>
                        <option value="3">Du an di dong</option> */}
                    </select>
                </div>
                
                
                <div className="w-full">
                    <div className="ant-slider mt-5">
                        <div className="ant-slider-rail" />
                        <div className="ant-slider-track" style={{ left: '0%', right: 'auto', width: '100%' }} />
                        <div className="ant-slider-step" />
                        <div tabIndex={0} className="ant-slider-handle" role="slider" aria-valuemin={0} aria-valuemax={5} aria-valuenow={5} aria-disabled="false" style={{ right: 'auto', transform: 'translateX(-50%)', left: '100%' }} />
                        <div className="ant-slider-mark" />
                    </div>
                </div>
                <div>

                <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r form-label">Descrition</label>
                        
                    <Editor
                    name='description'
                        apiKey='gzd8t3qd2hvhzh2yzg4gerpdggkgeqc4rwl9qsi3s4e4zq6s'
                        
                        onEditorChange={handleEditorChange}
                        init={{
                        height: 200,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        
                    />
                </div>
            </fieldset>
            <button className="btn btn-primary btn-lg" type="submit">
                    Create
            </button>
        </form>
    </div>
  )
}

export default CreateProject


