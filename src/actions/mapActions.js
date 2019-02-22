export const onHoverFeature = (feature) => ({
  type: 'SET_HOVERED_FEATURE',
  feature
});

export const onCoordsChange = (coords) => ({
  type: 'SET_COORDS',
  coords
});

export const onViewportChange = (viewport) => ({
  type: 'SET_MAP_VIEWPORT',
  viewport
});

export const onDemographicChange = (demographic) => ({
  type: 'SET_MAP_DEMOGRAPHIC',
  demographic
});

export const onMetricChange = (metric) => ({
  type: 'SET_MAP_METRIC',
  metric
});

export const onRegionChange = (region) => ({
  type: 'SET_MAP_REGION',
  region
});

export const onSelectFeature = (feature) => ({
  type: 'ADD_SELECTED_FEATURE',
  feature
});

export const onRemoveSelectedFeature = (feature) => ({
  type: 'REMOVE_SELECTED_FEATURE',
  feature
});

