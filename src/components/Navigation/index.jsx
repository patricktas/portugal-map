import React from 'react';

import portugalImage from '../../../images/Image.png';
import flagImage from '../../../images/Flag.png';
import styles from './styles.module.css';

const districts = [
    { name: "Lisboa", districtNumber: 1 },
    { name: "Porto", districtNumber: 2 },
    { name: "Setúbal", districtNumber: 3 },
    { name: "Aveiro", districtNumber: 4 },
    { name: "Braga", districtNumber: 5 },
    { name: "Faro", districtNumber: 6 },
    { name: "Leiria", districtNumber: 7 },
    { name: "Santarém", districtNumber: 8 },
    { name: "Coimbra", districtNumber: 9 },
    { name: "Viseu", districtNumber: 10 },
    { name: "Viana do Castelo", districtNumber: 11 },
    { name: "Vila Real", districtNumber: 12 },
    { name: "Castelo Branco", districtNumber: 13 },
    { name: "Évora", districtNumber: 14 },
    { name: "Beja", districtNumber: 15 },
    { name: "Guarda", districtNumber: 16 },
    { name: "Bragança", districtNumber: 17 },
    { name: "Portalegre", districtNumber: 18 }
];

const colorCodes = [
    "#DB3E87", "#0B9D5F", "#0BC8A7",
    "#5745E8", "#F79F5C", "#F8BD0F",
    "#F95829", "#2BB9D8", "#A9D82A",
    "#DB3A86"
];


export default function Navigation(props) {
  districts.forEach((district, index) => {
      district.colorCode = colorCodes[index % colorCodes.length];
  });

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