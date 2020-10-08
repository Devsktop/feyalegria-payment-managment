import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PropTypes from 'prop-types';

const CircleChart = ({ desc, percent, text, total }) => {
  const chartStyle = buildStyles({
    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: 'butt',

    // Text size
    textSize: '30px',

    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5
  });

  return (
    <div className="circle_chart">
      <p className="circle_chart_desc">{desc}</p>
      <CircularProgressbar
        value={percent}
        text={text}
        styles={chartStyle}
        className="chart"
      />
      <p className="circle_chart_total">{total}</p>
    </div>
  );
};

CircleChart.propTypes = {
  desc: PropTypes.string.isRequired,
  percent: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired
};

export default CircleChart;
