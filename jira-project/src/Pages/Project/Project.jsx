import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { PageConstant } from '../../common/page.constant'
import '../../assets/scss/project.scss'
import { Button, Input, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjectApi } from '../../redux/reducers/projectReducer'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

export default function Project() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { allProject } = useSelector(state => state.projectReducer)
  const { Search } = Input;
  const onSearch = (value) => {
    console.log(value)
  }
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      defaultSortOrder: 'descend',
      width: 120,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Project name',
      dataIndex: 'projectName',
      width: 250,
      sorter: (a, b) => a.projectName.length - b.projectName.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Category name',
      dataIndex: 'categoryName',
      width: 250,
      sorter: (a, b) => a.categoryName.length - b.categoryName.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Category name',
      width: 250,
      sorter: (a, b) => a.categoryName.length - b.categoryName.length,
      sortDirections: ['descend'],
      render: (data) => (
        <>
          {data.creator.name}
        </>
      )
    },
    {
      title: 'Category name',
      width: 250,
      sorter: (a, b) => a.categoryName.length - b.categoryName.length,
      sortDirections: ['descend'],
      render: (data) => (
        <>
          {data.members.map((item, index) => {
            return <>
              {item.name}
            </>
          })}
        </>
      )
    },
    {
      title: "Actions",
      width: 50,
      fixed: "right",
      render: (data) => (
        <>
          <div className="ant-employed d-flex align-items-center justify-content-center">
            <Button style={{ fontSize: '12px', padding: '0px 15px 1px 14px', lineHeight: '14px', height: '36px' }} className="mx-2 table-action-button" onClick={() => { navigate((`${PageConstant.project}/${data.id}/edit`)); }} type="default">
              <EditOutlined />
            </Button>
            <Button style={{ fontSize: '12px', padding: '0px 14px 1px 14px', lineHeight: '14px', height: '36px' }} className="table-action-button">
              <DeleteOutlined style={{ color: '#e90000' }} />
            </Button>
          </div>
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllProjectApi())
  }, [])



  return (
    <div className='container'>
      <div className='d-flex justify-content-between py-4'>
        <h5 className='title-page'>Projects</h5>
        <Button onClick={() => {
          navigate(`${PageConstant.project}/new`)
        }}>Create project</Button>
      </div>
      <div className='search-page pb-4'>
        <Search
          placeholder="search task in here"
          allowClear
          onSearch={onSearch}
          style={{
            width: 200,
          }}
        />
      </div>
      <div>
        <Table columns={columns} dataSource={allProject} />;
      </div>
    </div>
  )
}
