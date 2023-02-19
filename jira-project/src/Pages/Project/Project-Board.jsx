import { AutoComplete, Avatar, Button, Popover, Row, Modal, Col, Form, Input, Collapse, Select, InputNumber, message } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { addUserToProjectApi, getProjectDetailApi } from '../../redux/reducers/projectReducer'
import { getAllUserApi } from '../../redux/reducers/userReducer'
import { delTaskAction, delTaskApi, getAllStatusApi, getTaskDetailByIdApi, getUserByProjectIdApi, updateDescriptionApi, updateEstimateApi, updatePriorityApi, updateStatusApi, updateTasskApi, updateTimeTrackingApi } from '../../redux/reducers/taskReducer'
import _ from 'lodash'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import '../../assets/scss/drag-drop.scss'
import { Editor } from '@tinymce/tinymce-react';
import { CheckOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons'
const { Panel } = Collapse;
const ProjectBoard = () => {
    const editorRef = useRef(null);
    const dispatch = useDispatch()
    const { id } = useParams()
    const [value, setValue] = useState('');
    const [desscription, setDescription] = useState('')
    const { AllUsers } = useSelector(state => state.userReducer)
    const { detailProject } = useSelector(state => state.projectReducer)
    const { arrUserByProjectId, arrTaskType, taskDetail, arrStatus, arrPriority } = useSelector(state => state.taskReducer)
    const [isModalDetailProjectOpen, setModalDetailProjectOpen] = useState(false);
    const [form] = Form.useForm()
    const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
    const showModal = () => {
        setModalDetailProjectOpen(true);
    };
    const handleOk = () => {
        setModalDetailProjectOpen(false);
        dispatch(updateTasskApi(state.values))
        dispatch(getProjectDetailApi(id))
    };
    const handleCancel = () => {
        setModalDetailProjectOpen(false);
        dispatch(getProjectDetailApi(id))

    };
    const handleDragEnd = (result) => {
        let { taskId } = JSON.parse(result.draggableId)
        let { source, destination } = result
        if (!destination || source.index === destination.index && source.droppableId === destination.droppableId) {
            return;
        } else {
            dispatch(updateStatusApi({
                "taskId": taskId,
                "statusId": destination.droppableId,
            }))
        }
    }
    useEffect(() => {
        if (taskDetail) {
            form.setFieldsValue(taskDetail)
            setDescription(taskDetail.description)
        }
        dispatch(getAllStatusApi())
        dispatch(getProjectDetailApi(id))
        dispatch(getUserByProjectIdApi(id))
    }, [id, taskDetail])

    let [state, setState] = useState({
        values: {
            listUserAsign: [],
            taskId: '',
            taskName: '',
            description: '',
            statusId: '',
            originalEstimate: '',
            timeTrackingSpent: '',
            timeTrackingRemaining: '',
            projectId: id,
            typeId: '',
            priorityId: ''
        },
        updateStatus: {
            taskId: '',
            statusId: ''
        },
        updatePriority: {
            taskId: '',
            priorityId: ''
        },
        updateDescription: {
            taskId: '',
            description: ''
        },
        updateTimeTracking: {
            taskId: '',
            timeTrackingSpent: '',
            timeTrackingRemaining: ''
        },
        updateEstimate: {
            taskId: '',
            originalEstimate: ''
        },
        userChoice: []
    })
    const handleChange = (e) => {
        let { value, name } = e.target;
        let newValue = { ...state.values, [name]: value }
        for (let i = 0; i < state.userChoice.length; i++) {
            newValue['listUserAsign'][i] = (state.userChoice[i]);
        }
        setState({
            ...state,
            values: newValue
        })
        console.log(state.values)
    }


    return (
        <div className='container drag-task'>
            <div className='mt-3 mb-2'>

                <div>
                    Projects / Project name
                </div>
                <div className='py-3'>
                    <div className='d-flex align-items-center'>
                        <div className='row w-100'>
                            <div className='col-4'>
                                <h3>Board</h3>
                            </div>
                            <div className='col-8 d-flex align-items-center'>
                                <span className='me-3'>Member</span>
                                {
                                    detailProject && detailProject.members?.map((item, index) => {
                                        const content = (
                                            <div>
                                                {item.name}
                                            </div>
                                        );
                                        return <div>
                                            <Popover key={index} content={content}>
                                                <Avatar
                                                    style={{ borderRadius: '100rem', width: '28px', height: '28px' }}
                                                    className="shape-avatar me-1"
                                                    shape="square"
                                                    size={40}
                                                    src={`${item.avatar}`}
                                                ></Avatar>
                                            </Popover>
                                        </div>
                                    })
                                }
                                <Popover
                                    title={"Add user"}
                                    content={() => {
                                        return <AutoComplete
                                            options={AllUsers?.map((user) => { return { label: user.name, value: user.userId.toString() } })}
                                            value={value}
                                            onChange={text => (setValue(text))}
                                            onSelect={(value, option) => {
                                                setValue(option.label)
                                                let addUser = {
                                                    "projectId": id,
                                                    "userId": value
                                                }
                                                dispatch(addUserToProjectApi(addUser))
                                            }}
                                            style={{ width: '100%' }} onSearch={(value) => { dispatch(getAllUserApi(value)) }} />
                                    }}
                                    trigger='click'
                                >
                                    <Button>+</Button>
                                </Popover>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='board-task'>
                <Row>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        {detailProject && detailProject.lstTask?.map((item, index) => {
                            return <Droppable key={index} droppableId={item.statusId}>
                                {(provided) => {
                                    return <div className='card me-1' key={index} style={{ width: '17rem' }}>
                                        <div className='card-header'>
                                            {item.statusName}
                                        </div>
                                        <div className='card-body p-2' ref={provided.innerRef} {...provided.droppableProps}>
                                            <ul className='p-0' >
                                                {item.lstTaskDeTail?.map((task, index) => {
                                                    return <Draggable key={task.taskId.toString()} index={index} draggableId={JSON.stringify({ taskId: task.taskId })}>
                                                        {(provided) => {
                                                            return <li
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}

                                                                key={index}
                                                                className='list-group-item'
                                                                onClick={() => {
                                                                    dispatch(getTaskDetailByIdApi(task.taskId))
                                                                    showModal()
                                                                    let lissAsign=[]
                                                                    for (let i = 0; i <task.assigness.length; i++) {
                                                                        
                                                                        lissAsign[i]=(task.assigness[i].id);
                                                                    }
                                                                    setState({
                                                                        ...state,
                                                                        values:{...state.values,
                                                                            ['listUserAsign']:lissAsign,
                                                                        ['taskId']:task.taskId,
                                                                        ['taskName']:task.taskName,
                                                                        ['description']:task.description,
                                                                        ['statusId']:task.statusId,
                                                                        ['originalEstimate']:task.originalEstimate,
                                                                        ['timeTrackingSpent']:task.timeTrackingSpent,
                                                                        ['timeTrackingRemaining']:task.timeTrackingRemaining,
                                                                        ['projectId']:task.projectId,
                                                                        ['typeId']:task.taskTypeDetail?.id,
                                                                        ['priorityId']:task.priorityTask?.priorityId
                                                                    },
                                                                        updateEstimate:{...state.updateEstimate,
                                                                            ['taskId']:task.taskId,
                                                                            ['originalEstimate']:task.originalEstimate},
                                                                        updateTimeTracking:{...state.updateTimeTracking,
                                                                            ['taskId']:task.taskId,
                                                                            ['timeTrackingSpent']:task.timeTrackingSpent,
                                                                            ['timeTrackingRemaining']:task.timeTrackingRemaining}
                                                                        
                                                                    })
                                                                }}
                                                               >
                                                                <p style={{ fontWeight: 'bold' }}>{task.taskName}</p>
                                                                <div className='block d-flex justify-content-between align-items-center'>
                                                                    <div className='block-left'><p className='text-dark'>{task.priorityTask.priority}</p></div>
                                                                    <div className='block-right'>
                                                                        <div className='avatar-group '>
                                                                            <div className='avatar d-flex align-items-center'>
                                                                                {task.assigness?.map((item, index) => {
                                                                                    const content = (<div>{item.name}</div>);
                                                                                    return <div>
                                                                                        <Popover key={index} content={content}>
                                                                                            <Avatar style={{ borderRadius: '100rem', width: '25px', height: '25px' }}
                                                                                                className="shape-avatar me-1" shape="square" size={40} src={`${item.avatar}`}>
                                                                                            </Avatar>
                                                                                        </Popover>
                                                                                    </div>
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        }}

                                                    </Draggable>
                                                })}
                                            </ul>
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                }}

                            </Droppable>
                        })}
                    </DragDropContext>
                </Row>
                <Form form={form}>

                    <Modal width={1000}
                        maskClosable={false}
                        closable={false}
                        keyboard={false}
                        open={isModalDetailProjectOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}>
                        <div className="d-flex justify-content-between">
                            <div>
                                <select name='typeId' style={{ width: 120 }} className="form-select mb-1 hover:bg-gray-100 rounded hover:shadow" onChange={handleChange}>
                                    {arrTaskType?.map((item) => {
                                        if (taskDetail.taskTypeDetail?.id == item.id) {
                                            return <option selected key={item.id} value={item.id}>{item.taskType}</option>
                                        }
                                        return <option key={item.id} value={item.id}>{item.taskType}</option>
                                    })}
                                </select>
                            </div>
                            <div>
                                <Button
                                    htmlType="button"
                                    icon={<DeleteOutlined />}
                                    className="w-8 h-8 hover:bg-gray-100 hover:text-black focus:text-black border-0 p-0 shadow-none hover:shadow rounded mr-1"
                                    onClick={() => {
                                        alert("Delete this task")
                                        dispatch(delTaskApi(taskDetail?.taskId))
                                        handleCancel()
                                        dispatch(getProjectDetailApi(id))

                                    }}
                                />
                                <Button
                                    htmlType="button"
                                    icon={<CloseOutlined />}
                                    className="w-8 h-8 hover:bg-gray-100 hover:text-black focus:text-black border-0 p-0 shadow-none hover:shadow rounded"
                                    onClick={handleCancel}
                                />
                            </div>
                        </div>

                        <Row gutter={[12, 12]} className="mt-3">
                            <Col span={12}>
                                <div className='me-2'>
                                    <input className='text-dark form-control' style={{ fontWeight: '600' }} value={state.values.taskName} name="taskName" onChange={handleChange} />
                                    <Collapse ghost className='form-Description p-0'>
                                        <Panel header='Description' className='p-0'>
                                            <span className="fa-solid fa-check text-end d-block " style={{ cursor: 'pointer' }} onClick={() => {
                                                dispatch(updateDescriptionApi(state.updateDescription))
                                                dispatch(getTaskDetailByIdApi(taskDetail?.taskId))
                                            }}></span>
                                            <Editor
                                                name='description'
                                                onEditorChange={(content, editor) => {
                                                    let name = 'description'
                                                    let newValue = { ...state.updateDescription }

                                                    newValue = { ...newValue, [name]: content, ['taskId']: taskDetail?.taskId }
                                                    setState({
                                                        ...state,
                                                        updateDescription: newValue
                                                    })
                                                }}
                                                apiKey='gzd8t3qd2hvhzh2yzg4gerpdggkgeqc4rwl9qsi3s4e4zq6s'
                                                onInit={(evt, editor) => editorRef.current = editor}
                                                initialValue={taskDetail.description}
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
                                        </Panel>
                                    </Collapse>
                                    <div className='form-Comment'>
                                        <label>Comment</label>
                                        <Editor
                                            name='Comment'
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
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className='p-1'>
                                    <select name='statusId' style={{ width: 240, float: 'left' }} className="form-select" onMouseLeave={(e) => {
                                        let { value, name } = e.target;
                                        let newValue = { ...state.updateStatus, ['taskId']: taskDetail?.taskId, [name]: value }
                                        setState({
                                            ...state,
                                            updateStatus: newValue
                                        })
                                    }} >
                                        {arrStatus.map((item) => {
                                            if (taskDetail?.statusId == item.statusId) {
                                                return <option selected key={item.statusId} value={item.statusId}>{item.statusName}</option>
                                            }
                                            return <option key={item.statusId} value={item.statusId}>{item.statusName}</option>
                                        })}

                                    </select>
                                    <span className="fa-solid fa-check mx-2 text-success
                            " style={{ lineHeight: '45px', cursor: 'pointer' }} onClick={() => {
                                            dispatch(updateStatusApi(state.updateStatus))
                                            dispatch(getProjectDetailApi(taskDetail?.projectId))
                                            dispatch(getTaskDetailByIdApi(taskDetail?.taskId))
                                        }}></span>
                                    <Collapse className='card mt-4'>
                                        <Panel header='Detail'>
                                            <div className='card-body px-3'>
                                                <div className="assignees d-flex justify-content-between align-items-center">
                                                    <h6>ASSIGNEES</h6>
                                                    <div className="col-6 mt-2 mb-2">
                                                        <Select style={{ width: 200 }}
                                                            mode="multiple"
                                                            allowClear
                                                            name="listUserAsign"
                                                            className="react-select"
                                                            options={arrUserByProjectId?.map((itemm) => {
                                                                return { label: itemm.name, value: itemm.userId }
                                                            })}
                                                            defaultValue={taskDetail.assigness?.map((item) => {
                                                                return { label: item.name, value: item.id }
                                                            })}
                                                            onChange={(choice) => {
                                                                setState({
                                                                    ...state,
                                                                    userChoice: choice
                                                                })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="assignees d-flex justify-content-between align-items-center">
                                                    <h6>Priority</h6>
                                                    <div className=" mt-2 mb-2">
                                                        <select name='priorityId' className="form-select" style={{ width: 200, float: 'left' }} onMouseLeave={(e) => {
                                                            let { value, name } = e.target;
                                                            let newValue = { ...state.updatePriority, ['taskId']: taskDetail?.taskId, [name]: value }
                                                            setState({
                                                                ...state,
                                                                updatePriority: newValue
                                                            })
                                                        }}>
                                                            {arrPriority?.map((item) => {
                                                                if (taskDetail.priorityId == item.priorityId) {
                                                                    return <option selected key={item.priorityId} value={item.priorityId}>{item.priority}</option>
                                                                }
                                                                return <option key={item.priorityId} value={item.priorityId}>{item.priority}</option>
                                                            })}
                                                        </select>
                                                        <span className="fa-solid fa-check mx-2 text-success"
                                                            style={{ lineHeight: '45px', cursor: 'pointer' }} onClick={() => {
                                                                dispatch(updatePriorityApi(state.updatePriority))
                                                                dispatch(getProjectDetailApi(taskDetail?.projectId))
                                                                dispatch(getTaskDetailByIdApi(taskDetail?.taskId))
                                                            }}></span>

                                                    </div>
                                                </div>
                                                <div className="assignees d-flex justify-content-between align-items-center">
                                                    <h6>Estimate</h6>
                                                    <div className="row">
                                                        <div className="col-6 mt-2 mb-2">
                                                            <input id='originalEstimate' name="originalEstimate" type='number' step='1' min="0" max="100" className="ant-input form-control" value={state.updateEstimate.originalEstimate} style={{ width: 200 }} onChange={(e) => {
                                                                let { value, name } = e.target;
                                                                let newValue = { ...state.updateEstimate, ['taskId']: taskDetail?.taskId, [name]: value }
                                                                setState({
                                                                    ...state,
                                                                    updateEstimate: newValue
                                                                })
                                                            }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="assignees ">
                                                    <div className="row">
                                                        <div className="d-flex justify-content-between">
                                                            <h4>Time</h4>
                                                            <span className="fa-solid fa-check mx-2 text-success text-end"
                                                                style={{ lineHeight: '45px', cursor: 'pointer' }} onClick={() => {
                                                                    dispatch(updateTimeTrackingApi(state.updateTimeTracking))
                                                                    dispatch(getTaskDetailByIdApi(taskDetail?.taskId))
                                                                }}></span>
                                                        </div>
                                                        <div className="col-6">
                                                            <h6>Time spent</h6>

                                                            <input id='timeTrackingSpent' name="timeTrackingSpent" type='number' step='1' min="0" max="100" className="ant-input form-control" value={state.updateTimeTracking.timeTrackingSpent} style={{ width: 200 }} onChange={(e) => {
                                                                let { value, name } = e.target;
                                                                let newValue = { ...state.updateTimeTracking, ['taskId']: taskDetail?.taskId, [name]: value }
                                                                setState({
                                                                    ...state,
                                                                    updateTimeTracking: newValue
                                                                })
                                                            }} />
                                                        </div>
                                                        <div className="col-6">
                                                            <h6>Time remaining</h6>
                                                            <input id='timeTrackingRemaining' name="timeTrackingRemaining" type='number' step='1' min="0" max="100" className="ant-input form-control" value={state.updateTimeTracking.timeTrackingRemaining} style={{ width: 200 }} onChange={(e) => {
                                                                let { value, name } = e.target;
                                                                let newValue = { ...state.updateTimeTracking, ['taskId']: taskDetail?.taskId, [name]: value }
                                                                setState({
                                                                    ...state,
                                                                    updateTimeTracking: newValue
                                                                })
                                                            }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Panel>
                                    </Collapse>
                                </div>
                            </Col>
                        </Row>
                    </Modal>
                </Form>
            </div>
        </div >
    )
}

export default ProjectBoard
