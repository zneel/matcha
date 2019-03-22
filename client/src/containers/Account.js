import React from 'react';
import { Image } from 'react-bootstrap';

export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editBio: false,
      bioText: 'couco'
    };
  }

  handleSubmit(event) {
    this.setState({ editBio: false });
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
          <div className="col-md-6 px-0">
            <h1 className="display-4 font-italic">Mon profil</h1>
            {!this.state.editBio ? (
              <p
                className="lead my-3"
                onClick={() => this.setState({ editBio: true })}
              >
                {this.state.bioText}
              </p>
            ) : (
              <form onSubmit={this.handleSubmit}>
                <textarea
                  type="text"
                  id="noter-text-area"
                  value={this.state.bioText}
                  onChange={e => this.setState({ bioText: e.target.value })}
                  style={{ width: 400, height: 150 }}
                />
                <br />
                <input type="submit" value="Submit" />
              </form>
            )}
            <p className="lead mb-0">#yolo #swag #toto #tryhard #matcha</p>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-6">
            <div className="card flex-md-row mb-4 box-shadow h-md-250">
              <div className="card-body d-flex flex-column align-items-start">
                <h3 className="mb-0">Mes informations</h3>
              </div>
              <Image
                className="card-img-right flex-auto d-none d-lg-block"
                data-src="holder.js/200x250?theme=thumb"
                alt="Thumbnail [200x250]"
                style={{ width: 200, height: 250 }}
                src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_169a4a9e374%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_169a4a9e374%22%3E%3Crect%20width%3D%22200%22%20height%3D%22250%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2255.609375%22%20y%3D%22131%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                data-holder-rendered="true"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="card flex-md-row mb-4 box-shadow h-md-250">
              <div className="card-body d-flex flex-column align-items-start">
                <h3 className="mb-0">Behaviour</h3>
              </div>
              <Image
                className="card-img-right flex-auto d-none d-lg-block"
                data-src="holder.js/200x250?theme=thumb"
                alt="Thumbnail [200x250]"
                src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_169a4a9e375%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_169a4a9e375%22%3E%3Crect%20width%3D%22200%22%20height%3D%22250%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2255.609375%22%20y%3D%22131%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                data-holder-rendered="true"
                style={{ width: 200, height: 250 }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
