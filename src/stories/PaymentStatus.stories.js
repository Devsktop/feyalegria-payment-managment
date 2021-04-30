/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '../react/style.sass';

import CalendarMonth from '../react/components/CalendarMonth';
import PaymentStatus from '../react/components/income/PaymentStatus';

export default {
  title: 'PaymentStatus',
  component: PaymentStatus
};

const Template = args => <PaymentStatus {...args} />;

export const vigente = Template.bind({});
// vigente.args = {
//   month: 'Septiembre',
//   status: 1,
//   onClick: () => console.log('hola')
// };

