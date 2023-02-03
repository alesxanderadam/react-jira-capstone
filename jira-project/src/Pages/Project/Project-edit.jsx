import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { editProjectApi, getProjectDetailApi } from '../../redux/reducers/projectReducer'
import ProjectForm from './Project-form'

const ProjectEdit = () => {
    const { id } = useParams()
    const { detailProject } = useSelector(state => state.projectReducer)
    const dispath = useDispatch()
    useEffect(() => {
        dispath(getProjectDetailApi(id))
    }, [id])
    const editProject = (projectUpdate) => {
        dispath(editProjectApi(id, projectUpdate))
    }
    return (
        <>
            {detailProject && <ProjectForm project={detailProject} submitted={editProject} />}
        </>
    )
}

export default ProjectEdit
