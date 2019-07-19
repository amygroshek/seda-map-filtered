import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ScatterplotOverlay } from '../organisms/Scatterplot';
import { getScatterplotVars } from '../../modules/config';

const mapStateToProps = (
  { selected, features, sections: { map: { hovered } } }, 
  { match: { params: { region, metric, demographic, secondary }}}
) => {
  const vars = getScatterplotVars(region, metric, demographic)
  return ({
    ...vars,
    selected: selected[region], 
    region, 
    features, 
    hovered,
    invertX: region === 'schools'
  })
}

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(ScatterplotOverlay)