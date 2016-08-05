import React from 'react';
import ReactDOM from 'react-dom';

var exampleCols = [{"Name": "User Name", "DataName": "user_name"},
            {"Name": "Email", "DataName": "email"},
            {"Name": "City", "DataName": "city"},
            {"Name": "Phone", "DataName": "phone"}];

var exampleRows = [{"user_name": "Jael Bush", "email": "porttitor.interdum@sed.ca", "phone": "055 2227 9788", "city": "Vedrin" },
            {"user_name": "Grace Mathews", "email": "eleifend.egestas.Sed@vitae.ca", "phone": "056 7656 9273", "city": "Schwerin" },
            {"user_name": "Caesar Mcmahon", "email": "neque.et@tempor.org", "phone": "0346 737 5936", "city": "Rendsburg" },
            {"user_name": "Eric Lloyd", "email": "euismod@SuspendisseeleifendCras.com", "phone": "056 1415 3027", "city": "Laon" },
            {"user_name": "Bernard Dillard", "email": "pellentesque.Sed@justonec.net", "phone": "0845 46 49", "city": "Venezia" },
            {"user_name": "Rhea Simpson", "email": "non@laoreetliberoet.com", "phone": "070 1112 5392", "city": "Appleby" },
            {"user_name": "Robert Key", "email": "mi@cubiliaCuraePhasellus.org", "phone": "016977 8754", "city": "Lonzee" },
            {"user_name": "Desirae Mcleod", "email": "velit.eget.laoreet@ultriciesadipiscingenim.net", "phone": "0500 199196", "city": "Awka" },
            {"user_name": "Honorato Mckay", "email": "risus.a@utnullaCras.ca", "phone": "026 6928 1321", "city": "Fulda" }
            ];

var Table = React.createClass({
    getInitialState() {
        return {
            rows: this.props.rows,
            hiddenColumns: this.props.hiddenColumns
        };
    },

    onHiddenColumnsChanged: function (newHiddenColumns) {
        this.setState({ hiddenColumns: newHiddenColumns });
    },

    changeExpandState: function(index, currentState) {
        this.state.rows[index]._expanded = !currentState;
        //!!!! we can be efficient here, but now, we are not;
        this.forceUpdate();
    },

    render: function() {
        var columns = this.props.cols.filter(function(c) { return this.props.hiddenColumns.indexOf(c.Name) == -1; }.bind(this));

        var theads = columns.map(function(col, i) {
            return (<th className = "ttu pv2 ph3 tl striped--border-bottom" key={col.Name}>{col.Name}</th>);
        });

        var rows = this.state.rows.map(function(row, index) {
            var values = columns.map(function(column) {
                var colValue = row[column.DataName];
                var tdValue = parseInt(colValue.replace(" ",''));
                if(isNaN(tdValue)){
                    return <td key={colValue} className ="pv2 ph3 striped--border-bottom">{colValue}</td>
                }
                else {
                    return <td key={colValue} className="text-right pv2 ph3 striped--border-bottom">{colValue}</td>
                }
            }.bind(this));

            var expander = null;
            if (this.props.expandRenderComponent && row._expanded) {
                expander = <tr><td colSpan={this.props.cols.length + 1 - this.state.hiddenColumns.length}><this.props.expandRenderComponent item={row} /></td></tr>;
            }

            return (
                <tbody key={index}>
                    <tr>
                        <td onClick={this.changeExpandState.bind(this, index, row._expanded)}>
                            <button className="btn-caret"></button>
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
                        <th></th>
                        {theads}
                    </tr>
                </thead>
                {rows}
            </table>
            </div>
        );
    }
});


// in props it receives
// - array of hidden columns
// - cols


var ColumnsVisibilitySelector = React.createClass({
    getInitialState: function () {
        return {
            hiddenColumns: this.props.hiddenColumns,
            dropdownClass: 'out'
        }
    },

    toggleDropdownVisibility: function () {
        this.state.dropdownClass === "out" ? this.setState({ dropdownClass: "in" }) : this.setState({ dropdownClass: "out" })
    },

    toggleColumnVisibility: function (columnName) {
        var hiddenIndex = this.state.hiddenColumns.indexOf(columnName);
        var newHidden = this.state.hiddenColumns;

        if (hiddenIndex !== -1) newHidden.splice(hiddenIndex, 1);
        else newHidden.push(columnName);

        this.setState({ hiddenColumns: newHidden });
        this.props.onHiddenColumnsChanged(newHidden);
    },

    handleOutsideClick: function (ev) {
        var domNode = ReactDOM.findDOMNode(this);
        if(!domNode || !domNode.contains(ev.target)) {
            if (this.state.dropdownClass === 'in') {
                this.setState({ dropdownClass: 'out' });
            }
        }
    },

    componentDidMount: function () {
        window.addEventListener('click', this.handleOutsideClick, false);
    },

    render: function () {
        console.log("Hidden columns:",  this.props.hiddenColumns);
        var colNameInputs = this.props.cols.map(function (col) {
            return (
            <div key={col.Name} className="dropdown-select-option dropdown-checkbox pv2 ph3">
                <input type="checkbox" value={col.Name} id={col.Name} className="checkbox" checked={this.state.hiddenColumns.indexOf(col.Name) === -1} onChange={this.toggleColumnVisibility.bind(this, col.Name)} />
                <label className="checkbox-label ph2" htmlFor={col.Name}>{col.Name}</label>
            </div>
            );
    }.bind(this));

    return (
        <div className={"dropdown-select dropdown-select-trigger mb2 " + this.state.dropdownClass } ref="wrappedComponent">
            <button className="btn btn-dropdown ba b--black-20 bg-white black-90 link br2 dim b dib mr3 pv2 ph3" onClick={this.toggleDropdownVisibility }>Edit columns</button>
            <div className="dropdown-options ba b--black-20 bg-white black-70 br2 pv2 ph2 mt1">
                {colNameInputs}
            </div>
        </div>
        );
    }
});

var ExpandRenderer = React.createClass({
    render: function() {
        return (<h1>"Hello"</h1>);
    }
});

ReactDOM.render(
    <Table cols={exampleCols} rows={exampleRows} hiddenColumns={["Phone"]} expandRenderComponent={ExpandRenderer}/ >, document.getElementById('table')
);

export default Table;
