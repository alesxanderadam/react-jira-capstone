import { Button, Divider, Dropdown, Space, Tooltip, theme } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom'
import '../../assets/scss/home-template.scss'
import throttle from "https://cdn.skypack.dev/lodash@4/throttle";
const Header = () => {
    function onScroll() {
        if (window.pageYOffset) {
            $$header.classList.add("is-active");
        } else {
            $$header.classList.remove("is-active");
        }
    }

    const $$header = document.querySelector(".js-header");

    window.addEventListener("scroll", throttle(onScroll, 300));

    const items = [
        {
            key: '1',
            label: (
                <div style={{ width: 200 }}>
                    <NavLink className='navlink' style={{ textDecoration: 'none' }}>
                        User Managerment
                    </NavLink>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div>
                    <NavLink className='navlink' style={{ textDecoration: 'none' }}>
                        Project
                    </NavLink>

                </div>
            ),
        },
    ];
    return (
        <header class="header sticky sticky--top js-header">
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <NavLink className='pe-4'><img src='./assets/img/shiba.png' alt='...' className='jira-logo' style={{ borderRadius: '100rem', width: '50px', height: '50px' }}></img></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-5 mb-lg-0">
                            <li className="nav-item dropdown activee">
                                <NavLink className="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Project
                                </NavLink>
                                <ul className="dropdown-menu" style={{ width: '260px' }}>
                                    <li><NavLink className="dropdown-item" href="#">View all projects</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Create project</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    User
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" href="#">View all user</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link">Create task</NavLink>
                            </li>
                        </ul>
                        <div className='d-flex'>
                            <Dropdown
                                menu={{ items }}
                                className='px-2'
                                trigger={['click']}
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <SettingOutlined style={{ fontSize: '20px', color: 'black' }} />
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
