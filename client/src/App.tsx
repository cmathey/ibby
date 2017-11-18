import * as React from 'react';
import './App.css';
import Typography from 'material-ui/Typography';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import {darkTheme, lightTheme} from './App.theme';
import * as classNames from 'classnames';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';

import {styles} from './App.styles';
import withStyles from 'material-ui/styles/withStyles';
// import LogisticMap from './components/LogisticMap';
import LayoutTest from './components/LayoutTest';
import LayoutTestResponsive from './components/LayoutTestResponsive';
import {ShowcaseLayout} from './components/LayoutShowcase';

interface AppState {
  drawerOpened: boolean;
}

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      drawerOpened: false
    };
  }

  private handleDrawerOpen = () => {
    this.setState({drawerOpened: true});
  };

  private handleDrawerClose = () => {
    this.setState({drawerOpened: false});
  };

  render() {
    const {classes} = this.props;
    return (
      <MuiThemeProvider theme={lightTheme}>
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <AppBar className={classNames(classes.appBar, this.state.drawerOpened && classes.appBarShift)}>
              <Toolbar disableGutters={!this.state.drawerOpened}>
                <IconButton
                  color="contrast"
                  aria-label="open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(classes.menuButton, this.state.drawerOpened && classes.hide)}
                >
                  <MenuIcon/>
                </IconButton>
                <Typography type="title" color="inherit" noWrap>
                  Accuracy Logistic
                </Typography>
              </Toolbar>
            </AppBar>
            <MuiThemeProvider theme={darkTheme}>
              <Drawer
                type="persistent"
                classes={{
                  paper: classes.drawerPaper
                }}
                open={this.state.drawerOpened}
              >
                <div className={classes.drawerInner}>
                  <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                      <ChevronLeftIcon/>
                    </IconButton>
                  </div>
                  <Divider/>
                  {/*{*/}
                  {/*makeNavItem(classes, <DashboardIcon*/}
                  {/*className={classes.navIcon}/>, 'Dashboard', DASH_PATH, location)*/}
                  {/*}*/}
                  {/*{*/}
                  {/*makeNavItem(classes, <SettingsIcon*/}
                  {/*className={classes.navIcon}/>, 'Setup', SETUP_PATH, location)*/}
                  {/*}*/}
                  {/*{*/}
                  {/*makeNavItem(classes, <UsersIcon*/}
                  {/*className={classes.navIcon}/>, 'Users', USERS_PATH, location)*/}
                  {/*}*/}
                </div>
              </Drawer>
            </MuiThemeProvider>
            <main className={classNames(classes.content, this.state.drawerOpened && classes.contentShift)}>
              <ShowcaseLayout/>
              {/*<LayoutTest layout={{cols: 12, autoSize: true}}/>*/}
              {/*<Switch>*/}
              {/*<Route exact path={DASH_PATH} component={DashView}/>*/}
              {/*<Route exact path={SETUP_PATH} component={SetupView}/>*/}
              {/*<Redirect from="/" to={DASH_PATH}/>*/}
              {/*<Route component={NoMatch}/>*/}
              {/*</Switch>*/}
            </main>
            <Divider/>
            <LayoutTestResponsive/>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
