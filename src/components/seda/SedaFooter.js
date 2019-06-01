import React from 'react'
import PropTypes from 'prop-types'
import { FOOTER } from '../../constants/site';
import Footer from '../organisms/Footer';
import { Button } from '@material-ui/core';

const { branding, links, copyright } = FOOTER;

const FooterLinks = ({id, label, links, onClick}) =>
  <div className="site-footer__link-collection">
    <span className="site-footer__link-label">{label}</span>
    {
      Boolean(links.length) && links.map((item, i) =>
        <Button 
          key={'footer-link-'+i} 
          className="site-footer__button" 
          onClick={(e) => onClick(id, item)}
        >
          {item.label}
        </Button>  
      )
    }
  </div>


const SedaFooter = ({
  onShare,
  onExport,
}) => {
  return (
    <Footer
      branding={
        <a className="site-footer__branding-link" href={branding.url}>
          <img className="site-footer__branding-image" src={branding.imgSrc} alt={branding.alt} />
        </a>  
      }
      copyright={copyright}
      links={
        <div className="site-footer__actions">
          { links && links.map((collection, i) =>
            <FooterLinks
              id={collection.id}
              key={"links-" + i}
              label={collection.label} 
              links={collection.items} 
              onClick={(id, item) => id === 'export' ? onExport(item) : onShare(item)}
            />  
          )}
        </div>
      }
    />
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
