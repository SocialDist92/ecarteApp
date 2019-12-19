import React, {Component} from 'react';
import {Form} from 'react-bootstrap';

class AddToStudent extends Component {
    render() {
        return (

            <Form>
                <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label>Curso/Producto</Form.Label>

                    <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Control>
                </Form.Group>
            </Form>

        )
    }
}

export default AddToStudent