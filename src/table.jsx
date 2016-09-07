import React from 'react';
import ReactDOM from 'react-dom';
import { orderBy, sortBy } from 'lodash';

import ExpandRenderer from './expandRenderer.jsx';
import ColumnsVisibilitySelector from './columnsVisibilitySelector.jsx';

var exampleCols = [{"Name": "User Name", "DataName": "user_name"},
            {"Name": "Id", "DataName": "id"},
            {"Name": "Email", "DataName": "email"},
            {"Name": "City", "DataName": "city"},
            {"Name": "Phone", "DataName": "phone"}];

var exampleRows = [{"user_name": "Jael Bush", "email": "porttitor.interdum@sed.ca", "phone": "055 2227 9788", "city": "Vedrin", "id": "334" },
            {"user_name": "Grace Mathews", "email": "eleifend.egestas.Sed@vitae.ca", "phone": "056 7656 9273", "city": "Schwerin", "id": "335" },
            {"user_name": "Caesar Mcmahon", "email": "neque.et@tempor.org", "phone": "0346 737 5936", "city": "Rendsburg", "id": "336" },
            {"user_name": "Eric Lloyd", "email": "euismod@SuspendisseeleifendCras.com", "phone": "056 1415 3027", "city": "Laon", "id": "337" },
            {"user_name": "Bernard Dillard", "email": "pellentesque.Sed@justonec.net", "phone": "0845 46 49", "city": "Venezia", "id": "338" },
            {"user_name": "Rhea Simpson", "email": "non@laoreetliberoet.com", "phone": "070 1112 5392", "city": "Appleby", "id": "339" },
            {"user_name": "Robert Key", "email": "mi@cubiliaCuraePhasellus.org", "phone": "016977 8754", "city": "Lonzee", "id": "314" },
            {"user_name": "Desirae Mcleod", "email": "velit.eget.laoreet@ultriciesadipiscingenim.net", "phone": "0500 199196", "city": "Awka", "id": "341" },
            {"user_name": "Honorato Mckay", "email": "risus.a@utnullaCras.ca", "phone": "026 6928 1321", "city": "Fulda", "id": "344" }
            ];

class Table extends React.Component{

    constructor(props) {
        super(props);
        this.state = {rows: this.props.rows,
            cols: this.props.cols,
            hiddenColumns: this.props.hiddenColumns,
            sortedRows: this.props.rows,
            sortedColName: '',
            sortAsc: true
        }
        // bind manually because React class components don't auto-bind
        // http://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding
        this.onHiddenColumnsChanged = this.onHiddenColumnsChanged.bind(this);
    }


    onHiddenColumnsChanged(newHiddenColumns) {
        this.setState({ hiddenColumns: newHiddenColumns });
    }

    changeExpandState(index, currentState) {
        this.state.rows[index]._expanded = !currentState;
        //!!!! we can be efficient here, but now, we are not;
        this.forceUpdate();
    }

    filterData(col) {
        let newRows = [];
        if(this.state.sortedColName === col) {
            this.state.sortAsc ? newRows = _.orderBy(this.state.sortedRows, [col], ['desc']) : newRows = _.orderBy(this.state.sortedRows, [col], ['asc']);
            this.setState({sortedColName: col});
            this.setState({sortAsc: !this.state.sortAsc});
        }
       
        else {
            newRows = _.orderBy(this.state.sortedRows, [col], ['asc']);
            this.setState({sortedColName: col, sortAsc: true});
        }
        this.setState({rows: newRows});
    }

    render() {
        var columns = this.props.cols.filter(function(c) { return this.props.hiddenColumns.indexOf(c.Name) == -1; }.bind(this));

        var theads = columns.map(function(col, i) {
            return (
                <th className = "ttu pv2 ph3 tl striped--border-bottom nowrap" key={col.Name}>
                    {col.Name}
                    <button className="sort-btn" onClick={this.filterData.bind(this, col.DataName)}></button>
                </th>
            );
        }.bind(this));

        var rows = this.state.rows.map(function(row, index) {
            var values = columns.map(function(column) {
                var colValue = row[column.DataName];
                var tdValue = parseInt(colValue.replace(" ",''));
                if(isNaN(tdValue)){
                    return <td key={colValue} className ="pv2 ph3 striped--border-bottom">{colValue}</td>
                }
                else {
                    return <td key={colValue} className="text-right truncate pv2 ph3 striped--border-bottom">{colValue}</td>
                }
            }.bind(this));

            var expander = null;
            if (this.props.expandRenderComponent && row._expanded) {
                expander = <tr><td colSpan={this.props.cols.length + 1 - this.state.hiddenColumns.length}><this.props.expandRenderComponent item={row} /></td></tr>;
            }

            return (
                <tbody key={index}>
                    <tr>
                        <td onClick={this.changeExpandState.bind(this, index, row._expanded)} className="ph3 striped--border-bottom">
                            <button className={row._expanded ? "rotated btn-caret" : "btn-caret"}></button>
                        </td>
                        {values}
                        </tr>
                    {expander}
                </tbody>
            );
        }.bind(this));

        return (
            <div>
                <ColumnsVisibilitySelector hiddenColumns={this.props.hiddenColumns} cols={this.props.cols} onHiddenColumnsChanged={this.onHiddenColumnsChanged} />
            <table className = "collapse ba br2 b--black-10 pv2 ph3">
                <thead>
                    <tr>
                        <th className="ph3 striped--border-bottom"></th>
                        {theads}
                    </tr>
                </thead>
                {rows}
            </table>
            </div>
        );
    }
};

ReactDOM.render(
    <Table cols={exampleCols} rows={exampleRows} hiddenColumns={[]} expandRenderComponent={ExpandRenderer}/ >, document.getElementById('table')
);

export default Table;
