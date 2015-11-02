/** In this file, we create a React component which incorporates components provided by material-ui */

const React = require('react');
const RaisedButton = require('material-ui/lib/raised-button');
const FloatingActionButton = require('material-ui/lib/floating-action-button');
const FlatButton = require('material-ui/lib/flat-button');
const IconButton = require('material-ui/lib/icon-button')
const FontIcon = require('material-ui/lib/font-icon');
const Dialog = require('material-ui/lib/dialog');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
const Colors = require('material-ui/lib/styles/colors');
const TextField = require('material-ui/lib/text-field');
const Card = require('material-ui/lib/card/card');
const CardHeader = require('material-ui/lib/card/card-header');
const CardMedia = require('material-ui/lib/card/card-media');
const CardTitle = require('material-ui/lib/card/card-title');
const CardActions = require('material-ui/lib/card/card-actions');
const CardText = require('material-ui/lib/card/card-text');
const Avatar = require('material-ui/lib/avatar');
const TimePicker = require('material-ui/lib/time-picker');
const Carousel = require('nuka-carousel');

const Decs = [{
  component: React.createClass({
      render() {
        let self = this;
        let indexes = this.getIndexes(self.props.slideCount, self.props.slidesToScroll);
        return (
          <ul style={self.getListStyles()}>
            {
              indexes.map(function(index) {
                return (
                  <li style={self.getListItemStyles()} key={index}>
                    <button
                      style={self.getButtonStyles(self.props.currentSlide === index)}
                      onClick={self.props.goToSlide.bind(null, index)}>
                      &bull;
                    </button>
                  </li>
                )
              })
            }
          </ul>
        )
      },
      getIndexes(count, inc) {
        let arr = [];
        for (let i = 0; i < count; i += inc) {
          arr.push(i);
        }
        return arr;
      },
      getListStyles() {
        return {
          position: 'relative',
          margin: 0,
          top: 30,
          padding: 0,
        }
      },
      getListItemStyles() {
        return {
          listStyleType: 'none',
          display: 'inline-block',
        }
      },
      getButtonStyles(active) {
        return {
          border: 0,
          background: 'transparent',
          color: 'black',
          cursor: 'pointer',
          padding: 10,
          outline: 0,
          fontSize: 24,
          opacity: active ? 1 : 0.5,
        }
      },
    }),
    position: 'BottomCenter',
  }];


const SimpleCarousel = React.createClass({
  mixins: [Carousel.ControllerMixin],
    getInitialState () {
    return {
      media: {
        image: <img src="http://s3.gomedia.us/wp-content/uploads/2013/01/wine-bottle-540x300.jpg"/>,
      },
    };
  },
  render() {
    if(this.state.carousels.carousel){
      if(this.state.carousels.carousel.state.currentSlide === 1){
        this._vid.play()
      }else{
        this._vid.pause()
      }
    } 

    return (
      <Carousel dragging={true} decorators={Decs} ref="carousel" data={this.setCarouselData.bind(this, 'carousel')}>
        {this.state.media.image}
        <video id="foundMe" ref={function(input) {
            if (input != null) {
              input.setAttribute('webkit-playsinline', '');
            }
            this._vid = input;
          }.bind(this)} width="100%" height="auto" loop
        src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4"
        preload
        >
        </video>
      </Carousel>
    )
  },
});

const CountdownTimer = React.createClass({
  getInitialState: function() {
    return {
      secondsRemaining: 0,
    };
  },
  tick: function() {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      clearInterval(this.interval);
    }
  },
  componentDidMount: function() {
    this.setState({ secondsRemaining: this.props.secondsRemaining });
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return (
      <div style={this.props.style}>Time Left: {this.state.secondsRemaining}</div>
    );
  },
});


const Main = React.createClass({

  mediaArray : {
      video: <video ref={function(input) {
          if (input != null) {
            input.setAttribute('webkit-playsinline', '');
          }
        }} width="200" height="200" 
      src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4"
      autoPlay
      >
      </video>,
      image: <img src="http://s3.gomedia.us/wp-content/uploads/2013/01/wine-bottle-540x300.jpg"/>,
    },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState () {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount(){
    
  },

  componentWillMount() {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.deepOrange500,
    });
    
    this.setState({
      muiTheme: newMuiTheme,
      favorite: 'favorite_border',
      playStop: 'play_arrow',
      activeMedia: this.mediaArray.image,
    });
  },

  render() {

    let containerStyle = {
       textAlign: 'center',
       color: '#212121',
    };

    let timerStyle = {
      position:'absolute',
      top:0,
      right: 0,
      overflow:'hidden',
      padding: 16,
    };

    let standardActions = [
      { text: 'Okay' },
    ];

    let buttonIconStyle = {
      position: 'absolute',
      top: 6,
      left: 0,
      marginRight: 10,
    };

    let customButton = {
      paddingLeft: 10,
    };

    let caroStyle = {
      type: 'button',
    };

    document.body.style.backgroundColor = "#F5F5F5";
    return (
      <div>
        <h1 style={containerStyle}>Wine Vulture</h1>
        <Card>
          <CardHeader
            title="Live Auction"
            subtitle="Romanee-Conti"
            avatar={<Avatar><img height="40" width="40" src="http://i.imgur.com/G5YJWUV.png"/></Avatar>}>
            <CountdownTimer style={timerStyle} secondsRemaining="70"/>  
          </CardHeader>
          <CardMedia >
          <div ref={function(input) {
              if (input != null) {
              input.setAttribute('webkit-overflow-scrolling', 'touch');
              }
            }}>
            <SimpleCarousel  
            style={caroStyle}/>  
          </div>
          </CardMedia>
          <CardTitle title="La Tâche 2007" subtitle="$25"/>
          <CardActions style={containerStyle}>
            <FlatButton label="Buy"/>
            <FlatButton label="Share"/>
          </CardActions>
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
        </Card>
      </div>
        
    );
  },
  playStop: function(){
    if(this.state.playStop === 'play_arrow'){
      this.setState({
        playStop: 'stop',
        activeMedia: this.mediaArray.video,
      })
    }else{
      this.setState({
        playStop: 'play_arrow',
        activeMedia: this.mediaArray.image,
      })
    }
  },

  onFocus: function(){
    if(this.state.favorite === 'favorite_border'){
      this.setState({favorite: 'favorite'});
    }else{
      this.setState({favorite: 'favorite_border'});
    }
    console.log('tried to fav');
  },

  _handleTouchTap(event) {
    console.log('hi');
  },

});

module.exports = Main;
