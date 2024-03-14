import React, { useState } from 'react';

import Navigation from '../Navigation'
import Map from '../Map'

export default function App () {
  const [selection, setSelection] = useState();

  return <>
    <Navigation setSelection={(feature) => setSelection(feature)} />
    <Map selection={selection} />
  </>
}