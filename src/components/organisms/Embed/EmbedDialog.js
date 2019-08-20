import React from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getLang } from '../../../modules/lang';
import { getScatterplotVars } from '../../../modules/config';
import { InputAdornment, IconButton } from '@material-ui/core';
import CopyIcon from '@material-ui/icons/FileCopy';
import copy from 'copy-to-clipboard';
import { toggleEmbedDialog } from '../../../actions';

const BASE_URL = `${window.location.origin}${window.location.pathname}`;

const getMapEmbedLink = ({ 
  region, 
  demographic, 
  metric, 
  zoom, 
  lat, 
  lon, 
  locations, 
}) => {
  return locations ?
    `${BASE_URL}#/embed/map/${region}/${metric}/${demographic}/${zoom}/${lat}/${lon}/${locations}` :
    `${BASE_URL}#/embed/map/${region}/${metric}/${demographic}/${zoom}/${lat}/${lon}`
}

const getChartEmbedLink = ({
  highlightedState,
  region, 
  demographic, 
  metric, 
  locations, 
}) => {
  const { xVar, yVar, zVar } = getScatterplotVars(region, metric, demographic)
  return locations ?
    `${BASE_URL}#/embed/chart/${highlightedState}/${region}/${xVar}/${yVar}/${zVar}/${locations}` :
    `${BASE_URL}#/embed/chart/${highlightedState}/${region}/${xVar}/${yVar}/${zVar}`
}

const getEmbedCode = (link) => {
  return `<iframe src="${link}" style="width:720px;height:405px" frameborder="0"></iframe>`
}

function EmbedDialog({open, onClose, mapLink, chartLink}) {
  const [ copied, setCopied ] = React.useState('');
  const mapEmbedCode = getEmbedCode(mapLink);
  const chartEmbedCode = getEmbedCode(chartLink);

  const handleFocus = (event) => event.target.select();

  return (
    <Dialog 
      className="dialog dialog--embed" 
      classes={{paper: 'dialog__container'}} 
      open={open} 
      onClose={onClose} 
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        { getLang('EMBED_DIALOG_TITLE')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          { getLang('EMBED_MAP_INSTRUCTIONS') }
          { ' ' }
          <a href={mapLink} target="_blank" rel="noopener noreferrer">
            {getLang('EMBED_MAP_PREVIEW')}
          </a>
        </DialogContentText>
        <TextField
          label={getLang('EMBED_MAP_INPUT_LABEL')}
          type="text"
          value={mapEmbedCode}
          fullWidth
          onFocus={handleFocus}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label={ getLang('EMBED_COPY_LABEL') }
                  onClick={() => { copy(mapEmbedCode); setCopied('map'); }}
                >
                  <CopyIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        { copied === 'map' && <span className='embed-dialog__copied'>Copied!</span> }
        <DialogContentText>
          <br />
          { getLang('EMBED_CHART_INSTRUCTIONS') }
          { ' ' }
          <a href={chartLink} target="_blank" rel="noopener noreferrer">
            {getLang('EMBED_CHART_PREVIEW')}
          </a>
        </DialogContentText>
        <TextField
          label={getLang('EMBED_CHART_INPUT_LABEL')}
          type="text"
          value={chartEmbedCode}
          fullWidth
          onFocus={handleFocus}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label={ getLang('EMBED_COPY_LABEL') }
                  onClick={() => { copy(chartEmbedCode); setCopied('chart'); }}
                >
                  <CopyIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        { copied === 'chart' && <span className='embed-dialog__copied'>Copied!</span> }
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = (
  state,
  { match: { params } }
) => {
  return {
    mapLink: getMapEmbedLink(params),
    chartLink: getChartEmbedLink(params),
    open: state.ui.embedOpen,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClose: () => {
    dispatch(toggleEmbedDialog(false))
  }
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(EmbedDialog)