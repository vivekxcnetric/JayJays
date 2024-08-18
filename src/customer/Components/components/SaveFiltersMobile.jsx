import React from 'react';
import { useInstantSearch } from 'react-instantsearch';

import { formatNumber } from '../utils';

export function SaveFiltersMobile({ onClick }) {
  const { results } = useInstantSearch();
  const nbHits = results ? results.nbHits : 0;

  return (
    <button className="button button-primary" onClick={onClick}>
      See {formatNumber(nbHits)} results
    </button>
  );
}
