import React, {useState, useRef} from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import Ticket from './ticket';
import ReactToPrint from 'react-to-print';
import axios from 'axios';

import Webcam from "react-webcam";



const AddStudent = ({updateStudents, courses}) => {
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };
    const [name, setName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [coursesSelected, setCoursesSelected] = React.useState([])
    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState(false)
    const ticketRef = useRef();
    const printButtonRef = useRef();

    /*const webcamRef = React.useRef(null);*/

    /*const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
        },
        [webcamRef]
    );*/

    const clearFields = () => {
        setName('')
        setLastName('')
        setCoursesSelected([])
    }
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

                        optionsSelected.push({
                            name: e.target.options[attr].value,
                            price: e.target.options[attr].dataset.price
                        })
                    }
                }
                setCoursesSelected([...optionsSelected])

                break;
        }
    }
    const addStudent = (e) => {
        e.preventDefault()
        const courses = coursesSelected.map(course => course.name)
        axios.post('/api/add-student', {name, lastName, courses}).then(res => {
            printButtonRef.current.click()
            updateStudents(res.data)
            setSuccess(true)

        }).catch(err => {
            console.error(err)
            setError(true)
        })
    }

    return (
        <section>
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
                                <option data-price={course.price} key={course._id}>{course.name}</option>
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


                <Button variant="primary" onClick={addStudent}
                        disabled={!name.length || !lastName.length || !coursesSelected.length} type="submit">
                    Agregar
                </Button>

            </Form>

            {/*<Webcam
                audio={false}
                height={200}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={200}
                videoConstraints={videoConstraints}
            />*/}
            {/*<button onClick={capture}>Capture photo</button>*/}
            <div className="d-none">
                <ReactToPrint
                    onAfterPrint={clearFields}
                    trigger={() => <button ref={printButtonRef}>Print this out!</button>}
                    content={() => ticketRef.current}
                />



                <Ticket student={{name, lastName}} courses={coursesSelected} ref={ticketRef}/>
            </div>
        </section>
    )


}

export default AddStudent;