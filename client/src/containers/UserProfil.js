import React from 'react';
import { Image } from 'react-bootstrap';
import ImagePlaceholder from './assets/userExemple.png';

export default class UserProfil extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <div
          className="container"
          style={{
            textAlign: 'center'
          }}
        >
          <Image src={ImagePlaceholder} height="50%" width="50%" />
        </div>
        <div
          className="container"
          style={{
            textAlign: 'center'
          }}
        >
          <div className="m-5">
            <Image
              src={ImagePlaceholder}
              height="128"
              width="128"
              style={{ paddingRight: 2 }}
            />
            <Image
              src={ImagePlaceholder}
              height="128"
              width="128"
              style={{ paddingRight: 2 }}
            />
            <Image
              src={ImagePlaceholder}
              height="128"
              width="128"
              style={{ paddingRight: 2 }}
            />
            <Image
              src={ImagePlaceholder}
              height="128"
              width="128"
              style={{ paddingRight: 2 }}
            />
          </div>
        </div>
        <div
          className="container"
          style={{
            display: 'flex',
            textAlign: 'center'
          }}
        >
          <div className="col-lg-6" style={{ display: 'block' }}>
            <h4>Interest</h4>
            <p>
              Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras
              mattis consectetur purus sit amet fermentum.
            </p>
          </div>
          <div className="col-lg-6">
            <h4>Biography</h4>
            <p>
              Donec id elit non mi porta gravida at eget metus. Maecenas
              faucibus mollis interdum.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
