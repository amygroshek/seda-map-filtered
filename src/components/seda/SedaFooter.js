import React from 'react'
import PropTypes from 'prop-types'
import { getLang } from '../../constants/lang';

const SedaFooter = ({
  branding = [], 
  copyright = '', 
  exportItems = [], 
  shareItems = [], 
  onShare, 
  onExport
}) => {
  branding = Array.isArray(branding) ? branding : [ branding ]
  return (
    <div className="site-footer">
      <div className="site-footer__branding">
        {
          Boolean(branding.length) && branding.map((b, i) =>
            <a key={'branding-'+i} className="site-footer__branding-link" href={b.url}>
              <img className="site-footer__branding-image" src={b.imgSrc} alt={b.alt} />
            </a>  
          )
        }
      </div>
      <div className="site-footer__copyright">
        {copyright}
      </div>
      <div className="site-footer__export">
        <span className="site-footer__link-label">{getLang('LABEL_EXPORT')}</span>
        {
          Boolean(exportItems.length) && exportItems.map((item, i) =>
            <button 
              key={'export-'+i} 
              className="site-footer__button" 
              onClick={(e) => onExport(item)}
            >
              {item.label}
            </button>  
          )
        }
      </div>
      <div className="site-footer__share">
        <span className="site-footer__link-label">{getLang('LABEL_SHARE')}</span>
        {
          Boolean(shareItems.length) && shareItems.map((item, i) =>
            <button 
              key={'export-'+i} 
              className="site-footer__button" 
              onClick={(e) => onShare(item)}
            >
              {item.label}
            </button>  
          )
        }
      </div>
    </div>
  )
}

SedaFooter.propTypes = {
  copyright: PropTypes.string,
  branding: PropTypes.oneOf([
    PropTypes.shape({
      imgSrc: PropTypes.string,
      alt: PropTypes.string,
      url: PropTypes.string
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        imgSrc: PropTypes.string,
        alt: PropTypes.string,
        url: PropTypes.string
      })
    )
  ]),
  exportItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  shareItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  onShare: PropTypes.func,
  onExport: PropTypes.func,
}

export default SedaFooter
