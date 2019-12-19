import React from 'react';
import {Navbar, Row, Col, Container} from 'react-bootstrap';
import logo from './logo.jpg'
import Sidebar from './components/sidebar';
import ListStudents from './components/listStudents';
import AddStudent from './components/addStudent';
import AddCourse from './components/addCourse';
import ListCourses from './components/listCourses';
import axios from 'axios';


class App extends React.Component {
    constructor() {
        super()
        this.state = {
            contentKey: 'list',
            students: [],
            courses: []
        }
    }

    changeContent = (key) => {
        this.setState({
            contentKey: key
        })
    }

    updatedStudents = (student) => {
        this.setState({
            students: [...this.state.students, student]
        })
    }

    componentDidMount() {
        axios.get('/api/get-students').then(res => {
            this.setState({
                students: [...res.data]
            })
        }).catch(err => console.error(err))

        axios.get('/api/get-courses').then(res => {
            this.setState({
                courses: [...res.data]
            })
        }).catch(err => console.error(err))
    }

    renderContent = () => {
        switch (this.state.contentKey) {
            case 'list':
                return <ListStudents students={this.state.students}/>
            case 'addStudent':
                return <AddStudent courses={this.state.courses} updateStudents={this.updatedStudents}/>
            case 'addCourse':
                return <AddCourse/>
            case 'listCourses':
                return <ListCourses courses={this.state.courses}/>
        }
    }

    render() {
        return (
            <div className="App">
                <Navbar bg="dark">
                    <Container>
                        <Navbar.Brand href="#home">
                            <img
                                src={logo}
                                width="50"
                                height="50"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                        </Navbar.Brand>
                    </Container>

                </Navbar>
                <Container className="my-4">
                    <Row >
                        <Sidebar changeContent={this.changeContent}/>
                        <Col>
                            {this.renderContent()}
                        </Col>
                    </Row>
                </Container>


            </div>
        );
    }
}

export default App;
