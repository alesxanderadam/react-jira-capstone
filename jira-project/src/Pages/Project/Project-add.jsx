import { useDispatch } from 'react-redux'
import { addProjectApi } from '../../redux/reducers/projectReducer'
import ProjectForm from './Project-form'

const ProjectAdd = () => {
    const dispatch = useDispatch()
    const addProject = (project) => {
        dispatch(addProjectApi(project))
    }
    return (
        <div>
            <ProjectForm project={null} submitted={addProject} />
        </div>
    )
}

export default ProjectAdd
