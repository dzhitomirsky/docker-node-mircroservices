import React, {PropTypes, Component} from 'react';
import _ from 'lodash';

export default class ButtonGroup extends Component {
  static propTypes = {
    buttonNumber: PropTypes.number.isRequired
  };

  render() {
    return(
      <div className="form-horizontal">
        {_.times(this.props.buttonNumber, (idx) => {
          return(
            <div className="form-group" key={idx}>
              <div className="col-sm-10">
                <button className="btn btn-default" onChange={() => {alert(`Button #${idx}`)}}>
                  Button #{idx}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
