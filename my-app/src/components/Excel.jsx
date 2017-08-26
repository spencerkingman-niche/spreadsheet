import React, { Component } from 'react'
import '../css/Excel.css'
import PropTypes from 'prop-types'

class Excel extends Component {
    constructor() {
        super()
        this.state = {
            ascending: true,
            data: [],
            edit: {
                row : null,
                cell : null
            },
            search: false,
            sortBy: null,
        }
        this._handleFocus = this._handleFocus.bind(this)
        this._preSearchData = null
        this._renderTable = this._renderTable.bind(this)
        this._renderToolbar = this._renderToolbar.bind(this)
        this._save = this._save.bind(this)
        this._search = this._search.bind(this)
        this._sort = this._sort.bind(this)
        this._showEditor = this._showEditor.bind(this)
        this._toggleSearch = this._toggleSearch.bind(this)
    }

    componentWillMount() {
        this.setState({data: this.props.initialData})
    }

    _handleFocus(e) {
        e.target.select();
    }

    _save(e) {
        e.preventDefault()
        const input = e.target.firstChild
        let value = input.value
        value = (isNaN(parseInt(value, 10))) ? value : +value
        let data = this.state.data.slice()
        data[this.state.edit.row][this.state.edit.cell] = value
        this.setState({
            edit: {
                row : null,
                cell : null
            }, 
            data: data,
        })
    }

    _search(e) {
        let needle = e.target.value.toLowerCase()
        if (!needle) { // the search string is deleted
            this.setState({data: this._preSearchData})
            return
        }
        let i = e.target.dataset.idx // which column to Search
        let searchData = this._preSearchData.filter((row) => {
            return row[i].toString().toLowerCase().indexOf(needle) > -1
        })
        this.setState({data: searchData})
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

    _toggleSearch() {
        if (this.state.search) {
            this.setState({
                data: this._preSearchData,
                search: false,
            })
            this._preSearchData = null
        } else {
            this._preSearchData = this.state.data
            this.setState({
                search: true
            })
        }
    }

    _renderSearch() {
        console.log(this.state.search)
        if (!this.state.search) {
            return null
        }
        return (
            <tr onChange={this._search}>
                {this.props.headers.map((_ignore, idx) => {
                    return( 
                        <td key={idx}>
                            <input type="text" data-idx={idx}></input>
                        </td>)
                })}
            </tr>
        )
    }

    _renderToolbar() {
        return(
            <button onClick={ this._toggleSearch } className="toolbar">
                Search: {this.state.search+""}
            </button>
        )
    }

    _renderTable() {
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
                    { this._renderSearch() }
                    { this.state.data.map( (row, i) => (
                        <tr key={i}>
                            {row.map( (cell, j) => {
                                let content = cell
                                if (edit && edit.row === i && edit.cell === j) {
                                    content = (
                                        <form onSubmit={this._save}>
                                          <input defaultValue={content} onFocus={this._handleFocus} autoFocus>
                                          </input>
                                        </form>)
                                    return(
                                        <td key={j} data-row={i}>
                                            {content}  
                                        </td>)
                                }
                                return (<td key={j} data-row={i} className={(typeof cell === 'number') ? "text-right" : "text-left"}>{content}</td>)
                                
                            })}     
                        </tr>
                    ))}  
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <div>
                {this._renderToolbar()}
                {this._renderTable()}
            </div>
        )
    }
}

Excel.PropTypes = {
    headers: PropTypes.arrayOf(PropTypes.string),
    initialData: PropTypes.arrayOf(PropTypes.any)
}

export default Excel;