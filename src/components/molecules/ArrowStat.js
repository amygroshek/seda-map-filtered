import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Arrow from '../atoms/Arrow';
import { parseColor } from '../../utils';

const getLowOpacityColor = (color, opacity = 0.5) => {
  const [ r, g, b ] = parseColor(color);
  return `rgba(${r},${g},${b},${opacity})`;
}


const ArrowStat = ({
  value,
  color,
  direction,
  classes = {},
  className,
  formatter,
  ...props
}) => {
  const valueBg = color ? getLowOpacityColor(color, 0.25) : 'rgba(0,0,0,0.1)';
  return (
    <div className={classNames("arrow-stat", classes.root, className)} {...props}>
      <Arrow 
        className={classNames("arrow-stat__arrow", classes.arrow)} 
        color={color}
        direction={direction}
      />
      <span className="arrow-stat__value"
        style={{ backgroundColor: valueBg }}
      >
        { formatter ? formatter(value) : value }
      </span>
    </div>
  )
}

ArrowStat.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  color: PropTypes.string,
  direction: PropTypes.string,
  classes: PropTypes.object,
  className: PropTypes.string,
}

export default ArrowStat
