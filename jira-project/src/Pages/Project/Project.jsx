import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { PageConstant } from '../../common/page.constant'
import '../../assets/scss/project.scss'
import { AutoComplete, Avatar, Button, Input, message, Modal, Popover, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { addUserToProjectApi, delProjectApi, getAllProjectApi, getAllProjectSearchApi } from '../../redux/reducers/projectReducer'
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { getAllUserApi } from '../../redux/reducers/userReducer'

export default function Project() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { AllUsers } = useSelector(state => state.userReducer)
  const { allProject } = useSelector(state => state.projectReducer)
  const { Search } = Input;
  const [value,setValue] = useState('');
  const onSearch = (value) => {
    dispatch(getAllProjectSearchApi(value))
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
      width: 250,
      sorter: (a, b) => a.projectName.length - b.projectName.length,
      sortDirections: ['descend'],
      render: (data) => (
        <NavLink to={`${PageConstant.project}/${data.id}/board`}>
          {data.projectName}
        </NavLink>
      )
    },
    {
      title: 'Category name',
      dataIndex: 'categoryName',
      width: 250,
      sorter: (a, b) => a.categoryName.length - b.categoryName.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Creator',
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
      title: 'Members',
      width: 250,
      render: (data) => (
        <>
          {data.members?.map((item, index) => {
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
          })}
          <Popover
                title={"Add user"}
                content={()=>{
                  return<AutoComplete 
                    options={AllUsers?.map((user)=>{
                      return {label:user.name,value:user.userId.toString()}
                    })}
                    value={value}
                    onChange={(text)=>{
                      setValue(text)
                    }}
                    onSelect={(value,option)=>{
                      setValue(option.label)
                      //goi api tra ve backend
                      let addUser ={
                        "projectId": data.id,
                        "userId": value
                      }
                      dispatch(addUserToProjectApi(addUser))
                    }}
                    style={{width:'100%'}} onSearch={(value)=>{
                    dispatch(getAllUserApi(value))
                  }}/>
                }} trigger='click'
                
              >
                <Button>+</Button>
              </Popover>
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
      okText: "?????ng ??",
      okType: "primary",
      cancelText: "Kh??ng",
      onOk() {
        dispatch(delProjectApi(id))
      },
      onCancel() {
        console.log("H???y");
      },
    });
  };

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
