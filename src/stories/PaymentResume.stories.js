/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '../react/style.sass';

import PaymentResume from '../react/components/income/PaymentResume';


export default {
  title: 'PaymentResume',
  component: PaymentResume
};

const Template = args => <PaymentResume {...args} />;

export const resume = Template.bind({});
resume.args = {
    incomeFetched: false
}

