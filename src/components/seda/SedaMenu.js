import { connect } from 'react-redux'
import { MENU } from '../../constants/site';
import SiteMenu from '../base/SiteMenu';

const mapStateToProps = ({ ui }) => ({
  open: ui.menuOpen,
  navItems: MENU.navItems,
  socialItems: MENU.socialItems,
  activeItemId: 'explorer',
})

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch({
    type: 'TOGGLE_MENU',
    open: false,
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(SiteMenu)
