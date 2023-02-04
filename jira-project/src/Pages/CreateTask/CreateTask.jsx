import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import ReactDOM from "react-dom";

import { useDispatch, useSelector } from 'react-redux';
import { getAllProjectApi } from '../../redux/reducers/projectReducer';
import { createTaskApi, getAllStatusApi, getPriorityApi, getTaskTypeApi, getUserByProjectIdApi } from '../../redux/reducers/taskReducer';

import Select from 'react-select'
const CreateTask = () => {
    const editorRef = useRef(null);
    const { allProject} = useSelector(state => state.projectReducer)
    const {arrStatus, arrPriority, arrTaskType, arrUserByProjectId } = useSelector(state => state.taskReducer)
    const dispatch = useDispatch();

    
    
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    let [state, setState] = useState({
        value: {
            listUserAsign: [],
            taskName: "",
            description: '',
            statusId:'',
            originalEstimate: 1,
            timeTrackingSpent: 1,
            timeTrackingRemaining: 1,
            projectId: '0',
            typeId: 1,
            priorityId: 1

        },
        error: {
            taskName: ''
        },
        userChoice:[]
    })
    
    const handleChange = (e) => {
        let { value, name } = e.target;
        let newValue = { ...state.value }
        let newError = { ...state.error }
        newValue = { ...newValue, [name]: value }

        for (let i = 0; i < state.userChoice.length; i++) {
            newValue['listUserAsign'].push(state.userChoice[i].value);
        }
        //check form rong
        
        if (value.trim() === '') {
            newError[name] = 'TaskName is valid !';
        } else {
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
    useEffect(() => {
        dispatch(getAllProjectApi());
        dispatch(getAllStatusApi());
        dispatch(getPriorityApi());
        dispatch(getTaskTypeApi());
        // if(state.value.projectId!==''){
        //     dispatch(getUserByProjectIdApi(state.value.projectId))
          
        // }
        dispatch(getUserByProjectIdApi(state.value.projectId))
    }, [state.value.projectId])
    
    let options = [];
    for (let i = 0; i < arrUserByProjectId.length; i++) {
        options.push({
            label: arrUserByProjectId[i].name,
            value:arrUserByProjectId[i].userId,
        });
    }
    const handleSubmit=()=>{
        const action = createTaskApi(state.value);

        dispatch(action);


    }
    return (
        <div >

            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{ marginRight: '0', maxWidth: '1000px' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Create Task</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div className=' ' style={{ backgroundColor: '#eeeeee', width: '100%', height: '100%', widows: '100%' }}>

                                <form className="form-card p-5 bg-light" onChange={handleChange}>
                                    <fieldset className="form-fieldset">
                                        {/* project */}
                                        <div className="mb-3">
                                            <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r">Project</label>
                                            <select name='projectId' className="form-select" aria-label="Default select example" >
                                                {allProject.map((item, index) => {
                                                    return <option key={index} value={item.id}>{item.projectName}</option>
                                                })}
                                                {/* <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option> */}
                                            </select>
                                            <span> <i>* You can only create task of your own project</i></span>
                                        </div>
                                        {/* task name */}
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Task name</label>
                                            <input value={state.value.taskName} required type="email" className="form-control" id="exampleFormControlInput1" placeholder="Task name" name="taskName"  />
                                            <span className='text-danger'><i>{state.error.taskName}</i></span>
                                        </div>
                                        {/* status */}
                                        <div className="mb-3">
                                            <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r">Status</label>
                                            <select name='statusId' className="form-select" aria-label="Default select example" >
                                                {arrStatus.map((item, index) => {
                                                    return <option key={index} value={item.statusId}>{item.statusName}</option>
                                                })}
                                                {/* <option  value="1">BACKLOG</option>
                                                <option value="2">SELECTED FOR DEVELOPER</option>
                                                <option value="3">IN PROGRESS</option> */}
                                            </select>
                                        </div>
                                        {/* priorityId */}
                                        <div className="row mb-3">
                                            <div className="col-6">
                                                <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r">Priority</label>
                                                <select name='priorityId' className="form-select" aria-label="Default select example" >
                                                    {arrPriority.map((item, index) => {
                                                        return <option key={index} value={item.priorityId}>{item.priority}</option>
                                                    })}
                                                    {/* <option  value="1">Hight</option>
                                                    <option value="2">Medium</option>
                                                    <option value="3">Low</option>
                                                    <option value="4">Lowest</option> */}
                                                </select>
                                            </div>
                                            <div className="col-6">
                                                <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r">Task type</label>
                                                <select name='typeId' className="form-select" aria-label="Default select example" >
                                                    {arrTaskType.map((item, index) => {
                                                        return <option key={index} value={item.id}>{item.taskType}</option>
                                                    })}
                                                    {/* <option  value="1">bug</option>
                                                    <option value="2">New task</option> */}
                                                </select>
                                            </div>
                                        </div>
                                        {/* listUserAsign */}
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Assigners</label>
                                            {/* <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Task name" /> */}
                                            {/* <select name='listUserAsign' className="form-select" aria-label="Default select example">
                                                {arrUserByProjectId.map((item,index)=>{
                                                    return <option key={index} value={item.userId}>{item.name}</option>
                                                })}
                                            </select> */}
                                            
                                            <Select
                                                isMulti
                                                name="listUserAsign"
                                                className="react-select"
                                                classNamePrefix="select"
                                                isClearable={false}
                                                options={options}
                                                closeMenuOnSelect={true}
                                                onChange={(choice)=>{
                                                    setState({
                                                        ...state,
                                                        userChoice: choice
                                                    })
                                                }}
                                            />
                                            <span></span>
                                        </div>
                                        <div className="row mb-3">

                                            <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r">Time Tracking</label>
                                            <div className="col-6">
                                                <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r">Total Estimated Hours</label>
                                                <input name="timeTrackingSpent" type="number" step='1' min="0" max="100" className="ant-input form-control" ></input>
                                            </div>
                                            <div className="col-6">
                                                <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r form-label">Hours spent</label>
                                                <input name="timeTrackingRemaining" type="number" step='1' min="0" max="100" className="form-control" defaultValue={0} ></input>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className="ant-slider mt-5">
                                                <div className="ant-slider-rail" />
                                                <div className="ant-slider-track" style={{ left: '0%', right: 'auto', width: '100%' }} />
                                                <div className="ant-slider-step" />
                                                <div tabIndex={0} className="ant-slider-handle" role="slider" aria-valuemin={0} aria-valuemax={5} aria-valuenow={5} aria-disabled="false" style={{ right: 'auto', transform: 'translateX(-50%)', left: '100%' }} />
                                                <div className="ant-slider-mark" />
                                            </div>
                                            <div className="d-flex justify-between mb-3">
                                                <div className="text-left  fw">{state.value.timeTrackingSpent} hour(s) spent </div>
                                                <div className="text-left  font-bold"> {state.value.timeTrackingRemaining} hour(s) remaining</div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r form-label">Descrition</label>

                                            <Editor
                                                name='description'
                                                
                                                onEditorChange={handleEditorChange}
                                                apiKey='gzd8t3qd2hvhzh2yzg4gerpdggkgeqc4rwl9qsi3s4e4zq6s'
                                                onInit={(evt, editor) => editorRef.current = editor}
                                                initialValue="<p></p>"
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
                                </form>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button  className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>








    )
}

export default CreateTask