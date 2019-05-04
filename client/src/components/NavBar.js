import React, { Component } from "react";
import { Menu, Sidebar, Icon, Responsive } from "semantic-ui-react";
import _ from "lodash";
import { withRouter } from "react-router-dom";

const NavBarMobile = ({
  leftItems,
  onPusherClick,
  onToggle,
  rightItems,
  visible
}) => (
  <Sidebar.Pushable>
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      vertical
      visible={visible}
    >
      {_.map(leftItems, item => (
        <Menu.Item {...item} />
      ))}
    </Sidebar>
    <Sidebar.Pusher
      dimmed={visible}
      items={leftItems}
      onClick={onPusherClick}
      style={{ minHeight: "100vh" }}
    >
      <Menu fixed="top" inverted>
        <Menu.Item onClick={onToggle}>
          <Icon name="sidebar" />
        </Menu.Item>
        <Menu.Menu position="right">
          {_.map(rightItems, item => (
            <Menu.Item {...item} />
          ))}
        </Menu.Menu>
      </Menu>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

const NavBarDesktop = ({ leftItems, rightItems }) => (
  <Menu fixed="top" inverted>
    {_.map(leftItems, item => (
      <Menu.Item {...item} />
    ))}
    <Menu.Menu position="right">
      {_.map(rightItems, item => (
        <Menu.Item {...item} />
      ))}
    </Menu.Menu>
  </Menu>
);

class NavBar extends Component {
  state = {
    visible: false
  };

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { leftItems, rightItems } = this.props;
    const { visible } = this.state;

    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
          <NavBarMobile
            leftItems={leftItems}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            rightItems={rightItems}
            visible={visible}
          />
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
        </Responsive>
      </div>
    );
  }
}

export default withRouter(NavBar);
