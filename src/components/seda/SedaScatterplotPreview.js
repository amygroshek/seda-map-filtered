
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import ScatterplotPreview from '../organisms/ScatterplotPreview';

const mapStateToProps = ({
  scatterplot: { data }
}, {
  match: { params: { region, highlightedState, metric, demographic, secondary }}
}) => ({
  yVar: [demographic, metric].join('_'),
  xVar: [demographic, secondary].join('_'),
  zVar: 'all_sz',
  data,
  region,
  highlightedState,
})

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(ScatterplotPreview)
