import React, { useState, useEffect } from 'react'
import { PageConstant } from '../../common/page.constant';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Button, Input, Form, Select } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoryApi } from '../../redux/reducers/category';
import '../../assets/scss/project-form.scss'

const ProjectForm = ({ project, submitted }) => {
    const dispatch = useDispatch()
    const { Category } = useSelector(state => state.category)
    const [form] = Form.useForm();
    const [desscription, setDescription] = useState('')
    const onSubmit = (values) => {
        if (project) {
            values.alilas = ''
            values.id = project.id
            values.creator = project.creator.id
            submitted(values)
        } else {
            values.alilas = ''
            submitted(values)
        }
    }

    const validateMessages = {
        required: '${label} chưa nhập !!',
    };
    useEffect(() => {
        if (project) {
            form.setFieldsValue(project)
            setDescription(project.description)
        }
        dispatch(getAllCategoryApi())
    }, [project])

    CKEditor.editorConfig = (config) => {
        config.height = '800px';
    };

    return (
        <>
            <div className='d-flex justify-content-between mt-4 mb-2'>
                <div className='ms-5'>
                    Projects / New project
                </div>
                <div className='me-5'>
                    <Link to='/'>
                        <Button type="dashed" className="mx-3">Trở lại</Button>
                    </Link>
                    <Button type="primary" onClick={() => { form.submit() }}> {project ? "Edit" : "Add"} </Button>
                </div>
            </div>
            <div className='tabled pt-3'>
                <div className='mx-auto' style={{ maxWidth: '1000px' }}>
                    <Form wrapperCol={{ span: 24 }} size="large" layout="vertical" form={form} name="nest-messages" onFinish={onSubmit} validateMessages={validateMessages}>


                        {project && <Form.Item name='id' label="Project Name" rules={[{ required: true }]} tooltip="This is a required field">
                            <Input disabled={true} />
                        </Form.Item>}

                        <Form.Item name="projectName" label="Project Name" rules={[{ required: true }]} tooltip="This is a required field">
                            <Input />
                        </Form.Item>

                        <Form.Item name='categoryId' label="Project category" rules={[{ required: true }]}>
                            <Select options={Category?.map((item) => {
                                return {
                                    label: `${item.projectCategoryName}`,
                                    value: `${item.id}`
                                }
                            })}
                                defaultValue={project && project.projectCategory.name} />
                        </Form.Item>

                        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                            <CKEditor
                                editor={Editor}
                                data={desscription}
                                onBlur={(event, editor) => {
                                    const data = editor.getData()
                                    form.setFieldsValue({
                                        description: data
                                    });
                                }}
                            />
                        </Form.Item>
                    </Form>
                </div>
            </div>

        </>
    )
}

export default ProjectForm
