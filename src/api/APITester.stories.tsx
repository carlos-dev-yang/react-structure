import React from 'react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { APITester } from './APITester';

export default {
  title: 'Components',
  components: APITester,
  decorators: [withKnobs],
};

export const APITestStory = (): React.ReactElement => {
  return <APITester />;
};
