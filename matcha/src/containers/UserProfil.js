import React from 'react';
import { Row, Image, Col, Form, DropdownButton } from 'react-bootstrap';
import ImagePlaceholder from './assets/userExemple.png';
import '../css/UserProfil.css';

export default class UserProfil extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div className="leftPannel">
          <div className="photoView">
            <Image src={ImagePlaceholder} />
          </div>
          <div className="bioView">
            <p className="bioText">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis
              turpis magna. Vivamus rutrum orci purus, vitae venenatis enim
              faucibus eu. Quisque id pulvinar lorem. Praesent sollicitudin
              lobortis velit, sed fringilla ipsum pretium nec. Nullam eu felis
              libero. Nam porttitor pretium nisi non ullamcorper. Donec ut nunc
              ipsum.
            </p>
          </div>
        </div>
        <div className="rightPannel">
          <div className="nameView">
            <h1 className="nameText">John Doe</h1>
          </div>
          <div className="statView">
            <div className="statValue">
              <h3>68</h3>
              <p className="statText">Popularity</p>
            </div>
            <div className="statValue">
              <h3>27</h3>
              <p className="statText">Saw your profil</p>
            </div>
            <div className="statValue">
              <h3>34</h3>
              <p className="statText">Like your profil</p>
            </div>
            <div className="statValue">
              <h3>12</h3>
              <p className="statText">Match</p>
            </div>
          </div>
          <div className="interestView">
            <h3>Interest</h3>
          </div>
        </div>
      </div>
    );
  }
}
