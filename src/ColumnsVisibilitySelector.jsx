import React from 'react';
import ReactDOM from 'react-dom'

class ColumnsVisibilitySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hiddenColumns: this.props.hiddenColumns,
             dropdownClass: 'out'
         }
        // bind manually because React class components don't auto-bind
        // http://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding
        this.toggleColumnVisibility = this.toggleColumnVisibility.bind(this);
        this.toggleDropdownVisibility = this.toggleDropdownVisibility.bind(this);
    }

    toggleDropdownVisibility() {
        this.state.dropdownClass === "out" ? this.setState({ dropdownClass: "in" }) : this.setState({ dropdownClass: "out" })
    }

    toggleColumnVisibility(columnName) {
        var hiddenIndex = this.state.hiddenColumns.indexOf(columnName);
        var newHidden = this.state.hiddenColumns;

        if (hiddenIndex !== -1) newHidden.splice(hiddenIndex, 1);
        else newHidden.push(columnName);

        this.setState({ hiddenColumns: newHidden });
        this.props.onHiddenColumnsChanged(newHidden);
    }

    render() {
        var colNameInputs = this.props.cols.map(function (col) {
            return (
            <div key={col.Name} className="dropdown-select-option dropdown-checkbox pv2 ph3">
                <input type="checkbox" value={col.Name} id={col.Name} className="checkbox" checked={this.state.hiddenColumns.indexOf(col.Name) === -1} onChange={this.toggleColumnVisibility.bind(this, col.Name)} />
                <label className="checkbox-label ph2" htmlFor={col.Name}>{col.Name}</label>
            </div>);
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
};

export default ColumnsVisibilitySelector; 