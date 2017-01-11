import React, {PropTypes, Component} from 'react';
import { render } from 'react-dom';
import InputGroup from 'foo';
import ButtonGroup from 'bar';

module.exports = {
  renderApplication: function(domElement, props) {
    render(
            <ApplicationContainer {...props}/>,
            domElement
        );
  }
};

class ApplicationContainer extends Component {
  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            {InputGroup && <InputGroup inputNumber={5}/>}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            {ButtonGroup && <ButtonGroup buttonNumber={3}/>}
          </div>
        </div>
      </div>
    );
  }
}
