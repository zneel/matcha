import React from 'react';
import { Row, Image, Col, Form, DropdownButton } from 'react-bootstrap';
import ImagePlaceholder from './assets/userExemple.png';
import '../css/UserProfil.css';

export default class UserProfil extends React.Component {
  render() {
    return (
      <div className="userProfilView">
        <div className="photoInfoView">
          <div className="photo">
            <h4 className="photoTitle">Paris, France</h4>
            <Image className="mainPhoto" src={ImagePlaceholder} />
            <div className="secondaryPhotoView">
              <Image className="secondaryPhoto" src={ImagePlaceholder} />
              <Image className="secondaryPhoto" src={ImagePlaceholder} />
              <Image className="secondaryPhoto" src={ImagePlaceholder} />
              <Image className="secondaryPhoto" src={ImagePlaceholder} />
            </div>
          </div>
          <div className="info">
            <h4 className="infoTitle">
              <u>Informations</u>
            </h4>
            <Form.Group as={Row}>
              <Form.Label className="textLabel" column sm="5">
                First Name:
              </Form.Label>
              <Col>
                <Form.Control type="text" placeholder="John" />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label className="textLabel" column sm="5">
                Last Name:
              </Form.Label>
              <Col>
                <Form.Control type="text" placeholder="Doe" />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label className="textLabel" column sm="5">
                Username:
              </Form.Label>
              <Col>
                <Form.Control type="text" placeholder="Unknow" />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label className="textLabel" column sm="5">
                Email:
              </Form.Label>
              <Col>
                <Form.Control type="email" placeholder="John.Doe@test.com" />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label className="textLabel" column sm="5">
                Age:
              </Form.Label>
              <Col>
                <Form.Control type="number" placeholder="25" />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label className="textLabel" column sm="5">
                Gender
              </Form.Label>
              <Col>
                <Form.Control as="select">
                  <option>Man</option>
                  <option>Woman</option>
                  <option>Other</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label className="textLabel" column sm="5">
                Looking For:
              </Form.Label>
              <Col>
                <Form.Control as="select">
                  <option>Man</option>
                  <option>Woman</option>
                  <option>Both</option>
                  <option>Attack Chopper</option>
                </Form.Control>
              </Col>
            </Form.Group>
          </div>
        </div>
        <div className="bio">
          <Form.Group>
            <Form.Label className="textLabel">Bio</Form.Label>
            <Form.Control as="textarea" rows="3" />
          </Form.Group>
        </div>
        <div className="interest">
          <Form.Group>
            <Form.Label className="textLabel">Interest</Form.Label>
            <Form.Control as="textarea" rows="3" />
          </Form.Group>
        </div>
        <div className="likeSawProfil">
          <DropdownButton
            className="dropdown-liked"
            variant="secondary"
            title="People who liked my profil"
          >
            <div className="likedMyProfil">
              <div>
                <Image className="likedMyProfilPhoto" src={ImagePlaceholder} />
                <p className="likedMyProfilName">Johna Doe - Paris, France</p>
              </div>

              <div>
                <Image className="likedMyProfilPhoto" src={ImagePlaceholder} />
                <p className="likedMyProfilName">Johna Doe - Paris, France</p>
              </div>
              <div>
                <Image className="likedMyProfilPhoto" src={ImagePlaceholder} />
                <p className="likedMyProfilName">Johna Doe - Paris, France</p>
              </div>
              <div>
                <Image className="likedMyProfilPhoto" src={ImagePlaceholder} />
                <p className="likedMyProfilName">Johna Doe - Paris, France</p>
              </div>
            </div>
            <div className="SawMyProfil" />
          </DropdownButton>
          <DropdownButton
            className="dropdown-liked"
            variant="secondary"
            title="People who saw my profil"
          >
            <div className="likedMyProfil">
              <div>
                <Image className="likedMyProfilPhoto" src={ImagePlaceholder} />
                <p className="likedMyProfilName">Johna Doe - Paris, France</p>
              </div>

              <div>
                <Image className="likedMyProfilPhoto" src={ImagePlaceholder} />
                <p className="likedMyProfilName">Johna Doe - Paris, France</p>
              </div>
              <div>
                <Image className="likedMyProfilPhoto" src={ImagePlaceholder} />
                <p className="likedMyProfilName">Johna Doe - Paris, France</p>
              </div>
              <div>
                <Image className="likedMyProfilPhoto" src={ImagePlaceholder} />
                <p className="likedMyProfilName">Johna Doe - Paris, France</p>
              </div>
            </div>
            <div className="SawMyProfil" />
          </DropdownButton>
        </div>
      </div>
    );
  }
}
