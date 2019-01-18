import React, { Component, Fragment } from 'react';
import GenerateQR from './GenerateQR';
import { WifiFormContainer } from './WifiForm';

function escape_string(string) {
  const to_escape = ['\\', ';', ',', ':', '"'];
  let output = '';
  for (let i = 0; i < string.length; i++) {
    if (string[i].indexOf(to_escape) !== -1) {
      output += '\\' + string[i];
    } else {
      output += string[i];
    }
  }
  return output;
}

class App extends Component {
  state = {
    showqr: false,
    values: {
      size: 300,
      ssid: '',
      encryption: '',
      password: '',
      includeMargin: false,
      bgColor: '#ffffff',
      fgColor: '#000000',
      isHidden: false
    }
  };

  handleSubmit = values => {
    this.setState({ values, showqr: true });
  };

  generateQRString = () => {
    const { ssid, password, encryption, isHidden } = this.state.values;
    var qrstring = 'WIFI:S:' + escape_string(ssid) + ';T:' + encryption + ';P:' + escape_string(password) + ';';
    if (isHidden) {
      qrstring += 'H:true';
    }
    qrstring += ';';
    return qrstring;
  };
  render() {
    return (
      <Fragment>
        <section className="hero is-info">
          <div className="hero-body has-text-centered">
            <div className="container">
              <h1 className="title">QRfi</h1>
              <h2 className="subtitle">Generate QRCode for Wifi</h2>
            </div>
          </div>
        </section>
        <section className="section row">
          <div className="columns">
            <div className="column is-half">
              <div className="box">
                <WifiFormContainer initialValue={this.state.values} handleSubmit={this.handleSubmit} />
              </div>
            </div>
            <GenerateQR qrValue={this.generateQRString()} show={this.state.showqr} qrOptions={this.state.values} />
          </div>
        </section>
      </Fragment>
    );
  }
}

export default App;
