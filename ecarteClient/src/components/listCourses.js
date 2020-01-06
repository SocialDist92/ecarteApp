import React, {useState} from 'react';
import {Table, Form, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faCartPlus} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const ListCourses = ({courses, deleteCourse}) => {
    const [filteredCourses, setFilteredCourses] = useState(courses ? [...courses] : [])
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre",
        "Noviembre", "Diciembre"]
    const deleteCourseRequest = (id) => {
        axios.post('/api/delete-course?id=' + id).then(
            () => {
                deleteCourse(id)
            }
        ).catch(e => console.error(e))
    }

    React.useEffect(() => {
        setFilteredCourses(courses)
    }, [courses])
    return (
        <section>

            <Table striped bordered hover>
                <thead>
                <tr>

                    <th>Nombre curso</th>
                    <th>Inicia</th>
                    <th>Termina</th>
                    <th>Opciones</th>
                </tr>
                </thead>
                <tbody>
                {filteredCourses ? filteredCourses.map(course => {
                        let startDate = course.startDate ? new Date(course.startDate) : null;
                        let endDate = course.endDate ? new Date(course.endDate) : null;


                        return (
                            <tr key={course._id}>
                                <td>{course.name}</td>
                                <td>{startDate ? startDate.getDate() + ' de ' + months[startDate.getMonth()] : null}</td>
                                <td>{endDate ? endDate.getDate() + ' de ' + months[endDate.getMonth()] : null}</td>
                                <td>
                                    <Button variant="danger" onClick={() => deleteCourseRequest(course._id)}><FontAwesomeIcon
                                        icon={faTrash}/></Button>
                                </td>


                            </tr>
                        )
                    }) : null}
                </tbody>
            </Table>
        </section>
    )
}

export default ListCourses;