import React from 'react';

import portugalImage from '../../../images/Image.png';
import flagImage from '../../../images/Flag.png';
import { districts } from '../../../data/districts';
import styles from './styles.module.css';

export default function Navigation(props) {
  return <div className={styles.navigation}>
      <div className={styles.cover}>
        <div className={styles.imageContainer}>
          <img src={portugalImage} />
          <img src={flagImage} className={styles.flag} />
        </div>
        <h1>Portugal</h1>
      </div>
      <div className={styles.main}>
        <h3 className={styles.title}>Districts</h3>
        <nav>
          <ul className={styles.districts}>
            {
              districts.map(district => <li key={district.name} onClick={() => props.setSelection(district.name)} className={styles.district}>
                <div className={styles.number} style={{ backgroundColor: district.colorCode }}>{district.districtNumber}</div>
                <span className={styles.name}>{district.name}</span>
              </li>)
            }
          </ul>
        </nav>
      </div>
  </div>;
} 