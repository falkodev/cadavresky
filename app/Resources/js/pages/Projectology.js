import React from 'react';
import ajaxGet from '../helpers/ajax';

const Projectology = React.createClass({
    componentDidMount: function() {
        var _this = this;
        this.serverRequest =
          axios
            .get("http://codepen.io/jobs.json")
            .then(function(result) {
              _this.setState({
                jobs: result.data.jobs
              });
            })
    },
    render: function() {
        return (
          <div>

          </div>
        );
    }
});

export default Projectology;
