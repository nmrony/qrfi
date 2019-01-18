import QRCode from 'qrcode.react';
import React from 'react';
export default function GenerateQR(props) {
  const { qrValue, qrOptions, show } = props;
  const { isHidden, size, ...options } = qrOptions;
  return (
    <div className="column has-text-centered">
      {show ? (
        <>
          <QRCode renderAs="canvas" level="L" size={parseInt(size, 10)} value={qrValue} {...options} />
          <p className="help has-text-grey-darker is-size-4">Right Click and choose 'save as image' to save it</p>
        </>
      ) : (
        <p className="help has-text-grey-darker is-size-4">Please submit the form</p>
      )}
    </div>
  );
}
