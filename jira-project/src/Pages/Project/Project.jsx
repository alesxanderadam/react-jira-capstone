import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageConstant } from '../../common/page.constant'
import '../../assets/scss/project.scss'
import { Button, Input, message, Modal, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { delProjectApi, getAllProjectApi } from '../../redux/reducers/projectReducer'
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons'

export default function Project() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [loadding, setLoadding] = useState(true)
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
          {data.members.map((item) => {
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
            <Button style={{ fontSize: '12px', padding: '0px 14px 1px 14px', lineHeight: '14px', height: '36px' }} onClick={() => { showDeleteConfirm(data.id); }} className="table-action-button">
              <DeleteOutlined style={{ color: '#e90000' }} />
            </Button>
          </div>
        </>
      ),
    },
  ];

  const { confirm } = Modal;
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Delete project",
      icon: <ExclamationCircleFilled />,
      content: `Project Id: ${id} id deleting? `,
      okText: "Đồng ý",
      okType: "primary",
      cancelText: "Không",
      onOk() {
        message.success('Delete success')
        dispatch(delProjectApi(id))
      },
      onCancel() {
        console.log("Hủy");
      },
    });
  };

  useEffect(() => {
    dispatch(getAllProjectApi())
  }, [allProject])



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
