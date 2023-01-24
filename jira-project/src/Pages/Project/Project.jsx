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
    // <div className='container'>
    //   <div className='d-flex justify-content-between py-4'>
    //     <h5 className='title-page'>Projects</h5>
    //     <Button onClick={() => {
    //       navigate(`${PageConstant.project}/new`)
    //     }}>Create project</Button>
    //   </div>
    //   <div className='search-page pb-4'>
    //     <Search
    //       placeholder="search task in here"
    //       allowClear
    //       onSearch={onSearch}
    //       style={{
    //         width: 200,
    //       }}
    //     />
    //   </div>
    //   <div>
    //     <Table columns={columns} dataSource={allProject} />;
    //   </div>
    // </div>
    <main class="main">

      <div class="grid">

        <h1>Lorem ipsum dolor sit.</h1>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id sed voluptatem error vel eius placeat harum voluptate doloribus ratione in, vero aliquid et, itaque, repellat magnam nisi adipisci unde, odit esse architecto hic! Eaque libero officia laudantium laboriosam non velit vero pariatur, rem nisi commodi dolores, culpa quibusdam dolorem nemo voluptatem. Ipsam, molestias autem iste est quia magni iusto distinctio esse magnam possimus tenetur dolor, suscipit fugiat ad? Natus officia magnam ipsam. Nisi aut quis natus voluptatum, sapiente inventore quidem similique odio, quod iste delectus commodi maxime asperiores doloribus officiis fuga, eaque, beatae ipsam assumenda architecto. At minima pariatur qui!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem numquam sint nisi natus fugiat quibusdam, iusto unde tenetur consequuntur, dolorum laborum consectetur explicabo at blanditiis aperiam perferendis totam neque vitae eos quisquam, ratione cum id fuga? Ad harum dolores optio debitis, eaque excepturi, iste totam. Quasi, maiores eligendi laudantium nobis harum ullam nihil voluptas officia id molestiae animi deleniti placeat dolorum atque fuga. Mollitia ducimus corporis natus doloribus blanditiis, voluptatem officia nesciunt sit dolorem incidunt illum vel voluptas, exercitationem nemo repellendus deleniti! Vero rerum natus blanditiis voluptatibus nihil deserunt, vitae nulla reprehenderit perferendis praesentium minus, dolor consequuntur repellat repudiandae, facilis veritatis dolorem? Nisi magni dolor, ut maiores voluptas rem amet commodi est distinctio perferendis mollitia dicta dolores, officiis dignissimos dolorem ea soluta ex quae nemo. Cupiditate ab ratione voluptatem non impedit, tempora voluptas ipsam iste sed a, animi sunt veniam deserunt molestias nobis excepturi. Earum inventore vitae recusandae, sint. Aut.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo magni maxime rerum minus impedit autem explicabo ex eius perspiciatis libero ipsam ab harum maiores rem aliquid inventore, dolor optio quas, temporibus, deleniti soluta expedita similique. Aperiam ad quasi sed officia dolorem, consectetur ipsum, vel possimus fugiat expedita adipisci, porro ea inventore accusantium, blanditiis nam minus. Laudantium similique amet et odio culpa quibusdam vel doloremque voluptatem totam a sit blanditiis placeat, beatae quasi esse dicta, earum alias delectus hic libero magni ipsam eveniet tempore. Inventore vitae error, provident ipsum quidem atque, tempora laboriosam at totam unde illo eligendi magnam reiciendis nam magni ut, laudantium deserunt odio voluptatibus maiores facilis. Voluptas ea consectetur, totam non possimus laudantium at quibusdam nihil doloribus, porro ipsum qui animi itaque velit.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla adipisci a vero sint ducimus provident quas, eveniet tenetur, corporis ex quidem aliquam consequatur quam dicta dolores modi nisi dolorem magnam, consequuntur quasi assumenda saepe similique eos accusantium, odio! Excepturi illo corporis, magni eaque animi esse, odit minima expedita facilis repellendus, culpa magnam eius delectus consequatur tenetur. Totam magnam voluptate mollitia quod omnis, hic, labore, veniam molestiae amet, quam distinctio optio nobis tenetur similique blanditiis. Fugiat obcaecati repudiandae culpa totam quasi perspiciatis rerum quibusdam architecto asperiores, enim quisquam error numquam officiis, voluptatibus debitis vitae sint. Neque ipsam, nobis sunt ut consectetur. Doloremque velit quasi necessitatibus inventore earum rem enim omnis aut doloribus laboriosam accusamus consequatur libero facere vitae dolorem mollitia voluptates molestias fugiat laborum dignissimos esse, nesciunt totam, blanditiis accusantium! Provident perspiciatis deserunt nostrum. Et provident optio enim perspiciatis tenetur distinctio officia, molestias in repellendus eius quis tempora animi. Reprehenderit, veniam.</p>

      </div>

    </main>
  )
}
