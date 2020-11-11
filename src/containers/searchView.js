import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Subheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import FilterList from '@material-ui/icons/FilterList';
import ActionFavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ActionFavorite from '@material-ui/icons/Favorite';
import { bindActionCreators } from 'redux';
import Menu from '@material-ui/core/Menu';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { sendQuery, addFavorite, removeFavorite, colorHeart, borderHeart, filterByCountry, filterByRocketASSOC } from '../actions/index';

const classes = {

        gridList: {
            width: "800px",
            height: "50%",
            transform: 'translateZ(0)',
        },
        titleBar: {
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
              'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
            height: 48,
        },
        typography: {
            margin: 16,
        },
};

class SearchView extends Component {
    constructor(props) {
        super(props);
        const info = {};
        if (props.results) {
            props.results.map((launch) => info[launch.id] = false);
         }
        this.state = {
          startDate: "",
          endDate: "",
          open: false,
          anchorEl: null,
          ...info,
        };
    }
    componentWillReceiveProps(nextProps) {
        const info = {};
        if (nextProps.results) {
            Object.values(nextProps.results).map((launch) =>
                info[launch.id] = false);
         }
         this.setState({
             ...info,
         });
    }
    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value,
        });
    }
    handleClick(id, event) {
        if (id) {
            this.setState({ [id]: true, anchorEl: event.currentTarget });
        } else {
            this.setState({ open: true, anchorEl: event.currentTarget });
        }
      }

    handleRequestClose(id, event) {
        event.stopPropagation();
        if (id) {
            this.setState({ [id]: false });
        } else {
            this.setState({ open: false });
        }
    }
    addFavorite(launch) {
        this.props.addFavorite(launch);
        this.props.colorHeart(launch.id);
    }
    removeFavorite(id) {
        this.props.removeFavorite(id);
        this.props.borderHeart(id);
    }
    handleFilters(filter, event) {
        if (filter === 'country') {
            this.props.filterByCountry();
        } else {
            this.props.filterByRocketASSOC();
        }
        this.handleRequestClose(null, event);
    }
    render() {
        const {
            startDate,
            endDate,
            anchorEl,
            open,
        } = this.state;

        return (
            <div >
                <div className="layout horizontal" style={{ padding: 16 }}>
                    <TextField
                      id="startDate"
                      label="Start Date"
                      type="date"
                      onChange={this.handleChange.bind(this)}
                      inputProps={{
                            value: startDate,
                        }}
                      InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField
                      id="endDate"
                      label="End Date"
                      type="date"
                      onChange={this.handleChange.bind(this)}
                      inputProps={{
                            value: endDate,
                        }}
                      InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <Button variant="contained" color="primary" style={{ marginLeft: 8 * 4 }} onClick={this.props.sendQuery.bind(this, this.state.startDate, this.state.endDate)}>
                        Search
                    </Button>

                    {this.props.results &&
                    <Fab
                      color="primary"
                      aria-label="filter"
                      aria-owns={this.state.open ? 'simple-menu' : null}
                      aria-haspopup="true"
                      onClick={this.handleClick.bind(this, false)}
                      style={{ marginLeft: 16 }}
                    >
                        <FilterList />
                        <Menu
                          id="simple-menu"
                          open={open}
                          anchorEl={anchorEl}
                          onClose={this.handleRequestClose.bind(this, null)}
                        >
                                <MenuItem onClick={this.handleFilters.bind(this, '')}>Rocket Agency Abbreviation</MenuItem>
                                <MenuItem onClick={this.handleFilters.bind(this, 'country')}>Location Country Code</MenuItem>
                        </Menu>
                    </Fab>}
                </div>
            {this.props.results && (
                <GridList cellHeight={250} style={classes.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <Subheader component="div">Launches</Subheader>
                    </GridListTile>
                    {this.props.results.map(launch => {
                        const icon = launch.favorite ?
                        (<IconButton onClick={this.removeFavorite.bind(this, launch.id)}>
                                <ActionFavorite htmlColor="#ef5350" />
                         </IconButton>
                        )
                        :
                        (<IconButton onClick={this.addFavorite.bind(this, launch)}>
                                <ActionFavoriteBorder htmlColor="rgba(255, 255, 255, 0.54)" />
                         </IconButton>
                        );
                        return (<GridListTile key={launch.id} onClick={this.handleClick.bind(this, launch.id)} style={{ cursor: 'pointer' }}>
                                <img src={launch.rocket.imageURL} alt={launch.rocket.name} />
                                <Popover
                                  open={this.state[launch.id]}
                                  anchorEl={anchorEl}
                                  onClose={this.handleRequestClose.bind(this, launch.id)}
                                  anchorOrigin={{
                                            vertical: 'center',
                                            horizontal: 'center',
                                        }}
                                  transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                >
                                    <Typography className="layout vertical" style={classes.typography} >
                                        <span>Launch Window Start Time: { new Date(launch.windowstart).toLocaleString()} </span>
                                        <span>Rocket Name: {launch.rocket.name}</span>
                                        <span>List of Space Agencies associated with the Rocket:</span>
                                        {launch.rocket.agencies.map((agency) =>
                                        <span key={launch.id + agency.name}>- {agency.name}</span>)}
                                        <span>Launch Location Name / Country: {launch.location.name}</span>
                                    </Typography >
                                </Popover>
                                <GridListTileBar
                                  titlePosition="top"
                                  title={launch.name}

                                  actionPosition="left"
                                  actionIcon={icon}
                                  style={classes.titleBar}
                                />
                                </GridListTile>);
})
                    }
                </GridList>
            )
        }
            </div>);
    }
}

SearchView.propTypes = {
    sendQuery: PropTypes.func.isRequired,
    addFavorite: PropTypes.func.isRequired,
    removeFavorite: PropTypes.func.isRequired,
    colorHeart: PropTypes.func.isRequired,
    borderHeart: PropTypes.func.isRequired,
    filterByCountry: PropTypes.func.isRequired,
    filterByRocketASSOC: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    results: PropTypes.array.isRequired,
};


function mapStateToProps(state) {
    return {
        results: state.results,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
{
        sendQuery,
        addFavorite,
        removeFavorite,
        colorHeart,
        borderHeart,
        filterByCountry,
        filterByRocketASSOC,
},
        dispatch,
);
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchView);
