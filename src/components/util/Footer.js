
import React, {Component} from "react";
import style from "../../styles/footer.module.css";

class Footer extends Component {

    render(){
        return(
            <div className={style.footer}>
                Cuvega, 2021
            </div>
        )
    }
}

export default Footer
/*

import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import style from "../../styles/footer.module.css";

class Footer extends Component {
  render () {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col>
              <div className={style.footer}>
                <div className={style.footertext}>© Cuvega, 2021</div> 
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Footer
*/