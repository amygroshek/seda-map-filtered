import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ScatterplotOverlay } from '../organisms/Scatterplot';

export default compose(
  withRouter,
  connect(
    (
      { selected, features, sections: { map: { hovered } } }, 
      { match: { params: { region, metric, demographic, secondary }}}
    ) => ({
      xVar: [demographic, secondary].join('_'), 
      yVar: [demographic, metric].join('_'), 
      zVar: 'all_sz', 
      selected: selected[region], 
      region, 
      features, 
      hovered,
      invertX: region === 'schools'
    }), null)
)(ScatterplotOverlay)