import { AutoComplete, Avatar, Button, Col, Popover, Row, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addUserToProjectApi, getProjectDetailApi } from '../../redux/reducers/projectReducer'
import { getAllUserApi } from '../../redux/reducers/userReducer'
import _ from 'lodash'
import { getAllStatusApi, getUserByProjectIdApi } from '../../redux/reducers/taskReducer'

const ProjectBoard = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [value, setValue] = useState('');
    const { AllUsers } = useSelector(state => state.userReducer)
    const { allProject } = useSelector(state => state.projectReducer)
    const { arrStatus, arrUserByProjectId } = useSelector(state => state.taskReducer)
    useEffect(() => {
        dispatch(getAllStatusApi())
        dispatch(getProjectDetailApi(id))
        dispatch(getUserByProjectIdApi(id))
    }, [id])

    return (
        <div className='container'>
            <div className='mt-4 mb-2'>
                <div>
                    Projects / Project name
                </div>
                <div className='py-5'>
                    <div className='d-flex align-items-center'>
                        <div className='row'>
                            <div className='col-4'>
                                <h3 style={{ color: 'black', fontWeight: '500' }}>Board</h3>
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
                                            options={AllUsers?.map((user) => {
                                                return { label: user.name, value: user.userId.toString() }
                                            })}
                                            value={value}
                                            onChange={(text) => {
                                                setValue(text)
                                            }}
                                            onSelect={(value, option) => {
                                                setValue(option.label)
                                                //goi api tra ve backend
                                                let addUser = {
                                                    "projectId": allProject.id,
                                                    "userId": value
                                                }
                                                dispatch(addUserToProjectApi(addUser))
                                            }}
                                            style={{ width: '100%' }} onSearch={(value) => {
                                                dispatch(getAllUserApi(value))
                                            }} />
                                    }} trigger='click'

                                >
                                    <Button>+</Button>
                                </Popover>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='board-task pt-2'>
                <Row>
                    <Col span={6}>
                        <div className='form-board p-2 mx-2'>
                            <Tag color="default"><span style={{ color: 'black' }}>BACKLOG</span></Tag>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className='form-board p-2 mx-2' >
                            <Tag color="geekblue"><span style={{ color: 'black' }}>SELECTED FOR DEVELOPMENT</span></Tag>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className='form-board p-2 mx-2' >
                            <Tag color="cyan"><span style={{ color: 'black' }}>IN PROGRESS</span></Tag>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className='form-board p-2 mx-2' >
                            <Tag color="green"><span style={{ color: 'black' }}>DONE</span></Tag>
                        </div>
                    </Col>

                </Row>
            </div>
        </div>
    )
}

export default ProjectBoard
