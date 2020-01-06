import React from 'react';
import axios from 'axios';
import {Form, Button, InputGroup, FormControl, Col, Row} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddCourse extends React.Component {
    constructor() {
        super();
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            name: '',
            price: 0.00
        };

        this.originalState = this.state;
    }

    handleInput = (attr, e) => {
        this.setState({
            [attr]: e.target.value
        })
    }

    handleDatePickerChange = (dateOrder, date, e) => {
        this.setState({
            [dateOrder]: date
        });
    };

    addCourse = (e) => {
        e.preventDefault()
        axios.post('/api/add-course?name=' + this.state.name + '&price=' + this.state.price +
            '&startDate=' + this.state.startDate + '&endDate='+this.state.endDate).then(res => {
                this.props.addCourse(res.data);
                this.setState(this.originalState);
        }).catch(err => {
                console.error(err)
        })
    }

    render() {
        return (
            <Form>
                <Form.Group>
                    <Form.Control value={this.state.name} onChange={this.handleInput.bind(this, 'name')} type="text"
                                  placeholder="Nombre de curso"/>
                </Form.Group>
                <Form.Group>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl value={this.state.price} onChange={this.handleInput.bind(this, 'price')}
                                     aria-label="Amount (to the nearest dollar)"/>
                    </InputGroup>
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Inicio: &nbsp;</Form.Label>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleDatePickerChange.bind(this, 'startDate')}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Fin:&nbsp;</Form.Label>
                            <DatePicker
                                selected={this.state.endDate}
                                onChange={this.handleDatePickerChange.bind(this, 'endDate')}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" onClick={this.addCourse}
                        disabled={!this.state.name.length || !this.state.price} type="submit">
                    Agregar
                </Button>
            </Form>
        )
    }
}

export default AddCourse