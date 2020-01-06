import React, {Component} from 'react';
import moment from 'moment';

class Ticket extends Component {

    sumCourses = () => {
        let total = 0;
        this.props.courses.forEach(course => {
            total += parseFloat(course.price)
        })

        return total.toFixed(2)
    }

    render() {
        return (
            <div className="p-3">
                <q>
                    Y si se cae el cielo
                    bailo bajo la tormenta

                </q>
                <hr/>


                <table>
                    <tbody>
                    <tr>
                        <th>Concepto</th>
                        <th>Precio</th>
                    </tr>
                    <tr>
                        <td>Inscripción</td>
                        <td>$0.00</td>
                    </tr>

                    {this.props.courses.map((course, i) => {
                        return (
                            <tr key={i}>
                                <td>{course.name}</td>
                                <td>${course.price}</td>
                            </tr>

                        )
                    })}

                    <tr>
                        <td>Total</td>
                        <td>${this.props.courses.length ? this.sumCourses() : null}</td>
                    </tr>
                    </tbody>


                </table>
                <br/>
                <strong
                    style={{textTransform: 'capitalize'}}>{this.props.student.name + ' ' + this.props.student.lastName}</strong>
                <ul>
                    <li><strong>F</strong> Facebook.com/ecartesalsa</li>
                    <li><strong>I</strong> Bailaecarte</li>
                    <li><strong>W</strong> 6141305583</li>
                    <li><strong>M</strong> Mirador #7526 campestre Washington</li>

                </ul>
                <small>{moment().format('ll') }</small>
            </div>
        )
    }
}

export default Ticket;