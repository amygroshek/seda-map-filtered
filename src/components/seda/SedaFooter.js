import React from 'react'
import PropTypes from 'prop-types'
import Footer from '../organisms/Footer';
import { Button } from '@material-ui/core';
import { getLang } from '../../constants/lang';
import FacebookIcon from '../atoms/FacebookIcon';
import TwitterIcon from '../atoms/TwitterIcon';
import LinkIcon from '@material-ui/icons/Link';
import CodeIcon from '@material-ui/icons/Code';
import StanfordLogo from '../atoms/StanfordLogo';

const branding = {
  url: '#',
  alt: 'Stanford',
};

const links = [
  {
    id: 'export',
    label: getLang('FOOTER_EXPORT_LABEL'),
    items: [
      {
        id: 'pdf',
        label: getLang('FOOTER_EXPORT_PDF'),
      },
      {
        id: 'ppt',
        label: getLang('FOOTER_EXPORT_PPT'),
      }
    ],
  },
  {
    id: 'share',
    label: getLang('FOOTER_SHARE_LABEL'),
    items: [
      {
        id: 'facebook',
        label: getLang('FOOTER_SHARE_FACEBOOK'),
        icon: <FacebookIcon />
      },
      {
        id: 'twitter',
        label: getLang('FOOTER_SHARE_TWITTER'),
        icon: <TwitterIcon />
      },
      {
        id: 'link',
        label: getLang('FOOTER_SHARE_LINK'),
        icon: <LinkIcon />
      },
      {
        id: 'embed',
        label: getLang('FOOTER_EMBED_LINK'),
        icon: <CodeIcon />
      }
    ],
  }
];

const copyright = getLang('FOOTER_COPYRIGHT')

const FooterLinks = ({id, label, links, onClick}) =>
  <div className="site-footer__link-collection">
    <span className="site-footer__link-label">{label}</span>
    {
      Boolean(links.length) && links.map((item, i) =>
        <Button 
          key={'footer-link-'+i} 
          className="site-footer__button" 
          onClick={() => onClick(id, item)}
          aria-label={item.icon && item.label}
        >
          { item.icon ? item.icon : item.label }
        </Button>  
      )
    }
  </div>

FooterLinks.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string.isRequied,
    icon: PropTypes.node,
  })),
  onClick: PropTypes.func,
}


const SedaFooter = ({
  onShare,
  onExport,
}) => {
  return (
    <Footer
      branding={
        <a className="site-footer__branding-link" href={branding.url}>
          <StanfordLogo />
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
  branding: PropTypes.node,
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
