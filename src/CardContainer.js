import React from 'react';

import QrCard from './QrCard';

const COLUMN_STYLES = {
  2: 'is-one-half',
  3: 'is-one-third',
  4: 'is-one-quarter'
};
function partition(list, size) {
  const count = list.length / size;
  let results = [];
  for (let index = 0; index < count; index++) {
    results.push(list.slice(index * size, index * size + size));
  }
  return results;
}

function renderRow(props, items, offset) {
  return items.map((label, index) => {
    return (
      <div className={`column ${COLUMN_STYLES[props.cardsPerRow]}`} key={index}>
        <QrCard
          label={label}
          updateLabel={props.updateLabel.bind(null, offset + index)}
          removeLabel={props.removeLabel.bind(null, offset + index)}
        />
      </div>
    );
  });
}

export default function CardContainer(props) {
  let { cardsPerRow, labels } = props;
  if (!labels.length || labels[labels.length - 1]) {
    labels = labels.concat('');
  }
  const columns = partition(labels, cardsPerRow);
  return (
    <section className="section">
      {columns.map((items, index) => {
        return (
          <div className="columns" key={index}>
            {renderRow(
              props,
              items,
              index * cardsPerRow,
            )}
          </div>
        );
      })}
    </section>
  );
}
