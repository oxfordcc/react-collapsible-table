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
            {"user_name": "Robert Key", "email": "mi@cubiliaCuraePhasellus.org", "phone": "(016977) 8754", "city": "Lonzee" },
            {"user_name": "Desirae Mcleod", "email": "velit.eget.laoreet@ultriciesadipiscingenim.net", "phone": "0500 199196", "city": "Awka" },
            {"user_name": "Honorato Mckay", "email": "risus.a@utnullaCras.ca", "phone": "(026) 6928 1321", "city": "Fulda" }
            ];


var Table = React.createClass({
    getInitialState() {
        return {
            rows: this.props.rows
        };
    },

    changeExpandState: function(index, currentState) {
        this.state.rows[index]._expanded = !currentState;
        //!!!! we can be efficient here, but now, we are not;
        this.forceUpdate();
    },

    render: function() {
        var columns = this.props.cols.filter(function(c) { return this.props.hiddenColumns.indexOf(c.Name) == -1; }.bind(this));

        var theads = columns.map(function(col, i) {
            return (<th key={col.Name}>{col.Name}</th>);
        });

        var rows = this.state.rows.map(function(row, index) {
            var values = columns.map(function(column) {  
                var colValue = row[column.DataName];
                return (<td>{colValue}</td>);
            }.bind(this));

            var expander = null;
            if (this.props.expandRenderComponent && row._expanded) {
                expander = <tr><td colSpan={this.props.cols.length}><this.props.expandRenderComponent item={row} /></td></tr>;
            }

            return (
                <tbody key={index}>
                    <tr onClick={this.changeExpandState.bind(this, index, row._expanded)}>{values}</tr>
                    {expander}
                </tbody>
            );
        }.bind(this));
        
        return (
            <table>
                <thead>
                    <tr>
                        {theads}
                    </tr>
                </thead>
                {rows}
            </table>
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
