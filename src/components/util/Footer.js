import React, { Component } from "react";
import style from "../../styles/footer.module.css";
import logo from '../../pics/logo.svg';
import cuvega from '../../pics/Cuvega.svg';

class Footer extends Component {

  render() {
    return (
      <div className={style.footer}>
        <div>
          <img className="logo-footer" src={logo} alt="cuvega-logo" />
          <img className="cuvega-name-footer" src={cuvega} alt="cuvega-name" />
        </div>
        
        <p>Cuvega, 2021</p>
      </div>
    )
  }
}

export default Footer
