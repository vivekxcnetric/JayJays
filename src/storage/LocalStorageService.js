const LocalStorageService = (function () {
  var _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  // function _setUserAuthAccessToken(token) {
  //   localStorage.setItem("userToken", token);
  // }
  // function _getUserAuthAccessToken() {
  //   return localStorage.getItem("userToken");
  // }

  function _setWcToken(token) {
    localStorage.setItem("wcToken", token);
  }
  function _getWcToken() {
    return localStorage.getItem("wcToken");
  }

  function _setWcTrustedToken(token) {
    localStorage.setItem("wcTrustedToken", token);
  }
  function _getWcTrustedToken() {
    return localStorage.getItem("wcTrustedToken");
  }

  function _clearToken() {
    // localStorage.removeItem("userToken");
    localStorage.removeItem("wcToken");
    localStorage.removeItem("wcTrustedToken");
  }

  return {
    getService: _getService,
    clearToken: _clearToken,
    // setUserAuthAccessToken: _setUserAuthAccessToken,
    // getUserAuthAccessToken: _getUserAuthAccessToken,
    setWcToken: _setWcToken,
    getWcToken: _getWcToken,
    setWcTrustedToken: _setWcTrustedToken,
    getWcTrustedToken: _getWcTrustedToken,
  };
})();
export default LocalStorageService;
