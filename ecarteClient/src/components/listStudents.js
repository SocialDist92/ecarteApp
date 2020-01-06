import React, {useState} from 'react';
import {Table, Form, Button, Modal, Dropdown} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faCartPlus, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import AddToStudent from './addToStudent';
import axios from 'axios';

const ListCourses = ({students, deleteStudent, courses}) => {
    const [show, setShow] = useState(false)
    const [studentOnModal, setStudentOnModal] = useState(undefined)
    const [filteredStudents, setFilteredStudents] = useState(students ? [...students] : [])
    React.useEffect(() => {
        setFilteredStudents(students)
    }, [students])

    const deleteStudentRequest = (id) => {
        axios.post('/api/delete-student?id=' + id).then(
            () => {
                deleteStudent(id)
            }
        ).catch(e => console.error(e))
    }

    const handleClose = () => setShow(false)
    const handleShow = (student) => {
        setStudentOnModal(student)
        setShow(true)
    }
    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setFilteredStudents(students.filter(student => {
            const completeName = student.name.toLowerCase() + ' ' + student.lastName.toLowerCase();
            return completeName.includes(searchTerm)
        }))

    }
    return (
        <section>

            <div className="d-flex justify-content-between">
                <Form.Group>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            Filtro
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="px-2">

                            {courses.map(course => <Form.Group key={course._id} controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label={course.name}/>
                            </Form.Group>)}


                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="text" onChange={handleSearch.bind(this)} placeholder="Buscar"/>
                </Form.Group>
            </div>

            <Table striped bordered hover>
                <thead>
                <tr>

                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Opciones</th>
                </tr>
                </thead>
                <tbody>
                {
                    filteredStudents ? filteredStudents.map(student => {
                            return (
                                <tr key={student._id}>

                                    <td>{student.name}</td>
                                    <td>{student.lastName}</td>
                                    <td>

                                        <Button onClick={() => handleShow(student)} className="mr-2"><FontAwesomeIcon
                                            icon={faInfoCircle}/></Button>
                                        <Button onClick={() => deleteStudentRequest(student._id)}
                                                variant="danger"><FontAwesomeIcon
                                            icon={faTrash}/></Button>

                                    </td>
                                </tr>
                            )
                        }) : null
                }
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Cursos:
                    <ul>
                        {studentOnModal ? studentOnModal.courses.map(course => <li>{course}</li>) : <li>Ninguno</li>}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


        </section>
    )
}

export default ListCourses;