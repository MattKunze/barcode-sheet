import React from 'react';
import QRCode from 'qrcode.react';

import ContentEditable from './ContentEditable';

const CARD_STYLE = { height: '100%' };

export default function QrCard(props) {
  return (
    <div className="card" style={CARD_STYLE}>
      <div className="card-header">
        <div className="card-header-title">
          <ContentEditable
            html={props.label || '[add item]'}
            onChange={ev => {
              props.updateLabel(ev.target.value);
            }}
          />
        </div>
        {props.label &&
          <span className="card-header-icon">
            <a className="delete" onClick={props.removeLabel} />
          </span>}
      </div>
      <div className="card-content has-text-centered">
        {props.label && <QRCode value={props.label} />}
      </div>
    </div>
  );
}
