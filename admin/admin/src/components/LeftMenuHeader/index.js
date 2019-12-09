/**
*
* LeftMenuHeader
*
*/

import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../assets/images/logo-strapi.png'
import styles from './styles.scss';

function LeftMenuHeader() {
  return (
    <div className={styles.leftMenuHeader}>
      <Link to="/" className={styles.leftMenuHeaderLink}>
       <img src={image} className={styles.image}/>
      </Link>
    </div>
  );
}

export default LeftMenuHeader;
