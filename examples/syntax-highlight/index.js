var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Example = function (_React$Component) {
  _inherits(Example, _React$Component);

  function Example() {
    _classCallCheck(this, Example);

    var _this = _possibleConstructorReturn(this, (Example.__proto__ || Object.getPrototypeOf(Example)).call(this));

    _this.state = {};
    return _this;
  }

  _createClass(Example, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        _this2.setState({ done: true });
      }, 2000);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        debut.SyntaxHighlight,
        { language: 'js' },
        React.createElement(
          'span',
          { style: { display: 'inline-block', transform: this.state.done ? 'translatey(-20px)' : 'none' } },
          '"use ',
          React.createElement(
            'span',
            { style: { display: 'inline-block', transform: 'translateY(20px)' } },
            'str'
          ),
          'ict"'
        ),
        '; \n',
        'function ' + (this.state.done ? 'peep' : 'deep') + '() { }'
      );
    }
  }]);

  return Example;
}(React.Component);

ReactDOM.render(React.createElement(Example, null), document.getElementById('root'));