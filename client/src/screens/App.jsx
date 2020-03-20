import React, { Component } from 'react';
import PWAPrompt from 'react-ios-pwa-prompt';
import MediaQuery from 'react-responsive';
import Axios from 'axios';

import '../styles.module.css';
import {
  DetailedStatistics,
  DetailedStatisticsWrapper,
  Spacing,
  Statistics,
  TitleBar
} from '../components';

export default class App extends Component {
  state = {
    stats: {
      cases: '',
      deaths: '',
      recovered: '',
      active: {
        total: '',
        mild: '',
        serious: ''
      },
      closed: {
        total: '',
        recovered: '',
        deaths: ''
      }
    },
    detailsShown1: false,
    detailsShown2: false,
    tapMe: true
  };

  toggleDetails1 = () => {
    const { detailsShown1 } = this.state;
    this.setState({ detailsShown1: !detailsShown1, tapMe: false });
  };

  toggleDetails2 = () => {
    const { detailsShown2 } = this.state;
    this.setState({ detailsShown2: !detailsShown2, tapMe: false });
  };

  componentDidMount = () => {
    Axios.get('https://coronastats-backend.herokuapp.com/stats').then(res =>
      this.setState({ stats: res.data })
    );
  };

  render() {
    return (
      <div>
        {/* Install Prompt */}
        <PWAPrompt permanentlyHideOnDismiss={false} />
        {/* Mobile */}
        <MediaQuery maxDeviceWidth={1224}>
          <TitleBar />
          <Spacing />
          <Statistics
            name='total confirmed'
            data={this.state.stats.cases}
            color='#FF6262'
          />
          <Spacing />
          <Statistics name='deaths' data={this.state.stats.deaths} />
          <Spacing />
          <Statistics
            name='recovered'
            data={this.state.stats.recovered}
            color='#71FFAE'
          />
          <Spacing />
          <Statistics
            name='active'
            data={this.state.stats.active.total}
            color='#FFD371'
            onClick={this.toggleDetails1}
            tapMe={this.state.tapMe}
          />
          <DetailedStatisticsWrapper shown={this.state.detailsShown1}>
            <DetailedStatistics
              name='mild'
              data={this.state.stats.active.mild}
              color='#FFD371'
            />
            <DetailedStatistics
              name='serious'
              data={this.state.stats.active.serious}
              color='#FFD371'
            />
          </DetailedStatisticsWrapper>
          <Spacing />
          <Statistics
            name='closed'
            data={this.state.stats.closed.total}
            color='#71E5FF'
            onClick={this.toggleDetails2}
            tapMe={this.state.tapMe}
          />
          <DetailedStatisticsWrapper shown={this.state.detailsShown2}>
            <DetailedStatistics
              name='recovered'
              data={this.state.stats.closed.recovered}
              color='#71E5FF'
            />
            <DetailedStatistics
              name='deaths'
              data={this.state.stats.closed.deaths}
              color='#71E5FF'
            />
          </DetailedStatisticsWrapper>
          <Spacing />
        </MediaQuery>
        {/* Desktop */}
        <MediaQuery minDeviceWidth={1224}>
          <h1 style={{ color: 'white' }}>
            Not supported for desktop yet. Please view on a mobile device :)
          </h1>
        </MediaQuery>
      </div>
    );
  }
}