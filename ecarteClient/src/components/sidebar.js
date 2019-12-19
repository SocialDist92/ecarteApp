import React from 'react';
import {Col, Nav} from 'react-bootstrap';


const Sidebar = ({changeContent}) => {


    return (

        <Col xs={3}>
            <Nav variant="pills" defaultActiveKey="list" className="flex-column">
                <Nav.Item>
                    <Nav.Link eventKey="list" onClick={() => {
                        changeContent('list')
                    }}>Listar alumnos</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="addStudent" onClick={() => {
                        changeContent('addStudent')
                    }}>Inscribir alumno</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="listCourses" onClick={() => {
                        changeContent('listCourses')
                    }}>Listar cursos</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link eventKey="addCourse" onClick={() => {
                        changeContent('addCourse')
                    }}>Agregar curso</Nav.Link>
                </Nav.Item>

            </Nav>
        </Col>


    )
}

export default Sidebar