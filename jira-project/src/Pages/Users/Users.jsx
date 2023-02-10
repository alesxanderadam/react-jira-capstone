import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table } from 'antd'
import React, { useEffect } from 'react'
import {getUserManager, userArr} from '../../redux/reducers/MangeReducer'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../assets/scss/manage.scss'
export default function Users() {
  const dispatch = useDispatch();
  const {userArr} = useSelector(state => state.MangeReducer)
 
  const DeleteUser=(record)=>{

  }
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
        DeleteUser(record.id)
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
