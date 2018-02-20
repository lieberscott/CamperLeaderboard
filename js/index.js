var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Components
// App -> Board, Footer
// Board -> Title, Columnheadings, User

console.log("Fetch Polyfill should accommodate Safari errors");

var App = function App(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(Board, null),
    React.createElement(Footer, null)
  );
};

var Title = function Title(props) {
  return React.createElement(
    "tr",
    null,
    React.createElement(
      "th",
      { className: "leaderboard text-center", colSpan: "4" },
      React.createElement("i", { className: "fa fa-free-code-camp", "aria-hidden": "true" }),
      " freeCodeCamp Brownie Points Leaderboard"
    )
  );
};

var Board = function (_React$Component) {
  _inherits(Board, _React$Component);

  function Board(props) {
    _classCallCheck(this, Board);

    var _this = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, props));

    _this.state = {
      alltime: false,
      campers: []
    };
    _this.alltime = _this.alltime.bind(_this);
    _this.recent = _this.recent.bind(_this);
    return _this;
  }

  _createClass(Board, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var url = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
      this.getJSON(url);
    }
  }, {
    key: "alltime",
    value: function alltime() {
      if (!this.state.alltime) {
        this.setState({
          alltime: true
        });
        var url = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
        this.getJSON(url);
      }
    }
  }, {
    key: "recent",
    value: function recent() {
      if (this.state.alltime) {
        this.setState({
          alltime: false
        });
        var url = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
        this.getJSON(url);
      }
    }
  }, {
    key: "getJSON",
    value: function getJSON(url) {
      var _this2 = this;

      fetch(url).then(function (response) {
        return response.json();
      }).then(function (parsedJSON) {
        _this2.setState({
          campers: parsedJSON
        });
      }).catch(function (error) {
        return console.log("parsing failed,", error);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var url = "https://www.freecodecamp.org/";
      var objs = this.state.campers.map(function (obj, index) {
        return React.createElement(User, {
          alltime: obj.alltime // user alltime brownie points
          , img: obj.img // user avatar
          , index: index + 1 // user ranking
          , key: obj.username // unique key
          , name: obj.username // user name
          , recent: obj.recent // user past 30 days brownie points
          , url: url + obj.username // link to FCC profile
        });
      });
      return React.createElement(
        "table",
        { className: "table table-bordered table-hover" },
        React.createElement(
          "thead",
          null,
          React.createElement(Title, null),
          React.createElement(Columnheadings, {
            alltime: this.alltime // functions
            , recent: this.recent,
            boolean: this.state.alltime
          })
        ),
        React.createElement(
          "tbody",
          null,
          objs
        )
      );
    }
  }]);

  return Board;
}(React.Component);

var Columnheadings = function Columnheadings(props) {
  if (props.boolean) {
    // if alltime is true
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "th",
        null,
        "#"
      ),
      React.createElement(
        "th",
        null,
        "Camper"
      ),
      React.createElement(
        "th",
        null,
        React.createElement(
          "span",
          { onClick: props.recent },
          "Past 30 days"
        )
      ),
      React.createElement(
        "th",
        null,
        React.createElement(
          "span",
          { onClick: props.alltime },
          "All Time"
        ),
        " ",
        React.createElement("i", { className: "fa fa-caret-down", "aria-hidden": "true" })
      )
    );
  } else {
    // if alltime is false (Past 30 Days was clicked)
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "th",
        null,
        "#"
      ),
      React.createElement(
        "th",
        null,
        "Camper"
      ),
      React.createElement(
        "th",
        null,
        React.createElement(
          "span",
          { onClick: props.recent },
          "Past 30 days"
        ),
        " ",
        React.createElement("i", { className: "fa fa-caret-down", "aria-hidden": "true" })
      ),
      React.createElement(
        "th",
        null,
        React.createElement(
          "span",
          { onClick: props.alltime },
          "All Time"
        )
      )
    );
  }
};

var User = function User(props) {
  return React.createElement(
    "tr",
    { key: props.key },
    React.createElement(
      "td",
      { className: "index align-middle" },
      props.index
    ),
    React.createElement(
      "td",
      { className: "name align-middle" },
      React.createElement(
        "a",
        { href: props.url, target: "_blank" },
        React.createElement("img", { src: props.img }),
        " ",
        props.name
      )
    ),
    React.createElement(
      "td",
      { className: "recent align-middle" },
      props.recent
    ),
    React.createElement(
      "td",
      { className: "alltime align-middle" },
      props.alltime
    )
  );
};

var Footer = function Footer(props) {
  return React.createElement(
    "div",
    { className: "footer" },
    React.createElement(
      "i",
      null,
      React.createElement(
        "a",
        { href: "https://www.freecodecamp.org/lieberscott", target: "_blank" },
        "Scott Lieber"
      )
    )
  );
};

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));