var TubeStatus = React.createClass({
    loadLineStatusInfo: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail,tram/status', true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({
                statusData: data,
                statusTimestamp: moment()
            });
        }.bind(this);
        xhr.send();
    },
    getInitialState: function () {
        return {
            statusData: this.props.initialData,
            statusTimestamp: moment()
        };
    },
    componentDidMount: function () {
        window.setInterval(this.loadLineStatusInfo, 60000);
        this.loadLineStatusInfo();
    },
    render: function () {
        return (
          <div className="tubeStatus">
              <StatusTable statusData={this.state.statusData} />
              <p>{this.state.statusTimestamp.format("dddd Do MMMM YYYY hh:mm:ss A")}</p>
              <p><a href="https://unop.uk">unop.uk</a></p>
          </div>
        );
    }
});

var StatusTable = React.createClass({
    render: function () {
        return (
            <div className="statusTable">
                <table>
                    <thead>
                        <tr>
                            <th>Line</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <StatusTableRowList statusData={this.props.statusData} />
                </table>
            </div>
        );
    }
});

var StatusTableRowList = React.createClass({
    render: function () {
        var lineStatusList = this.props.statusData.map(function (line) {
            var order = 9;
            if (line.modeName === 'tube') order = 1;
            if (line.modeName === 'overground') order = 2;
            if (line.modeName === 'tflrail') order = 3;
            if (line.modeName === 'dlr') order = 4;
            if (line.modeName === 'tram') order = 5;
            return (
                <StatusTableRow lineStatusData={line} key={line.id} order={order} />
            );
        }).sort(function (a, b) {
            // Sort by list above
            if (a.props.order < b.props.order) return -1;
            if (a.props.order > b.props.order) return 1;
            // Then by mode name
            if (a.props.lineStatusData.modeName < b.props.lineStatusData.modeName) return -1;
            if (a.props.lineStatusData.modeName > b.props.lineStatusData.modeName) return 1;
            // Then by id (~ lower case name)
            if (a.props.lineStatusData.id < b.props.lineStatusData.id) return -1;
            if (a.props.lineStatusData.id > b.props.lineStatusData.id) return 1;
            return 0;
        });
        return (
            <tbody>
                {lineStatusList}
            </tbody>
        );
    }
});

var StatusTableRow = React.createClass({
    render: function () {
        var status = <td>Getting Status Data....</td>;
        if (this.props.lineStatusData.lineStatuses && this.props.lineStatusData.lineStatuses.length > 0) {
            status = this.props.lineStatusData.lineStatuses[0].statusSeverity === 10 ?
                <td className="standard">Bog Standard Service</td> :
                <td className="bad">
                    <details>
                        <summary>
                            {this.props.lineStatusData.lineStatuses[0].statusSeverityDescription}
                        </summary>
                        {this.props.lineStatusData.lineStatuses[0].reason}
                    </details>
                </td>;
        }
        return (
            <tr>
                <td className={this.props.lineStatusData.id}>{this.props.lineStatusData.name}</td>
                {status}
            </tr>
        );
    }
});

