
import React from 'react'
import PropTypes from 'prop-types';
import SedaHeader from './SedaHeader';
import SedaFooter from './SedaFooter';

const SedaPage = ({children}) => {
  return (
    <div className="page">
      <SedaHeader />
      <main>
        {children}
      </main>
      <SedaFooter 
        onShare={(e) => { alert(e.label + ' not implemented') }}
        onExport={(e) => { alert('export not implemented') }}
      />
    </div>
  )
}

SedaPage.propTypes = {
  children: PropTypes.node
}

export default SedaPage