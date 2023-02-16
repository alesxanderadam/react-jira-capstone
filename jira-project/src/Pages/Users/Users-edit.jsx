import { Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {detailUserAction,getUserById} from '../../redux/reducers/MangeReducer'

const UserEdit = () => {
    const { id } = useParams()
    const {userDetail} =useSelector(state => state.MangeReducer)
    const dispath = useDispatch();
    useEffect(() => {
        dispath(getUserById(id))
    }, [id])
    console.log(userDetail);
    return (
    <>
    <div className="container">

    </div>
    </>
    )
}

export default UserEdit
