import * as React from 'react';
// import {RouteComponentProps} from 'react-router';
// import * as _ from 'lodash';
import {styles} from './LayoutTest.styles';
import withStyles from 'material-ui/styles/withStyles';
import {WithStyles} from 'material-ui';
import StateComponent from './StateComponent';
import * as ReactGridLayout from 'react-grid-layout';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

// import MenuIcon from 'material-ui-icons/Menu';
// import 'leaflet/dist/leaflet.css';

const View = (props) => {
  return (
    <Paper className={props.classes.paper} square>
      <Typography type="body2">{props.text}</Typography>
    </Paper>
  );
};

class LayoutTest extends StateComponent<WithStyles<string> & {
  layout?: ReactGridLayout.ReactGridLayoutProps
}, {}> {

  constructor(props: any) {
    super(props);
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  onLayoutChange(layout) {
    /*eslint no-console: 0*/
    console.log(JSON.stringify(layout, null, 2));
    // this.setState({layout});
    // this.props.onLayoutChange(layout); // updates status display
  }

  render() {
    const {classes, layout} = this.props;
    return (
      <div className={classes.root}>
        <ReactGridLayout className="layout" width={1200} {...layout} onLayoutChange={this.onLayoutChange}>
          <div key="a" data-grid={{x: 0, y: 0, w: 1, h: 2}} className={classes.item}>
            <View text="a" classes={classes}/>
          </div>
          <div key="b" data-grid={{x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4}} className={classes.item}>
            <View text="b" classes={classes}/>
          </div>
          <div key="c" data-grid={{x: 4, y: 0, w: 1, h: 2}} className={classes.item}>
            <View text="c" classes={classes}/>
          </div>
        </ReactGridLayout>
      </div>
    );
  }

}

export default withStyles(styles)(LayoutTest);
