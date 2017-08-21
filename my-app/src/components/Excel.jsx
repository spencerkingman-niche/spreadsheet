import React, { Component } from 'react'
import '../css/Excel.css'
import PropTypes from 'prop-types'

class Excel extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            edit: {
                row : null,
                cell : null
            },
            sortBy: null,
            ascending: true
        }
        this._save = this._save.bind(this)
        this._sort = this._sort.bind(this)
        this._showEditor = this._showEditor.bind(this)
    }

    componentWillMount() {
        this.setState({data: this.props.initialData})
    }

    _save(e) {
        e.preventDefault()
        const input = e.target.firstChild
        var data = this.state.data.slice()
        data[this.state.edit.row][this.state.edit.cell] = input.value
        this.setState({
            edit: {
                row : null,
                cell : null
            }, 
            data: data,
        })
    }

    _showEditor(e) {
        e.preventDefault()
        const row = parseInt(e.target.dataset.row, 10)
        const column = e.target.cellIndex
        this.setState({
            edit : {
                row : row,
                cell : column
            }
        })
    }

    _sort(e) {
        e.preventDefault()
        const column = e.target.cellIndex
        let data = this.state.data.slice()
        let ascending = (this.state.sortBy === column) && !(this.state.ascending)
        data.sort((a, b) => (ascending ? 
                                (a[column]<b[column] ? 1 : -1) :
                                (a[column]>b[column] ? 1 : -1)
                                ))
        this.setState({
            data: data,
            sortBy: column,
            ascending: ascending
        })
    }

    render() {
        const edit = this.state.edit
        return (
            <table className="table">
                <thead>
                    <tr onClick={this._sort}>
                        {this.props.headers.map((title, i) => {
                            if (this.state.sortBy === i) {
                                title += (this.state.ascending ? ' \u2191' : ' \u2193')
                            }
                            return (<th key={i}>{title}</th>) 
                        })} 
                    </tr>
                </thead>
                <tbody onDoubleClick={this._showEditor}>
                    {this.state.data.map( (row, i) => (
                        <tr key={i}>
                            {row.map( (cell, j) => {
                                if (edit && edit.row === i && edit.cell === j) {
                                    return(
                                        <td key={j} data-row={i}>
                                            <form onSubmit={this._save}>
                                                <input type='text' defaultValue={this.state.data[i][j]} />
                                            </form>
                                        </td>)
                                }
                                return (<td key={j} data-row={i}>{cell}</td>)
                            })}     
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