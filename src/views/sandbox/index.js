
import React, { useState } from 'react'

import { Typography } from '@material-ui/core';
import { getChoroplethColorAtValue } from '../../modules/config.js';
import DivergingBar from '../../components/molecules/DivergingBar';
import StatDiverging from '../../components/molecules/StatDiverging.js';
import { formatNumber, getValueFromPosition } from '../../utils/index.js';

const getRandomVal = () => 
  Math.round(
    100 * ( (Math.random() * 2) - 1 )
  ) / 100

const SandboxView = () => {
  const [ val, setVal ] = useState(-0.5);
  setTimeout(() => setVal(getRandomVal()), 4000)
  return (
    <div className='sandbox'>
      <div className='sandbox__component'>
        <Typography variant="h3">
          Diverging Bar
        </Typography>
        <DivergingBar
          minLabel="-3"
          maxLabel="3"
          value={-1*val}
          color={getChoroplethColorAtValue((-1*val + 1)/2)}
        />

        <DivergingBar
          value={val}
          color={getChoroplethColorAtValue((val + 1)/2)}
        />
      </div>
      <div className='sandbox__component'>
        <Typography variant="h3">
          Stat Diverging
        </Typography>
        <StatDiverging
          label="White"
          minLabel="-3"
          maxLabel="3"
          value={-1*val}
          valueLabel={getValueFromPosition(-1*val, [-3, 3])}
          color={getChoroplethColorAtValue((-1*val + 1)/2)}
        />
        <StatDiverging
          label="Black"
          minLabel="-3"
          maxLabel="3"
          value={formatNumber(-0.6*val)}
          valueLabel={getValueFromPosition(-0.6*val, [-3, 3])}
          color={getChoroplethColorAtValue((-0.6*val + 1)/2)}
        />
        <StatDiverging
          label="Asian"
          minLabel="-3"
          maxLabel="3"
          value={null}
          color={null}
        />
      </div>
    </div>
  )
}

export default SandboxView
