import React, {useState} from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import axios from 'axios';

const AddStudent = ({updateStudents, courses}) => {

    const [name, setName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [coursesSelected, setCoursesSelected] = React.useState([])
    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState(false)
    const setInput = (attr, e) => {
        setError(false)
        setSuccess(false)
        switch (attr) {
            case 'name':
                setName(e.target.value)
                break;
            case 'lastName':
                setLastName(e.target.value)
                break;
            case 'courses':
                let optionsSelected = [];
                for (let attr in e.target.options) {
                    if (e.target.options[attr].selected) {
                        optionsSelected.push(e.target.options[attr].value)
                    }
                }
                setCoursesSelected([...optionsSelected])

                break;
        }
    }
    const addStudent = (e) => {
        e.preventDefault()
        axios.post('/api/add-student?name=' + name + '&lastName=' + lastName).then(res => {
            updateStudents(res.data)
            setName('')
            setLastName('')
            setSuccess(true)
        }).catch(err => {
            console.error(err)
            setError(true)
        })
    }

    return (
        <Form>
            <Form.Group>
                <Form.Control type="text" value={name} onChange={setInput.bind(this, 'name')} placeholder="Nombre"/>
            </Form.Group>
            <Form.Group>
                <Form.Control type="text" value={lastName} onChange={setInput.bind(this, 'lastName')}
                              placeholder="Apellidos"/>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>Cursos:</Form.Label>
                <Form.Control as="select" multiple onChange={setInput.bind(this, 'courses')}>
                    {courses.map(course => {
                        return (
                            <option key={course._id}>{course.name}</option>
                        )
                    })}

                </Form.Control>
            </Form.Group>
            {success ? <Alert variant='success'>
                    Alumno agregado!
                </Alert> : null}
            {error ? <Alert variant='danger'>
                    Error!
                </Alert> : null}
            <Button variant="primary" onClick={addStudent} disabled={!name.length || !lastName.length || !coursesSelected.length} type="submit">
                Agregar
            </Button>

        </Form>
    )
}

export default AddStudent;