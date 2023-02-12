import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { message, Modal, Table } from 'antd'
import React, { useEffect } from 'react'
import {deleteUserManager, getUserManager, userArr} from '../../redux/reducers/MangeReducer'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../assets/scss/manage.scss'
export default function Users() {
  const dispatch = useDispatch();
  const {userArr} = useSelector(state => state.MangeReducer)
  const {confirm} = Modal;
  const DeleteUser=(record)=>{
    console.log(record.userId)
    confirm({
      title:"Delete User",
      icon:<ExclamationCircleFilled/>,
      content:`User Id: ban co muon xoa id ${record.userId} ?`,
      okText:"Đồng ý",
      okType:"primary",
      cancelText:"Không",
      onOk(){
        message.success('Delete success')
        dispatch(deleteUserManager(record.userId))
      },
      onCancel(){
        console.log("Huy");
      },
    });
  };
  const columns =[
  {
    title:'Name',
    dataIndex:'name',
  },
  {
    title:'User Id',
    dataIndex:'userId',
  },
  {
    title:'Email',
    dataIndex:'email',
  },
  {
    title:'Phone Number',
    dataIndex:'phone',
  },
  {
    title:'Action',
    render:(record)=>{
      return<>
      <div className="action">
      <EditOutlined></EditOutlined>
      <DeleteOutlined onClick={() =>{
        DeleteUser(record)
      }}></DeleteOutlined>
      </div>
      </>
    }
  },
]
useEffect(() => {
  dispatch(getUserManager())
},[])
  return (
    <>
    <div className="container">
      <Table columns={columns} dataSource={userArr}>
      </Table>
    </div>
    </>
  )
}

