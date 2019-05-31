
import React from 'react'
import PropTypes from 'prop-types';
import SedaHeader from '../../components/seda/SedaHeader';
import SedaFooter from '../../components/seda/SedaFooter';

const DefaultPage = ({children}) => {
  return (
    <div className="page">
      <SedaHeader />
      <main>
        {children}
      </main>
      <SedaFooter />
    </div>
  )
}

DefaultPage.propTypes = {
  children: PropTypes.node
}

export default DefaultPage