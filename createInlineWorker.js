// http://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string
var PseudoWorker = require('pseudo-worker');

var URL = window.URL || window.webkitURL;
module.exports = function(content, url) {
  try {
    try {
      var blob;
      try { // BlobBuilder = Deprecated, but widely implemented
        var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
        blob = new BlobBuilder();
        blob.append(content);
        blob = blob.getBlob();
      } catch(e) { // The proposed API
        blob = new Blob([content]);
      }
      return new PseudoWorker(URL.createObjectURL(blob));
    } catch(e) {
      return new PseudoWorker('data:application/javascript,' + encodeURIComponent(content));
    }
  } catch(e) {
    if (!url) {
      throw Error('Inline worker is not supported');
    }
    return new PseudoWorker(url);
  }
}
