import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { Button, Modal, Table } from 'antd'
import React, { useEffect } from 'react'
import { deleteUserManager, getUserManager } from '../../redux/reducers/MangeReducer'
import { useDispatch, useSelector } from 'react-redux'
import '../../assets/scss/manage.scss'
import { PageConstant } from '../../common/page.constant'
import { useNavigate } from 'react-router-dom'
export default function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userArr } = useSelector(state => state.MangeReducer)
  const { confirm } = Modal;
  const DeleteUser = (record) => {
    console.log(record.userId)
    confirm({
      title: "Delete User",
      icon: <ExclamationCircleFilled />,
      content: `User Id: ban co muon xoa id ${record.userId} ?`,
      okText: "Đồng ý",
      okType: "primary",
      cancelText: "Không",
      onOk() {
        dispatch(deleteUserManager(record.userId))
      },
      onCancel() {
        console.log("Huy");
      },
    });
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'User Id',
      dataIndex: 'userId',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Action',
      render: (record) => {
        return <>
          <div className="action">
            <Button onClick={() => { navigate((`${PageConstant.usermanage}/${record.userId}/edit`)); }} type="default">
              <EditOutlined />
            </Button>
            <Button className='text-danger' onClick={() => { DeleteUser(record) }} type="default">
              <DeleteOutlined />
            </Button>
          </div>
        </>
      }
    },
  ]
  useEffect(() => {
    dispatch(getUserManager())
  }, [])
  return (
    <>
      <div className="container">
        <Table columns={columns} dataSource={userArr}>
        </Table>
      </div>
    </>
  )
}

