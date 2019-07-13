
import React, { useState } from 'react'

import { Typography } from '@material-ui/core';
import { getChoroplethColorAtValue } from '../../modules/config.js';
import DivergingBar from '../../components/molecules/DivergingBar';
import StatDiverging from '../../components/molecules/StatDiverging.js';
import { formatNumber, getValueFromPosition } from '../../utils/index.js';
import Callout from '../../components/molecules/Callout';
import HelpIcon from '@material-ui/icons/Help';

const getRandomVal = () => 
  Math.round(
    100 * ( (Math.random() * 2) - 1 )
  ) / 100

const SandboxComponent = ({
  heading,
  children
}) => {
  return (
    <div className='sandbox__component'>
      <Typography className='sandbox__heading' variant="h3">
        {heading}
      </Typography>
      {children}
    </div>
  )
}


const SandboxView = () => {
  const [ val, setVal ] = useState(-0.5);
  setTimeout(() => setVal(getRandomVal()), 4000)
  return (
    <div className='sandbox'>
      <SandboxComponent heading="Typography">
        <Typography variant="h1">Heading One</Typography>
        <Typography variant="h2">Heading Two</Typography>
        <Typography variant="h3">Heading Three</Typography>
        <Typography variant="h4">Heading Four</Typography>
        <Typography variant="h5">Heading Five</Typography>
        <Typography variant="h6">Heading Six</Typography>
        <Typography variant="subtitle1">Subtitle One</Typography>
        <Typography variant="subtitle2">Subtitle Two</Typography>
      </SandboxComponent>
      <SandboxComponent heading="Help Callout">
        <Callout type="help" icon={<HelpIcon />}>
          How do average test scores impact educational opportunity?
        </Callout>
        <Callout focusRipple={true} type="help" size="small" icon={<HelpIcon />}>
          How do average test scores impact educational opportunity?
        </Callout>
      </SandboxComponent>
      <SandboxComponent heading="Diverging Bar">
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
      </SandboxComponent>
      <SandboxComponent heading="Stat Diverging">
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
      </SandboxComponent>
    </div>
  )
}

export default SandboxView
