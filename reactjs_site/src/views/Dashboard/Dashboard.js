import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import Widget02 from '../../views/Widgets/Widget02'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { Polyline } from "react-google-maps";
import PipeApi from "../../api/PipeApi";
import { Pipe } from "../../api/model/Pipe";

const vikMapStyle = require("./vikMapStyle.json");



const MainMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 43.843151, lng: 18.339907 }}
        defaultOptions={{ styles: vikMapStyle }}
        disableDefaultUI={true}
    >
        {props.isMarkerShown && <Marker position={{ lat: 43.8407031, lng: 18.3337828 }} />}

        {props.pipes}
    </GoogleMap>
));

class Dashboard extends Component {
  selectedPipe = null;

  pipeClick(pipe) {
      this.selectedPipe = this.pipes[this.pipes.findIndex((val, i) => { return val.key === pipe; })];

      this.forceUpdate();
  }

  pipeStyleOptions = {
      strokeColor: '#00eeff',
      strokeWeight: 10,
      geodesic: true
  };

  pipes = [];


  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };

    PipeApi.GetPipes().subscribe(
        vals => {
            this.pipes = [];
            for ( let pipe of vals ) {
                this.pipes.push(
                <Polyline
                    name={pipe.name}
                    key={pipe.name}
                    path={[
                        {lat: pipe.start_lat, lng: pipe.start_lng },
                        {lat: pipe.end_lat, lng: pipe.end_lng }
                    ]}
                    options={this.pipeStyleOptions}
                    onClick={(event) => this.pipeClick('pipe1')}
                />);
            }

            this.forceUpdate();
        }
    );

  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
          <Row>
              <Col xs="12" sm="6" lg="3">
                  <Widget02 header="250" mainText="Cijevi" footerText="Vidi sve" icon="fa fa-cogs" color="primary" footer link="#/charts" />
              </Col>
              <Col xs="12" sm="6" lg="3">
                  <Widget02 header="30" mainText="Mjerna mjesta" footerText="Vidi sve" icon="fa fa-laptop" color="info" footer />
              </Col>
              <Col xs="12" sm="6" lg="3">
                  <Widget02 header="5" mainText="Kvarovi" footerText="Vidi sve" icon="fa fa-exclamation-triangle" color="danger" footer />
              </Col>
              <Col xs="12" sm="6" lg="3">
                  <Widget02 header="3" mainText="Radovi" footerText="Vidi sve" icon="fa fa-wrench" color="warning" footer />
              </Col>
          </Row>


          <Row>
            <Col md={12}>
              <Card>
                  <CardHeader>
                      Mapa
                  </CardHeader>
                  <CardBody>
                      <MainMapComponent isMarkerShown={false}
                                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"

                                        pipes={this.pipes}
                                        loadingElement={<div style={{ height: `100%` }} />}
                                        containerElement={<div style={{ height: `400px` }} />}
                                        mapElement={<div style={{ height: `100%` }} />}
                      >
                      </MainMapComponent>
                  </CardBody>
              </Card>
            </Col>
          </Row>

          {this.selectedPipe !== null &&
              <Row>
                <Col md={12}>

                    <Card>
                        <CardHeader>
                            {this.selectedPipe.props.name}
                        </CardHeader>
                        <CardBody>
                            Haiho
                        </CardBody>
                    </Card>
                </Col>
              </Row>}

      </div>
    );
  }
}

export default Dashboard;
