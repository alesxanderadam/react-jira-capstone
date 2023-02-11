import { AutoComplete, Avatar, Button, Col, Popover, Row, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addUserToProjectApi, getProjectDetailApi } from '../../redux/reducers/projectReducer'
import { getAllUserApi } from '../../redux/reducers/userReducer'
import _ from 'lodash'

const ProjectBoard = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [value, setValue] = useState('');
    const { AllUsers } = useSelector(state => state.userReducer)
    const { allProject } = useSelector(state => state.projectReducer)
    const { arrStatus } = useSelector(state => state.taskReducer)
    useEffect(() => {
        dispatch(getProjectDetailApi(id))
    }, [id])

    return (
        <div className='container'>
            <div className='mt-4 mb-2'>
                <div>
                    Projects / Project name
                </div>
                <div className='w-50 py-5'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h3 style={{
                            color: 'black', fontWeight: '500'
                        }}>Board</h3>
                        <>
                            {
                                allProject.members?.map((item, index) => {
                                    const content = (
                                        <div>
                                            {item.name}
                                        </div>
                                    );
                                    return <>
                                        <Popover key={index} content={content}>
                                            <Avatar
                                                style={{ borderRadius: '100rem', width: '35px', height: '35px' }}
                                                className="shape-avatar me-1"
                                                shape="square"
                                                size={40}
                                                src={`${item.avatar}`}
                                            ></Avatar>
                                        </Popover>
                                    </>
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
                        </>
                    </div>
                </div>
            </div>
            <div className='board-task pt-2'>
                <Row>
                    {arrStatus?.map((item, index) => {
                        return <Col span={6} key={index}>
                            <div className='form-board p-2 mx-2' style={{ backgroundColor: 'gray' }}>
                                <Tag color="geekblue"> {item.statusName}</Tag>
                                <form className='form'>
                                    <div>qwkejqowjejqweiuqwiueu</div>
                                </form>
                            </div>
                        </Col>
                    })}
                </Row>
            </div>
        </div>
    )
}

export default ProjectBoard
