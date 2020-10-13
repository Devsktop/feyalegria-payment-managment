import React from 'react';
import { useSelector } from 'react-redux';

// Components
import CircleChart from './CircleChart';

// Selectors
const studentSelector = state => {
  const { solventStudents, joinedStudents } = state.students;
  const percent = parseInt((solventStudents / joinedStudents) * 100, 10);
  return { solventStudents, joinedStudents, percent };
};

const ChartContainer = () => {
  const students = useSelector(studentSelector);

  return (
    <div className="chart_container">
      <CircleChart
        desc="Alumnos solventes"
        percent={students.percent}
        text={`${students.percent}%`}
        total={`${students.solventStudents}/${students.joinedStudents}`}
      />
      <CircleChart
        desc="Pagos del mes"
        percent="75"
        text={`${75}%`}
        total="900/1122"
      />
      <CircleChart
        desc="Dólares en efectivo"
        percent="45"
        text={`${45}%`}
        total="25/60"
      />
    </div>
  );
};

export default ChartContainer;
