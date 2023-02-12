import { AutoComplete, Avatar, Button, Popover, Row, Modal, Select, Col, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { addUserToProjectApi, getProjectDetailApi } from '../../redux/reducers/projectReducer'
import { getAllUserApi } from '../../redux/reducers/userReducer'
import { getAllStatusApi, getTaskDetailByIdApi, getUserByProjectIdApi } from '../../redux/reducers/taskReducer'
import _ from 'lodash'
import '../../assets/scss/drag-drop.scss'

const ProjectBoard = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [value, setValue] = useState('');
    const [desscription, setDescription] = useState('')
    const { AllUsers } = useSelector(state => state.userReducer)
    const { detailProject } = useSelector(state => state.projectReducer)
    const { arrUserByProjectId, arrTaskType, taskDetail, arrStatus } = useSelector(state => state.taskReducer)
    const [isModalDetailProjectOpen, setModalDetailProjectOpen] = useState(false);
    const [form] = Form.useForm()
    const showModal = () => {
        setModalDetailProjectOpen(true);
    };
    const handleOk = () => {
        setModalDetailProjectOpen(false);
    };
    const handleCancel = () => {
        setModalDetailProjectOpen(false);
    };
    useEffect(() => {
        form.setFieldsValue(taskDetail)
        dispatch(getAllStatusApi())
        dispatch(getProjectDetailApi(id))
        dispatch(getUserByProjectIdApi(id))
    }, [id])


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
                                    arrUserByProjectId?.map((item, index) => {
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
                    {detailProject && detailProject.lstTask?.map((item, index) => {
                        return <div className='card me-1' key={index} style={{ width: '17rem' }}>
                            <div className='card-header'>
                                {item.statusName}
                            </div>
                            <div className='card-body p-2'>
                                <ul className='p-0'>
                                    {item.lstTaskDeTail?.map((task, index) => {
                                        return <li
                                            key={index}
                                            className='list-group-item'
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                dispatch(getTaskDetailByIdApi(task.taskId))
                                                showModal()
                                            }}>
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
                                    })}
                                </ul>
                            </div>
                        </div>
                    })}
                </Row>
                <Modal width={1000} title={<Select value={taskDetail.id} style={{ width: 90 }} options={arrTaskType?.map((item) => {
                    return { label: item.taskType, value: item.id }
                })} />} open={isModalDetailProjectOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Row gutter={[12, 12]} className="mt-3">
                        <Col span={12}>
                            <div className='me-2'>
                                <h2 className='text-dark' style={{ fontWeight: '600' }}>{taskDetail.taskName}</h2>
                                <div className='form-Description'>
                                    <label>Description</label>
                                    <p className='pt-2'>{taskDetail.description}</p>
                                </div>
                                <div className='form-Comment'>
                                    <label>Comment</label>
                                    <CKEditor
                                        editor={Editor}
                                        data={desscription}
                                        onBlur={(event, editor) => {
                                            const data = editor.getData()
                                            form.setFieldsValue({
                                                description: data
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className='p-1'>
                                <Select options={arrStatus?.map((item) => {
                                    form.setFieldsValue({
                                        statusId: taskDetail.id
                                    })
                                    return { label: item.statusName, value: item.id }
                                })} style={{ width: '200px' }}></Select>
                                <div className='card mt-4'>
                                    <div className='card-header'>
                                        Details
                                    </div>
                                    <div className='card-body px-3'>
                                        <Form.Item name='assignees'>
                                            <Input />
                                        </Form.Item>
                                        <div className="assignees d-flex justify-content-between align-items-center">
                                            <h6>ASSIGNEES</h6>
                                            <div className="row">
                                                <div className="col-6 mt-2 mb-2">
                                                    <Select style={{ width: '200px' }}> </Select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="assignees d-flex justify-content-between align-items-center">
                                            <h6>Priority</h6>
                                            <div className="row">
                                                <div className="col-6 mt-2 mb-2">
                                                    <Select style={{ width: '200px' }}> </Select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="assignees d-flex justify-content-between align-items-center">
                                            <h6>Estimate</h6>
                                            <div className="row">
                                                <div className="col-6 mt-2 mb-2">
                                                    <Select style={{ width: '200px' }}> </Select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="assignees d-flex justify-content-between align-items-center">
                                            <h6>Estimate</h6>
                                            <div className="row">
                                                <div className="col-6 mt-2 mb-2">
                                                    <Select style={{ width: '200px' }}> </Select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Modal>
            </div>
        </div>
    )
}

export default ProjectBoard
