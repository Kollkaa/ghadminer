/**
*
* LeftMenuFooter
*
*/

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { PropTypes } from 'prop-types';

import LeftMenuLink from '../LeftMenuLink';

import styles from './styles.scss';
import messages from './messages.json';
defineMessages(messages);

function LeftMenuFooter({ version }) { // eslint-disable-line react/prefer-stateless-function
  return (
    <div className={styles.leftMenuFooter}>

    <div>
    <div><a href="http://192.168.0.25" className={styles.leftMenuFooter.a}  >Генеральний штаб ЗС України</a></div>
  <div><a  >version:0.0.1.beta</a></div>
  </div>
  </div>
  );
}

LeftMenuFooter.propTypes = {
  version: PropTypes.string.isRequired,
};

export default LeftMenuFooter;
