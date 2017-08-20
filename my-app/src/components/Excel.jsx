import React, { Component } from 'react'
import '../css/Excel.css'
import PropTypes from 'prop-types'

class Excel extends Component {
    constructor() {
        super()
        this.state = {
            data : []
        }
    }

    componentWillMount() {
        this.setState({data: this.props.initialData})
    }

    render() {
            console.log(this.props)

        return (
            <table className="table">
                <thead>
                    <tr>
                        {this.props.headers.map( (title, i) => (<th key={i}>{title}</th>) )}
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map( (row, i) => (
                        <tr key={i}>
                            {row.map( (cell, i) => (
                                <td key={i}>
                                    {cell}
                                </td>))}
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        )
    }
}

Excel.PropTypes = {
    headers: PropTypes.arrayOf(PropTypes.string)
}

export default Excel;