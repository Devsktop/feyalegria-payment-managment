/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '../react/style.sass';

import CalendarMonth from '../react/components/CalendarMonth';

export default {
  title: 'Calendar',
  component: CalendarMonth
};

const Template = args => <CalendarMonth {...args} />;

export const vigente = Template.bind({});
vigente.args = {
  month: 'Septiembre',
  status: 1,
  onClick: () => console.log('hola')
};

export const invigente = Template.bind({});
invigente.args = {
  month: 'Septiembre',
  status: 2
};

export const abono = Template.bind({});
abono.args = {
  month: 'Septiembre',
  status: 3
};
