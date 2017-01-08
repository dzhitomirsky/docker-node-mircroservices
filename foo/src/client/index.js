import React, {PropTypes, Component} from 'react';
import _ from 'lodash';

export default class InputGroup extends Component {
  static propTypes = {
    inputNumber: PropTypes.number.isRequired
  };

  state = {};

  render() {
    return(
      <div className="form-horizontal">
        {_.times(this.props.inputNumber, (idx) => {
          return(
            <div className="form-group" key={idx}>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  value={this.state[`input_${idx}`]}
                  onChange={(e) => {this.setState({[`input_${idx}`]: e.target.Value})}}/>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
