
import { getSingularRegion } from '../utils';
import { getStateSelectOptions } from '../constants/statesFips';
import { getMetrics, getRegions, getDemographics, getGaps } from './config';

export const getAllMetricsControl = (metric, id = 'metric', label = 'Data Metric') => ({
  id,
  label,
  value: metric,
  hint: '',
  options: getMetrics()
})

export const getMetricControl = (metric, id = 'metric', label = 'Data Metric') => ({
  id,
  label,
  value: metric,
  hint: 'press to change between average, growth, or trend in test scores of students in grades 3 - 8 from 2009 - 2016',
  options: getMetrics()
    .filter(m => ['avg', 'grd', 'coh'].indexOf(m.id) > -1)
})

export const getSecondaryMetricControl = (metric, id = 'metric') => ({
  id,
  label: 'Data Metric',
  value: metric,
  hint: 'press to change between average, growth, or trend in test scores of students in grades 3 - 8 from 2009 - 2016',
  options: getMetrics()
    .filter(m => ['ses', 'seg'].indexOf(m.id) > -1)
})

export const getRegionControl = (region, id = 'region') => ({
  id,
  label: 'Region',
  value: region,
  options: getRegions(),
  hint: '',
  formatter: (option) => getSingularRegion(option.id)
})

export const getAllDemographicsControl = (
  demographic, 
  id = 'demographic', 
  label = 'Demographics'
) => ({
  id,
  label,
  value: demographic,
  // filter free lunch program
  options: getDemographics(),
  hint: '',
  formatter: (option) => option.label + ' students'
})

export const getDemographicControl = (
  demographic, 
  id = 'demographic', 
  label = 'Demographics'
) => ({
  id,
  label,
  value: demographic,
  // filter free lunch program
  options: getDemographics().filter(d => d.id !== 'frl'),
  hint: 'press to select a demographic or gap ',
  formatter: (option) => option.label + ' students'
})

export const getDemographicGapControl = (
  value, 
  id = 'demographic', 
  label = 'Demographics'
) => ({
  id,
  label,
  value,
  options: [
    ...getDemographics().filter(d => d.id !== 'frl'), 
    ...getGaps()
  ],
  hint: 'press to select a demographic or gap ',
  formatter: (option) => option.label + (
    value.length === 1 || value === 'all' ? ' students' : ''
  )
})

export const getHighlightControl = (highlight) => ({
  id: 'highlight',
  label: 'Highlight',
  value: highlight ? highlight : 'us',
  options: [
    {
      id: 'us',
      label: 'U.S.'
    },
    ...getStateSelectOptions()
  ]
})

export const getGapControl = (gap) => ({
  id: 'gap',
  label: 'Gap Type',
  value: gap,
  options: getGaps()
})
