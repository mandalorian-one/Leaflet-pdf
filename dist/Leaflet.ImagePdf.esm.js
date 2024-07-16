import 'jspdf';
import { changeDpiBlob, changeDpiDataUrl } from 'changedpi';

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e  ) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: !0
          } : {
            done: !1,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = !0,
    u = !1;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = !0, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r );
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (String )(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

/**
 *      Leaflet.ImagePdf <https://github.com/mandalorian-one/Leaflet.ImagePdf>
 *
 *      MIT License http://www.opensource.org/licenses/mit-license.php
 *      Copyright (c) 2023  Alexander Cherviakov, <https://github.com/mandalorian-one/>
 *                          Northern Frontiers Pte Ltd, <https://northernfrontiers.com.fj/>
 *                          Herman Sletmoen, <https://github.com/hersle/leaflet-route-print>
 **/

/**
 * areaRectanglesCount counts rectangles need to cover the area
 * @param tlc {L.Point} top left corner
 * @param brc {L.Point} top right corner
 * @param w {number} rectangle width
 * @param h {number} rectangle height
 */
function areaRectanglesCount(tlc, brc, w, h) {
  return [Math.ceil((brc.x - tlc.x) / w), Math.ceil((brc.y - tlc.y) / h)];
}
/**
 * coverAreaWithRectangles returns array of rectangles that cover the area
 * @param tlc {L.Point} top left corner
 * @param brc {L.Point} bottom right corner
 * @param w {number}  width in points
 * @param h {number}  height in points
 */
function coverAreaWithRectangles(tlc, brc, w, h) {
  var rects = [];
  var _areaRectanglesCount = areaRectanglesCount(tlc, brc, w, h),
    _areaRectanglesCount2 = _slicedToArray(_areaRectanglesCount, 2),
    wPages = _areaRectanglesCount2[0],
    hPages = _areaRectanglesCount2[1];
  var startX = tlc.x;
  var startY = tlc.y;

  // cover area with rectangles
  for (var i = 0; i < hPages; i++) {
    for (var j = 0; j < wPages; j++) {
      var x = startX + j * w;
      var y = startY + i * h;
      rects.push(new Rectangle(L.point(x, y), L.point(x + w, y + h)));
    }
  }
  return rects;
}

// coverLineWithRectangle and coverLineWithRectangles functions originally was written by Herman Sletmoen <https://github.com/hersle/leaflet-route-print>

function coverLineWithRectangles(l, w, h, mix) {
  var rects = [];
  var intersections = [];
  var i1 = 0;
  while (true) {
    var _coverLineWithRectang = coverLineWithRectangle(l, w, h, i1),
      _coverLineWithRectang2 = _slicedToArray(_coverLineWithRectang, 4),
      rect = _coverLineWithRectang2[0],
      i2 = _coverLineWithRectang2[1],
      intersection = _coverLineWithRectang2[2],
      dist = _coverLineWithRectang2[3];
    if (mix) {
      var _coverLineWithRectang3 = coverLineWithRectangle(l, h, w, i1),
        _coverLineWithRectang4 = _slicedToArray(_coverLineWithRectang3, 4),
        recthw = _coverLineWithRectang4[0],
        i2hw = _coverLineWithRectang4[1],
        intersectionhw = _coverLineWithRectang4[2],
        disthw = _coverLineWithRectang4[3];
      rect.rotated = false;
      if (disthw > dist) {
        rect = recthw;
        i2 = i2hw;
        intersection = intersectionhw;
        dist = disthw;
        rect.rotated = true;
      }
    }
    rects.push(rect);
    if (intersection === undefined) {
      break;
    }
    intersections.push(intersection);
    l.splice(i2, 0, intersection); // divide the segment TODO: don't modify input array
    i1 = i2;
  }
  return [rects, intersections];
}
function coverLineWithRectangle(l, w, h, i1) {
  var rect = new Rectangle(l[i1], l[i1]);
  var segment;
  var intersection = undefined;
  var dist = 0;
  var i = 0;
  for (i = i1 + 1; i < l.length && intersection === undefined; i++) {
    var grect = rect.extend(l[i]);
    segment = new Segment(l[i - 1], l[i]);
    if (grect.isSmallerThan(w, h)) {
      // whole segment fits in rectangle [w,h]
      rect = grect;
    } else {
      // segment must be divided to fit in rectangle [w,h]
      // create rectangle as big as possible in the direction of the segment
      var _rect$extendBounded = rect.extendBounded(segment, w, h);
      var _rect$extendBounded2 = _slicedToArray(_rect$extendBounded, 2);
      rect = _rect$extendBounded2[0];
      intersection = _rect$extendBounded2[1];
      segment = new Segment(l[i - 1], intersection);
    }
    dist += segment.length();
  }
  rect = new Rectangle(L.point(0, 0), L.point(w, h)).center(rect.middle);
  return [rect, i, intersection, dist];
}
var Rectangle = /*#__PURE__*/function () {
  function Rectangle(min, max) {
    _classCallCheck(this, Rectangle);
    this.min = min;
    this.max = max;
  }
  return _createClass(Rectangle, [{
    key: "xmin",
    get: function get() {
      return this.min.x;
    }
  }, {
    key: "ymin",
    get: function get() {
      return this.min.y;
    }
  }, {
    key: "xmax",
    get: function get() {
      return this.max.x;
    }
  }, {
    key: "ymax",
    get: function get() {
      return this.max.y;
    }
  }, {
    key: "corner1",
    get: function get() {
      return L.point(this.xmin, this.ymin);
    }
  }, {
    key: "corner2",
    get: function get() {
      return L.point(this.xmax, this.ymin);
    }
  }, {
    key: "corner3",
    get: function get() {
      return L.point(this.xmax, this.ymax);
    }
  }, {
    key: "corner4",
    get: function get() {
      return L.point(this.xmin, this.ymax);
    }
  }, {
    key: "topleft",
    get: function get() {
      return this.corner1;
    }
  }, {
    key: "bottomright",
    get: function get() {
      return this.corner3;
    }
  }, {
    key: "middle",
    get: function get() {
      return this.min.add(this.max).divideBy(2);
    }
  }, {
    key: "size",
    get: function get() {
      return this.max.subtract(this.min);
    }
  }, {
    key: "width",
    get: function get() {
      return this.size.x;
    }
  }, {
    key: "height",
    get: function get() {
      return this.size.y;
    }
  }, {
    key: "center",
    value: function center(c) {
      var d = c.subtract(this.middle);
      return new Rectangle(this.min.add(d), this.max.add(d));
    }
  }, {
    key: "extend",
    value: function extend(p) {
      var min = L.point(Math.min(this.xmin, p.x), Math.min(this.ymin, p.y));
      var max = L.point(Math.max(this.xmax, p.x), Math.max(this.ymax, p.y));
      return new Rectangle(min, max);
    }
  }, {
    key: "extendToSquare",
    value: function extendToSquare() {
      var d = Math.abs(this.size.x - this.size.y);
      var offset = d / 2;
      var min = L.point(this.xmin, this.ymin);
      var max = L.point(this.xmax, this.ymax);
      if (this.size.x > this.size.y) {
        min.y -= offset;
        max.y += offset;
      } else {
        min.x -= offset;
        max.x += offset;
      }
      return new Rectangle(min, max);
    }
  }, {
    key: "extendBounded",
    value: function extendBounded(s, w, h) {
      var d = s.displacement;
      var maxRect;
      if (d.x >= 0 && d.y >= 0) {
        // north-east quadrant
        maxRect = new Rectangle(L.point(this.xmin, this.ymin), L.point(this.xmin + w, this.ymin + h));
      } else if (d.x < 0 && d.y >= 0) {
        // north-west quadrant
        maxRect = new Rectangle(L.point(this.xmax - w, this.ymin), L.point(this.xmax, this.ymin + h));
      } else if (d.x < 0 && d.y < 0) {
        // south-west quadrant
        maxRect = new Rectangle(L.point(this.xmax - w, this.ymax - h), L.point(this.xmax, this.ymax));
      } else if (d.x > 0 && d.y < 0) {
        // south-east quadrant
        maxRect = new Rectangle(L.point(this.xmin, this.ymax - h), L.point(this.xmin + w, this.ymax));
      }
      var intersection = maxRect.intersection(s);
      console.assert(intersection !== undefined, "segment-rectangle intersection test failed");
      return [this.extend(maxRect.intersection(s)), intersection];
    }
  }, {
    key: "pad",
    value: function pad(p) {
      return new Rectangle(this.min.subtract(L.point(p, p)), this.max.add(L.point(p, p)));
    }
  }, {
    key: "scale",
    value: function scale(_scale) {
      return new Rectangle(this.min.multiplyBy(_scale), this.max.multiplyBy(_scale));
    }
  }, {
    key: "isSmallerThan",
    value: function isSmallerThan(w, h) {
      return this.size.x <= w && this.size.y <= h;
    }
  }, {
    key: "intersection",
    value: function intersection(s) {
      var s1 = new Segment(this.corner1, this.corner2);
      var s2 = new Segment(this.corner2, this.corner3);
      var s3 = new Segment(this.corner3, this.corner4);
      var s4 = new Segment(this.corner4, this.corner1);
      var ss = [s1, s2, s3, s4];
      for (var _i = 0, _ss = ss; _i < _ss.length; _i++) {
        var side = _ss[_i];
        var p = s.intersection(side);
        // don't register intersection if it is in the beginning corner (TODO: why not?)
        if (p !== undefined && !(p.x == s1.p1.x && p.y == s1.p1.y)) {
          return p; // intersect with a side
        }
      }
      return undefined; // no intersection
    }
  }]);
}();
var Segment = /*#__PURE__*/function () {
  function Segment(p1, p2) {
    _classCallCheck(this, Segment);
    this.p1 = p1;
    this.p2 = p2;
  }
  return _createClass(Segment, [{
    key: "displacement",
    get: function get() {
      return this.p2.subtract(this.p1);
    }
  }, {
    key: "intersection",
    value: function intersection(s2) {
      // see https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line_segment
      var s1 = this;
      var x1 = s1.p1.x,
        y1 = s1.p1.y,
        x2 = s1.p2.x,
        y2 = s1.p2.y; // segment 1
      var x3 = s2.p1.x,
        y3 = s2.p1.y,
        x4 = s2.p2.x,
        y4 = s2.p2.y; // segment 2
      var d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      var t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d;
      var u = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / d;
      if (d !== 0 && t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        var x = x1 + t * (x2 - x1);
        var y = y1 + t * (y2 - y1);
        return L.point(x, y);
      } else {
        return undefined;
      }
    }
  }, {
    key: "length",
    value: function length() {
      var dx = this.p2.x - this.p1.x;
      var dy = this.p2.y - this.p1.y;
      return Math.pow(Math.pow(dx, 2) + Math.pow(dy, 2), 0.5);
    }
  }]);
}();

/**
 *      Leaflet.ImagePdf <https://github.com/mandalorian-one/Leaflet.ImagePdf>
 *
 *      MIT License http://www.opensource.org/licenses/mit-license.php
 *      Copyright (c) 2023  Alexander Cherviakov, <https://github.com/mandalorian-one/>
 *                          Northern Frontiers Pte Ltd, <https://northernfrontiers.com.fj/>
 *
 **/

/**
 * resizeImage resizes an image to a new size and returns promise with result of canvas.toDataURL
 * @param imageBlob
 * @param newWidth
 * @param newHeight
 * @param targetMimeType
 * @returns {Promise<unknown>}
 */
function resizeImage(imageBlob, newWidth, newHeight, targetMimeType) {
  return new Promise(function (resolve, reject) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = newWidth;
    canvas.height = newHeight;
    createImageBitmap(imageBlob, {
      resizeWidth: newWidth,
      resizeHeight: newHeight,
      resizeQuality: "high"
    }).then(function (imageBitmap) {
      ctx.drawImage(imageBitmap, 0, 0);
      resolve(canvas.toDataURL(targetMimeType, 0.9));
    })["catch"](function (er) {
      reject(er);
    });
  });
}

var PageOrientationPortrait = 0;
var PageOrientationLandscape = 1;
var PageOrientationAuto = 2;
var StatusReady = 0;
var StatusAtWork = 1;
var StatusAborted = 2;
var AlgCoverUnknown = 0;
var AlgCoverArea = 1;
var AlgCoverPath = 2;
var OpGenerateImage = "image";
var OpCreatePage = "page";
var OpLoadTiles = "tile";
var progressSplashScreenDefaultStyle = {
  width: "100vw",
  height: "100vh",
  background: "white",
  "z-index": 950,
  position: "fixed",
  top: "0px",
  left: "0px",
  "justify-content": "center",
  "align-items": "center"
};
L.Control.ImagePdf = L.Control.extend({
  options: {
    pageFormat: "A4",
    pageOrientation: PageOrientationPortrait,
    pageMargin: 10,
    // pdf option, page margin in mm
    areaPadding: 10,
    // pdf option, add padding to the area in mm
    pagingMethod: 'pages',
    // pdf option, define paging method for multi-page pdf generation
    // (possible values 'pages' | 'scale'), it's better to use 'pages' because 'scale' method now is not properly tested
    scale: 50000,
    // pdf option, default starting scale for 'scale' paging method
    pageCount: 1,
    // pdf option, default pages count for 'pages' paging method
    dpi: 300,
    // pdf option, define max target images dpi, it defines how deep the map will be zoomed to create images
    // the resulting image dpi depends on available tiles images resolution and page size in mm
    // the better available dpi will be used
    // higher dpi value leads to downloading more tiles and greatly increase images generation time
    maxZoom: null,
    // define map maximum zoom level we can fall to load image tiles
    // if null it will be evaluated from map.getMaxZoom()
    // can be number, or function, that should return the number
    outputFileName: "map.pdf",
    // can be with or without file extension
    downloadOnFinish: false,
    // starts browser's file download process in order to save pdf file
    tilesLoadingTimeout: 10000,
    // msec, timeout for tile loading on every page(image) generation
    imageFormat: "jpeg",
    // pdf and image option, 'jpeg' or 'png'
    imagePixelRatio: 1,
    // for generate images for retina screens. set to 2 or window.devicePixelRatio
    showProgressSplashScreen: true,
    progressSplashScreenStyle: progressSplashScreenDefaultStyle,
    rectanglePreviewStyle: {
      // defines the style of area preview rectangle
      stroke: true,
      weight: 1,
      opacity: 1,
      color: "gray",
      fillColor: "gray",
      fillOpacity: 0.2
    },
    pdfFontSize: 15,
    // default font size of text labels in pdf document
    pdfPrintGraticule: true,
    // isn;t implemented yet
    pdfPrintScaleMeter: true,
    // isn;t implemented yet
    pdfSheetPageNumber: {
      // add page number to a sheet at defined position
      position: "bottomright"
    },
    pdfSheetAttribution: {
      // add attribution text to a sheet at defined position
      position: "topleft",
      text: "Created with Leaflet.ImagePdf"
    },
    pdfDocumentProperties: {
      // properties to add to the PDF document // name-to-value object structure
      'creator': "Leaflet.ImagePdf"
    },
    excludeNodesWithCSS: ['div.leaflet-control-container', 'div.leaflet-control', 'div.pdf-progress-plug'],
    // exclude these dom nodes from the result images
    pdfPageCb: null,
    // callback function(pdf, pageNumber) that calls on every pdf page generation
    // you can use it to add you custom text or data to pdf pages (see jspdf spec on how to operate with pdf document)
    nodeFilterCb: null,
    // callback function(domNode) that calls on every dom element and should return true or false
    // in order to include or exclude element from images and pdf
    debug: false
  },
  initialize: function initialize(map, options) {
    if (options) {
      L.setOptions(this, options);
    }
    this.options.progressSplashScreenStyle = Object.assign({}, progressSplashScreenDefaultStyle, this.options.progressSplashScreenStyle);
    this.pixelRatio = this.options.imagePixelRatio || 1; // experimental, for HIDPI devices with retina screens and display scaling,
    // we need to generate images with correct DPI value written to the image
    this.baseImageDpi = 72;
    this.map = map;
    this.area = null; //region to print, can contain any Leaflet object that has getBounds method

    this.pageFormats = this.pageSizes();
    this.pageOrientations = [{
      name: "Portrait",
      value: PageOrientationPortrait
    }, {
      name: "Landscape",
      value: PageOrientationLandscape
    }, {
      name: "Auto",
      value: PageOrientationAuto
    }];
    this.pageSize = {
      width: 0,
      height: 0
    };
    this.status = StatusReady;
    this.savedMapState = null;
    this.pagesToPrint = [];

    // keep all page rectangles in one group
    this.rectGroup = L.layerGroup();
    if (this.options.debug) {
      this.debugRectGroup = L.layerGroup();
      this.debugRectGroup.addTo(map);
      this.debugRectStyle = {
        stroke: true,
        weight: 1,
        opacity: 0.8,
        color: "green",
        fillColor: "green",
        fillOpacity: 0.2
      };
    }

    //pdfDownloadOnFinish
    this.downloadLink = document.createElement("a");
    Object.assign(this.downloadLink.style, {
      "display": "none"
    });

    // css used on images generation stage
    this.css = document.createElement("style");
    this.css.disabled = true;
    //this.css = new CSSStyleSheet() //isn't supported in safary yet
    document.head.appendChild(this.css);
    // prevent image opacity fade effect on tile load
    this.css.sheet.insertRule('.leaflet-tile-container > img {opacity: 1 !important;}', 0);
    this.progressDiv = document.createElement("div");
    Object.assign(this.progressDiv, {
      className: 'pdf-progress-plug'
    });
    Object.assign(this.progressDiv.style, this.options.progressSplashScreenStyle, {
      display: "none"
    });
    this.map._container.append(this.progressDiv);
    this.setScale(this.options.scale);
    this.setImageFormat(this.options.imageFormat);
    this.setRectPreviewStyle(this.options.rectanglePreviewStyle);
    this.setPageFormat(this.options.pageFormat);
    this.setPageOrientation(this.options.pageOrientation);
    this.setPageMargin(this.options.pageMargin);
    this.setPagesToPrint([]);
    this.setPageCount(this.options.pageCount);
  },
  destroy: function destroy() {
    this.hideImageRegions();
    this.map.removeLayer(this.rectGroup);
    this.map._container.remove(this.progressDiv);
  },
  pageSizes: function pageSizes() {
    // list paper sizes from https://en.wikipedia.org/wiki/Paper_size#Overview_of_ISO_paper_sizes
    var paperSizes = [];
    var w = 0;
    var h = 0;
    for (var n = 0; n <= 6; n++) {
      w = Math.floor(841 / Math.pow(2, n / 2));
      h = Math.floor(1189 / Math.pow(2, n / 2));
      paperSizes.push({
        name: "A".concat(n),
        width: w,
        height: h
      });
    }
    for (var _n = 0; _n <= 6; _n++) {
      w = Math.floor(1000 / Math.pow(2, _n / 2));
      h = Math.floor(1414 / Math.pow(2, _n / 2));
      paperSizes.push({
        name: "B".concat(_n),
        width: w,
        height: h
      });
    }
    return paperSizes;
  },
  /**
   * Returns current page size based on page orientation
   * @returns {{width: number, height: number}}
   * @private
   */
  _orientedPageSize: function _orientedPageSize() {
    var w = this.pageSize.width;
    var h = this.pageSize.height;
    if (this.pageOrientation === PageOrientationLandscape) {
      // swap width <-> height
      var wtmp = w;
      w = h;
      h = wtmp;
    }
    return {
      width: w,
      height: h
    };
  },
  /**
   *
   * @returns {object}
   * @private
   */
  _pageData: function _pageData(scale, wmmPaper, hmmPaper) {
    var pd = {
      sPaper: 1,
      sWorld: scale != null ? scale : this.scale,
      wmmPaper: wmmPaper,
      hmmPaper: hmmPaper,
      pmmPaper: this.pageMargin,
      pmmArea: this.options.areaPadding,
      regionCenter: this.area.getCenter(),
      //center of area
      dimensionsAtCurrentZoom: {},
      dimensions: {},
      targetZoom: 0
    };
    var paperToWorld = pd.sPaper / pd.sWorld;
    var worldToPaper = 1 / paperToWorld;
    var wmmWorld = pd.wmmPaper * worldToPaper;
    var hmmWorld = pd.hmmPaper * worldToPaper;
    var pmmWorld = pd.pmmPaper * worldToPaper;
    var pmmAreaWorld = pd.pmmArea * worldToPaper;

    // page dimension in points at current map zoom level
    var cd = {
      wpx: this.metersToPixels(wmmWorld / 1000, pd.regionCenter),
      hpx: this.metersToPixels(hmmWorld / 1000, pd.regionCenter),
      // page margin
      ppx: this.metersToPixels(pmmWorld / 1000, pd.regionCenter),
      // area padding in points at current map zoom level
      appx: this.metersToPixels(pmmAreaWorld / 1000, pd.regionCenter),
      dpi: Math.round(this.scaleToDPI(pd.sWorld))
    };
    pd.dimensionsAtCurrentZoom = cd;
    pd.targetScale = this.options.dpi / cd.dpi;
    Object.assign(pd, this._calcTargetZoomAndScale(pd.targetScale, parseInt));
    pd.dpi = pd.dimensionsAtCurrentZoom.dpi / pd.scaleToTargetZoom;
    pd.dimensions = {
      wpx: Math.floor(cd.wpx / pd.scaleToTargetZoom),
      hpx: Math.floor(cd.hpx / pd.scaleToTargetZoom),
      // page margin
      ppx: Math.floor(cd.ppx / pd.scaleToTargetZoom),
      // area padding in points at current map zoom level
      appx: Math.floor(cd.appx / pd.scaleToTargetZoom),
      dpi: pd.dpi
    };
    return pd;
  },
  computeScaleAccordingPageCount: function computeScaleAccordingPageCount() {
    var pageCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    pageCount *= 1;
    var pageSize = this._orientedPageSize();
    var bounds = this.area instanceof L.LatLngBounds ? this.area : this.area.getBounds();
    var topLeft = this.map.project(bounds.getNorthWest());
    var bottomRight = this.map.project(bounds.getSouthEast());
    var areaW = bottomRight.x - topLeft.x; // area width in points
    var areaH = bottomRight.y - topLeft.y;
    var pd = this._pageData(this.scale, pageSize.width, pageSize.height); // only several
    // computes scale we need to use in order the area fits into one page
    var onePagesScaleW = Math.ceil(pd.sPaper * this.pixelsToMeters(areaW, pd.regionCenter) * 1000 / (pd.wmmPaper - pd.pmmPaper * 2 - pd.pmmArea * 2));
    var onePagesScaleH = Math.ceil(pd.sPaper * this.pixelsToMeters(areaH, pd.regionCenter) * 1000 / (pd.hmmPaper - pd.pmmPaper * 2 - pd.pmmArea * 2));
    var onePagesScale = Math.max(onePagesScaleW, onePagesScaleH);
    if (this.options.debug) {
      // draw bounds area
      var rect = [this.map.unproject(topLeft), this.map.unproject(bottomRight)];
      L.rectangle(rect, this.debugRectStyle).addTo(this.debugRectGroup);
    }
    var algorithm = this._rectanglesEvaluationMethod(this.area);
    var computePageCount = function computePageCount(scale) {
      return 0;
    };

    // for route with one page covering returns the scale for route bounds
    if (pageCount === 1 && algorithm === AlgCoverPath) return onePagesScale;
    if (algorithm === AlgCoverArea) {
      computePageCount = function (scale) {
        var pd = this._pageData(scale, pageSize.width, pageSize.height).dimensionsAtCurrentZoom;
        var _areaRectanglesCount = areaRectanglesCount(topLeft.subtract([pd.appx, pd.appx]), bottomRight.add([pd.appx, pd.appx]), pd.wpx - 2 * pd.ppx, pd.hpx - 2 * pd.ppx),
          _areaRectanglesCount2 = _slicedToArray(_areaRectanglesCount, 2),
          rows = _areaRectanglesCount2[0],
          cols = _areaRectanglesCount2[1];
        return rows * cols;
      }.bind(this);
    } else if (algorithm === AlgCoverPath) {
      computePageCount = function (scale) {
        var pd = this._pageData(scale, pageSize.width, pageSize.height).dimensionsAtCurrentZoom;
        var rects = this._getRouteRectangles(this.area, pd.wpx, pd.hpx, pd.ppx, pd.appx, this.pageOrientation);
        return rects.length;
      }.bind(this);
    }

    // sorts through the pages placements variants at different scale to get the better
    // initially it was developed for paging along the route
    // for rectangles it can be replaced with simple algorithm
    var iterations = 0;
    var scale = onePagesScale;
    var step = -scale / 2;
    var bestScale = 0;
    while (step > 10 || step < -10) {
      var switchDirection = false;
      iterations++;
      var c = computePageCount(scale);
      if (c > pageCount) {
        switchDirection = step < 0;
      } else if (c < pageCount) {
        switchDirection = step > 0;
      } else {
        bestScale = scale;
        step = Math.abs(step) * -1;
      }
      // need to switch direction and decrease the step
      if (switchDirection) step = -step / 2;
      if (scale + step < 1) {
        step = step / 2;
      }
      scale = scale + step;
      if (iterations > 1000 || c === 0) {
        console.error("something got wrong, to much iterations");
        break;
      }
    }
    if (bestScale > 0) scale = bestScale;
    if (this.options.debug) {
      console.log("computeScale iterations: ".concat(iterations));
    }
    return Math.ceil(scale);
  },
  _rectanglesEvaluationMethod: function _rectanglesEvaluationMethod(LObject) {
    if (LObject instanceof L.LatLngBounds || LObject instanceof L.Polygon || LObject instanceof L.Polyline && this.isPagesPaging() && this.pageCount == 1) {
      return AlgCoverArea;
    } else if (LObject instanceof L.Polyline) {
      return AlgCoverPath;
    }
    console.log("unknown geometry type");
    return AlgCoverUnknown;
  },
  /**
   * calcPdfPages computes pages data according current map state and pages/pdf settings
   * @returns {object} pages data that is used to page generation
   */
  calcPdfPages: function calcPdfPages() {
    if (!this.area) return null;
    if (this.area instanceof L.Polyline && !this.area._map) {
      // object is not added to the map (or removed)
      return null;
    }
    if (this.options.debug) {
      this.debugRectGroup.clearLayers();
    }
    var scale = this.scale;
    if (this.isPagesPaging()) {
      scale = this.computeScaleAccordingPageCount(this.pageCount);
    }
    var pageSize = this._orientedPageSize();
    var pd = this._pageData(scale, pageSize.width, pageSize.height);
    pd.rectsAtCurrentZoom = [];
    pd.rects = [];
    pd.images = [];
    var algorithm = this._rectanglesEvaluationMethod(this.area);
    var getRectangles = algorithm === AlgCoverArea ? this._getBoxRectangles.bind(this) : algorithm === AlgCoverPath ? this._getRouteRectangles.bind(this) : function () {
      return [];
    };
    var dims = pd.dimensionsAtCurrentZoom;
    pd.rectsAtCurrentZoom = getRectangles(this.area, dims.wpx, dims.hpx, dims.ppx, dims.appx, this.pageOrientation);

    // pad rectangles with margin and scale to printing zoom
    for (var i = 0; i < pd.rectsAtCurrentZoom.length; i++) {
      var rotated = pd.rectsAtCurrentZoom[i].rotated; // property is destroyed after padding
      pd.rectsAtCurrentZoom[i] = pd.rectsAtCurrentZoom[i].pad(dims.ppx);
      var scaledRect = pd.rectsAtCurrentZoom[i].scale(1 / pd.scaleToTargetZoom);
      pd.rectsAtCurrentZoom[i].rotated = rotated; // todo check, may be obsolete
      scaledRect.rotated = rotated;
      pd.rects.push(scaledRect);
    }
    pd.pageCount = pd.rects.length;
    pd.pagesToPrint = [];

    // prepare list of page numbers to print if pagesToPrintDefined
    if (this.pagesToPrintDefined.length > 0) {
      for (var p = 0; p < pd.rects.length; p++) {
        if (this.pagesToPrintDefined.includes(p)) pd.pagesToPrint.push(p);
      }
    } else {
      for (var _p = 0; _p < pd.rects.length; _p++) {
        pd.pagesToPrint.push(_p);
      }
    }
    pd.pagesToPrintCount = pd.pagesToPrint.length;
    return pd;
  },
  /**
   * calc rectangles for image generation
   * now supports only one rectangle
   * @param targetSizePx
   * @param paddingPx
   * @param extendToSquare
   * @returns {{dimensionsAtCurrentZoom: {hpx: number, aapx: number, wpx: number}, targetScale: number, targetZoom: number, rects: *[], rectsAtCurrentZoom: []}}
   */
  calcImages: function calcImages(targetSizePx, paddingPx, extendToSquare) {
    if (!this.area) return null;
    if (this.area instanceof L.Polyline && !this.area._map) {
      // if object is not added to the map (or removed)
      return null;
    }
    var bounds = this.area instanceof L.LatLngBounds ? this.area : this.area.getBounds();

    //todo create Rectangle object and perform some calculations using his methods
    var areaRect = new Rectangle(this.map.project(bounds.getNorthWest()), this.map.project(bounds.getSouthEast()));

    // scale from current zoom to target resolution
    var targetScale = targetSizePx / Math.max(areaRect.width, areaRect.height);
    var scaledPadding = paddingPx / targetScale;

    // extend area with padding
    areaRect = areaRect.pad(scaledPadding);
    if (extendToSquare) areaRect = areaRect.extendToSquare();
    var rects = coverAreaWithRectangles(areaRect.topleft, areaRect.bottomright, areaRect.width, areaRect.height);
    if (rects.length !== 1) {
      // only one rect is now supported
      console.error("pdf:image:something got wrong with rectangle evaluation");
    }
    var cd = {
      wpx: areaRect.width,
      hpx: areaRect.height,
      aapx: paddingPx / targetScale // not impl
    };
    targetScale = targetSizePx / Math.max(cd.wpx, cd.hpx);
    var imagesData = {
      dimensionsAtCurrentZoom: cd,
      targetScale: targetScale,
      targetZoom: 0,
      rectsAtCurrentZoom: rects,
      rects: []
    };
    Object.assign(imagesData, this._calcTargetZoomAndScale(targetScale));

    // rescale rects to target zoom
    for (var i = 0; i < imagesData.rectsAtCurrentZoom.length; i++) {
      imagesData.rects[i] = imagesData.rectsAtCurrentZoom[i].scale(1 / imagesData.scaleToTargetZoom);
    }
    imagesData.dimensions = {
      wpx: Math.floor(cd.wpx / imagesData.scaleToTargetZoom),
      hpx: Math.floor(cd.hpx / imagesData.scaleToTargetZoom),
      // page margin
      //ppx: Math.floor(cd.ppx / imagesData.scaleToTargetZoom),
      // area padding in points at current map zoom level
      appx: Math.floor(cd.appx / imagesData.scaleToTargetZoom)
    };

    // todo most of this calc also are used in pdf rectangles calculations
    //      improvement: create 'RectField' class, where to move most of rectangles calculations
    return imagesData;
  },
  /**
   * // _calcTargetZoomAndScale calculates target map zoom level and scale factor from current zoom to target zoom in order to get image at targetScale
   * @param targetScale
   * @param round
   * @private
   */
  _calcTargetZoomAndScale: function _calcTargetZoomAndScale(targetScale) {
    var round = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Math.ceil;
    // with multiply tile layers map.getMaxZoom() returns maximum zoom from all layers
    // but if the layer with maximum zoom level is filtered from output we will get
    // an incorrect image at this target zoom, so we need to define maxMapZoom manually
    var maxZoom = this.maxZoom ? typeof this.maxZoom === "function" ? this.maxZoom() : this.maxZoom : this.map.getMaxZoom();
    var targetZoom = Math.min(maxZoom, round(this.map.getScaleZoom(targetScale, this.map.getZoom())));
    var scaleToTargetZoom = this.map.getZoomScale(this.map.getZoom(), targetZoom);
    return {
      targetZoom: targetZoom,
      scaleToTargetZoom: scaleToTargetZoom
    };
  },
  /**
   * showPdfPages shows pages preview rectangles on the map
   * @returns {{hmmPaper, regionCenter: *, sWorld: (*|number), sPaper: number, pmmPaper: number, wmmPaper}}
   */
  showPdfPages: function showPdfPages(printData) {
    if (this.area === null || this.status !== StatusReady) {
      console.error("pdf: pdf creating is already in progress");
      return null;
    }
    if (!printData) printData = this.calcPdfPages();
    if (printData) {
      this._showRectangles(printData.rectsAtCurrentZoom, printData.dimensionsAtCurrentZoom.ppx);
    } else {
      this.hideImageRegions();
    }
    return printData;
  },
  /**
   * showImageRegions shows preview of image area rectangle on the map
   * @param imageData
   * @returns {null|*}
   */
  showImageRegions: function showImageRegions(imageData) {
    if (this.area === null || this.status !== StatusReady) {
      console.error("pdf: is already in progress");
      return null;
    }
    if (!imageData) {
      this.hideImageRegions();
      return;
    }
    this._showRectangles(imageData.rectsAtCurrentZoom, imageData.dimensionsAtCurrentZoom.aapx);
    return imageData;
  },
  /**
   * hides pages preview rectangles on the map
   */
  hideImageRegions: function hideImageRegions() {
    this.rectGroup.clearLayers();
  },
  /**
   * _lockMap locks the map and change map state for images generation
   * @private
   */
  _lockMap: function _lockMap() {
    this.savedMapState = {
      width: this.map.getContainer().style.width,
      height: this.map.getContainer().style.height,
      center: this.map.getCenter(),
      zoom: this.map.getZoom(),
      imageRectangles: !!this.rectGroup._map,
      containerOverflow: this.map._container.parentElement.style.overflow
    };
    // todo add rectGroup css selector to node filter, and we can avoid removing the layer
    this.map.removeLayer(this.rectGroup);
    if (this.options.debug) {
      this.debugRectGroup.clearLayers();
    }
    if (this.options.showProgressSplashScreen) {
      Object.assign(this.progressDiv.style, {
        display: "flex",
        height: window.visualViewport.height + '.px',
        width: window.visualViewport.width + '.px',
        position: "fixed",
        top: 0,
        left: 0
      });
      this.map._container.parentElement.style.overflow = "hidden"; // hide scrollbars
    }
    this._disableInput();
    this.css.disabled = false;
  },
  /**
   * _restoreMap restores the map after image generation
   * @private
   */
  _restoreMap: function _restoreMap() {
    this.map.getContainer().style.width = this.savedMapState.width;
    this.map.getContainer().style.height = this.savedMapState.height;
    this.map.setView(this.savedMapState.center, this.savedMapState.zoom, {
      animate: false
    });
    if (this.savedMapState.imageRectangles) {
      this.map.addLayer(this.rectGroup);
    }
    this.map._container.parentElement.style.overflow = this.savedMapState.containerOverflow;
    this.map.invalidateSize();
    this.progressDiv.style.display = "none";
    //this.map.addLayer(this.rectGroup);
    this._enableInput();
    this.css.disabled = true;
    this.status = StatusReady;
  },
  /**
   * disables map controls and input
   * @private
   */
  _disableInput: function _disableInput() {
    //console.log("input disabled");
    this.map.boxZoom.disable();
    this.map.doubleClickZoom.disable();
    this.map.dragging.disable();
    this.map.keyboard.disable();
    this.map.scrollWheelZoom.disable();
    if (this.map.tapHold) this.map.tapHold.disable(); // specific to mobile Safari
    this.map.touchZoom.disable();
  },
  /**
   * restores map controls and input
   * @private
   */
  _enableInput: function _enableInput() {
    //console.log("input enabled");
    this.map.boxZoom.enable();
    this.map.doubleClickZoom.enable();
    this.map.dragging.enable();
    this.map.keyboard.enable();
    this.map.scrollWheelZoom.enable();
    if (this.map.tapHold) this.map.tapHold.enable(); // specific to mobile Safari
    this.map.touchZoom.enable();
  },
  /**
   * createPdf starts a background pdf creation process, the map will be locked.
   * subscribe to events in order to control the progress and catch the results
   * @returns {boolean} false if there are already running printing or something got wrong with
   */
  createPdf: function createPdf() {
    if (this.status !== StatusReady) {
      return false;
    }
    var pagesData = this.calcPdfPages();
    if (!pagesData) return false;
    this.status = StatusAtWork;
    this.fireStarted(pagesData);
    this._lockMap();
    document.addEventListener("pdf:imagesCompleted", this._createPdf.bind(this, pagesData), {
      once: true
    });
    this._createImages(pagesData.rects, pagesData.pagesToPrint, pagesData.targetZoom, this.imageFormat);
  },
  /**
   * createImage starts a background image creation process, the map will be locked.
   * subscribe to events in order to control the progress and catch the results
   * @param targetSizePx
   * @param paddingPx
   * @param extendToSquare
   * @param performScaleToTargetSize
   * @returns {boolean}
   */
  createImage: function createImage(targetSizePx, paddingPx, extendToSquare) {
    var performScaleToTargetSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    if (this.status !== StatusReady) {
      return false;
    }
    var finish = function (blob) {
      this._restoreMap();
      this.fireFinish(blob);
    }.bind(this);
    var imagesData = this.calcImages(targetSizePx, paddingPx, extendToSquare);
    if (!imagesData) return false;
    var rect = imagesData.rects[0];
    var resultWidth = targetSizePx;
    var resultHeight = targetSizePx;
    if (!extendToSquare) {
      if (rect.width >= rect.height) {
        resultHeight = Math.round(rect.height / (rect.width / targetSizePx));
      } else {
        resultWidth = Math.round(rect.width / (rect.height / targetSizePx));
      }
    }
    this.status = StatusAtWork;
    this.fireStarted(imagesData);
    this._lockMap();
    document.addEventListener("pdf:imagesCompleted", function (data) {
      if (!data.detail || !data.detail.images || data.detail.images.length === 0) {
        finish();
        return;
      }
      if (!performScaleToTargetSize) {
        this._startDownload(data.detail.images[0], this.imageFormat === 'jpeg' ? 'jpg' : this.imageFormat);
        finish(data.detail.images[0]);
      } else {
        // todo there are some possible improvement to reduce vector layers blur on rendered image resizing.
        //      we can render vector layers separately at target scale and than mix them with raster layers
        resizeImage(data.detail.images[0], resultWidth, resultHeight, 'image/' + this.imageFormat).then(function (imageUrl) {
          this._startDownload(imageUrl, this.imageFormat === 'jpeg' ? 'jpg' : this.imageFormat);
          finish(imageUrl);
        }.bind(this))["catch"](function (er) {
          console.error(er);
          finish();
        });
      }
    }.bind(this), {
      once: true
    });
    this._createImages([rect], null, imagesData.targetZoom, performScaleToTargetSize ? 'blob' : this.imageFormat);
  },
  /**
   * abort aborts a running pdf or image generation
   */
  abort: function abort() {
    if (this.status !== StatusAtWork) return;
    this.status = StatusAborted;
  },
  /**
   * _createPdf creates pdf and fire the finish event with data set to pdf blob on success or null on fail / abort
   * don't call it directly
   * @param {PagesData}
   * @private
   */
  _createPdf: function _createPdf(pd, data) {
    var images = data.detail ? data.detail.images : [];
    var blob = null;
    var finish = function () {
      this._restoreMap();
      this.fireFinish(blob);
    }.bind(this);
    if (this.status === StatusAborted) {
      finish();
      return;
    }
    if (!images || images.length !== pd.pagesToPrintCount) {
      console.log("pdf: images count is not equal rects count");
      finish();
    }

    // todo add more intelligent text labels processing to except text overlapping
    var addText = function addText(pdf, pageFormat, descriptor) {
      if (!pdf || !descriptor || !descriptor.text || descriptor.text === "" || !descriptor.position) return;
      var w = pageFormat[0];
      var h = pageFormat[1];
      var p = descriptor.position;
      var t = descriptor.text;
      var tw = 0;
      var th = 0;
      var attr = {};
      if (p === "topleft") {
        tw = 0 + 5;
        th = 0 + 5;
        attr = {
          align: "left",
          baseline: "top"
        };
      } else if (p === "topright") {
        tw = w - 5;
        th = 0 + 5;
        attr = {
          align: "right",
          baseline: "top"
        };
      } else if (p === "bottomleft") {
        tw = 0 + 5;
        th = h - 5;
        attr = {
          align: "left",
          baseline: "bottom"
        };
      } else if (p === "bottomright") {
        tw = w - 5;
        th = h - 5;
        attr = {
          align: "right",
          baseline: "bottom"
        };
      } else {
        console.warn("pdf: unknown text position");
        return;
      }
      pdf.text(t, tw, th, attr);
    };
    var pdf = null;
    for (var i = 0; i < pd.pagesToPrint.length; i++) {
      var rect = pd.rects[pd.pagesToPrint[i]];
      this.fireProgress(OpCreatePage, i, pd.pagesToPrint.length, rect);
      var w = void 0,
        h = void 0;
      // recognize rotated portrait/landscape rectangles
      if (rect.rotated) {
        w = pd.hmmPaper;
        h = pd.wmmPaper;
      } else {
        w = pd.wmmPaper;
        h = pd.hmmPaper;
      }
      var orientation = w > h ? "landscape" : "portrait";
      try {
        var pageFormat = [w, h];
        if (pdf == null) {
          pdf = new jspdf.jsPDF({
            format: pageFormat,
            orientation: orientation,
            compress: true
          });
          pdf.setFontSize(this.options.pdfFontSize);
          if (this.options.pdfDocumentProperties !== null && Object.keys(this.options.pdfDocumentProperties).length > 0) {
            pdf.setDocumentProperties(this.options.pdfDocumentProperties);
          }
        } else {
          pdf.addPage([w, h], orientation);
        }
        pdf.addImage(images[i], this.imageFormat, 0, 0, w, h, undefined, "FAST");
        addText(pdf, pageFormat, this.options.pdfSheetAttribution);
        addText(pdf, pageFormat, Object.assign({
          text: "Page ".concat(pd.pagesToPrint[i] + 1, " of ").concat(pd.pageCount)
        }, this.options.pdfSheetPageNumber));
        if (this.options.pdfPageCb && typeof this.options.pdfPageCb === "function") {
          this.options.pdfPageCb(pdf, pd.pagesToPrint[i]);
        }
        //pdf.text(`Scale ${pd.sPaper} : ${pd.sWorld}`, 0+5, h-5, {align: "left", baseline: "bottom"});
        //let attrib = this._getAttribution();
        //if (attrib) {
        //    pdf.text(attrib, w-5, h-5, {align: "right", baseline: "bottom"});
        //}
      } catch (e) {
        console.error(e);
        this.status = StatusAborted;
        break;
      }
    }
    if (this.status === StatusAborted) {
      finish();
      return;
    }
    blob = pdf.output("blob", {
      filename: this._fixFileExt(this.options.outputFileName, 'pdf')
    });
    this._startDownload(blob, 'pdf');
    finish();
  },
  /**
   * creates series of images in background
   * subscribe to document event "pdf:imagesCompleted" to catch when it is finished
   * @private
   * @param rects {[Rectangle]} describes areas to imaging
   * @param indexes {[numbers]} list of indexes in rects array
   * @param targetZoom {number} defines map zoom level the Rectangle coordinates belong to
   * @param imageFormat {string}
   */
  _createImages: function _createImages(rects, indexes, targetZoom, imageFormat) {
    var images = [];
    if (!indexes) {
      indexes = [];
      for (var i = 0; i < rects.length; i++) {
        indexes.push(i);
      }
    }
    var finish = function () {
      document.removeEventListener("pdf:documentTilesLoaded", generateImage);
      document.removeEventListener("pdf:startNextImage", prepareDocumentForImaging);
      document.dispatchEvent(new CustomEvent("pdf:imagesCompleted", {
        detail: {
          images: images
        }
      }));
    }.bind(this);

    // filter out from printing some elements (buttons, dialogs, etc)
    var filter = function (nodeElement) {
      //console.log(node.nodeName + "." + node.className)
      if (nodeElement.matches) {
        var _iterator = _createForOfIteratorHelper(this.options.excludeNodesWithCSS),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var s = _step.value;
            if (nodeElement.matches(s)) return false;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      if (this.options.nodeFilterCb && typeof this.options.nodeFilterCb === "function") return this.options.nodeFilterCb(nodeElement);
      return true;
    }.bind(this);
    var imageGenerator = function imageGenerator() {
      return new Promise(function (resolve, reject) {
        reject("image generator isn't implemented");
      });
    };

    /**
     * it's better to use html-to-image or alternate package, but
     * html-to-image package has a bug with resulting image (only one tile image is displayed along all the map)
     * need to investigate
     */
    if (imageFormat === "jpeg") {
      imageGenerator = domtoimage.toJpeg;
    } else if (imageFormat === "png") {
      imageGenerator = domtoimage.toPng;
    } else if (imageFormat === "blob") {
      imageGenerator = domtoimage.toBlob;
    }
    var generateImage = function (ev) {
      var i = ev.detail.i;
      var r = rects[indexes[i]];
      // we do scale to improve image quality of vector data rendering on retina screens
      var scale = this.pixelRatio;
      var options = {
        width: Math.round(r.width) * scale,
        height: Math.round(r.height) * scale,
        style: {
          transform: 'scale(' + scale + ')',
          transformOrigin: 'top left'
        },
        filter: filter
      };
      imageGenerator(this.map.getContainer(), options).then(function (data) {
        if (this.status === StatusAborted) {
          finish();
          return;
        }
        // if scale > 1 fix images DPI value to correct display on retina screens
        if (scale > 1 && data instanceof Blob) {
          changeDpiBlob(data, this.baseImageDpi * this.pixelRatio).then(function (data) {
            images.push(data);
            document.dispatchEvent(new CustomEvent("pdf:startNextImage", {
              detail: {
                i: i + 1
              }
            }));
          });
        } else if (scale > 1) {
          data = changeDpiDataUrl(data, this.baseImageDpi * this.pixelRatio);
        }
        images.push(data);
        document.dispatchEvent(new CustomEvent("pdf:startNextImage", {
          detail: {
            i: i + 1
          }
        }));
      }.bind(this))["catch"](function (er) {
        console.error("_createImages:domtoimage: got error", er);
        this.fireAborted("internal error");
        this.status = StatusAborted;
        finish();
      }.bind(this));
    }.bind(this);
    var prepareDocumentForImaging = function (ev) {
      try {
        var _i = ev.detail.i;
        var p = indexes[_i];
        if (_i === indexes.length || this.status === StatusAborted) {
          finish();
          return;
        }
        var timestamp = new Date().getTime();
        var r = rects[p];
        this.fireProgress(OpGenerateImage, _i, indexes.length, r);
        var w = r.width;
        var h = r.height;
        var viewCenter = r.middle;

        // when map is still not zoomed to target zoom (at the first image)
        if (this.map.getZoom() !== targetZoom) {
          var scaleToTargetZoom = this.map.getZoomScale(this.map.getZoom(), targetZoom);
          var scaledRect = r.scale(scaleToTargetZoom);
          viewCenter = scaledRect.middle;
        }
        viewCenter = this.map.unproject(viewCenter);
        this.map.getContainer().style.width = "".concat(Math.ceil(w), "px");
        this.map.getContainer().style.height = "".concat(Math.ceil(h), "px");
        this.map.invalidateSize();
        this.map.setView(viewCenter, targetZoom, {
          animate: false
        });

        // todo here we can fix some styles in order to vector layers, markers and tooltips
        //      looks better (not so small at high DPI resolution)

        //need to wait the all tiles is loaded
        var timer = setInterval(function () {
          if (this.status === StatusAborted) {
            clearInterval(timer);
            finish();
            return;
          }
          var _this$_loadedTiles = this._loadedTiles(this.map),
            _this$_loadedTiles2 = _slicedToArray(_this$_loadedTiles, 3),
            totalTiles = _this$_loadedTiles2[0],
            loadedTiles = _this$_loadedTiles2[1],
            loadingLayer = _this$_loadedTiles2[2];
          if (this.options.debug) {
            console.log("tiles loaded: ".concat(loadedTiles, " from ").concat(totalTiles));
          }
          this.fireProgress(OpLoadTiles, loadedTiles, totalTiles, null);
          if (totalTiles === loadedTiles) {
            clearInterval(timer);
            document.dispatchEvent(new CustomEvent("pdf:documentTilesLoaded", {
              detail: {
                i: _i
              }
            }));
            return;
          }
          if (new Date().getTime() - timestamp > this.options.tilesLoadingTimeout) {
            if (this.options.debug) {
              console.log("Aborted due to tiles loading timeout of the layer: ".concat(loadingLayer._url));
            }
            this.status = StatusAborted;
            this.fireAborted("timeout", loadingLayer);
            clearInterval(timer);
            finish();
          }
        }.bind(this), 200);
      } catch (e) {
        console.error("prepareDocumentForImaging: got error", e);
        this.fireAborted("internal error");
        finish();
      }
    }.bind(this);
    document.addEventListener("pdf:documentTilesLoaded", generateImage);
    document.addEventListener("pdf:startNextImage", prepareDocumentForImaging);
    document.dispatchEvent(new CustomEvent("pdf:startNextImage", {
      detail: {
        i: 0
      }
    }));
  },
  /**
   * _loadedTiles check a raster map loading process and returns array with current state of the map
   *
   * @param map
   * @returns {number[]}
   * @private
   */
  _loadedTiles: function _loadedTiles(map) {
    var totalTiles = 0;
    var loadedTiles = 0;
    var stillLoadingLayer = null;
    for (var l in map._layers) {
      var layer = map._layers[l];
      if (layer._url || layer._mutant) {
        if (layer._level) {
          totalTiles += layer._level.el.childNodes.length;
          loadedTiles += layer._level.el.querySelectorAll("img.leaflet-tile-loaded").length;
        }
        if (layer._loading && stillLoadingLayer === null) {
          stillLoadingLayer = layer;
        }
      }
    }
    if (!stillLoadingLayer) {
      loadedTiles = totalTiles;
    }
    return [totalTiles, loadedTiles, stillLoadingLayer];
  },
  fireEvent: function fireEvent(name, data) {
    this.map.fire("imagePdf:" + name, data);
  },
  fireStarted: function fireStarted(data) {
    this.fireEvent("start", data);
  },
  fireFinish: function fireFinish(blob) {
    this.fireEvent("finish", {
      blob: blob
    });
  },
  fireProgress: function fireProgress(operation, itemNo, totalItems, item) {
    this.fireEvent("progress", {
      operation: operation,
      itemNo: itemNo,
      totalItems: totalItems,
      item: item
    });
  },
  fireAborted: function fireAborted(reason, data) {
    this.fireEvent("aborted", {
      reason: reason,
      data: data
    });
  },
  // temporary disabled
  // todo need to refactored
  _getAttribution: function _getAttribution() {
    var attrib = undefined;
    this.map.eachLayer(function (layer) {
      if (attrib === undefined && layer.getAttribution()) {
        attrib = layer.getAttribution().replace(/<[^>]*>/g, "");
      }
    });
    return attrib;
  },
  pixelsToMeters: function pixelsToMeters(pixels, pos) {
    // https://stackoverflow.com/questions/49122416/use-value-from-scale-bar-on-a-leaflet-map
    var point1 = this.map.latLngToLayerPoint(pos).add(L.point(-pixels / 2, 0));
    var point2 = this.map.latLngToLayerPoint(pos).add(L.point(+pixels / 2, 0));
    point1 = this.map.layerPointToLatLng(point1);
    point2 = this.map.layerPointToLatLng(point2);
    return point1.distanceTo(point2);
  },
  metersToPixels: function metersToPixels(meters, pos) {
    return meters / this.pixelsToMeters(1, pos);
  },
  scaleToDPI: function scaleToDPI(scale) {
    var sPaper = 1;
    var sWorld = scale;
    var size = this._orientedPageSize();
    var wmmPaper = size.width;
    var hmmPaper = size.height;
    var paperToWorld = sPaper / sWorld;
    var worldToPaper = 1 / paperToWorld;
    var wmmWorld = wmmPaper * worldToPaper;
    var hmmWorld = hmmPaper * worldToPaper;
    var routeCenter = this.area.getCenter();
    var wpxWorld = this.metersToPixels(wmmWorld / 1000, routeCenter);
    var hpxWorld = this.metersToPixels(hmmWorld / 1000, routeCenter);
    var dpix = wpxWorld / (wmmPaper / 25.4);
    var dpiy = hpxWorld / (hmmPaper / 25.4);
    var dpi = (dpix + dpiy) / 2;
    return dpi;
  },
  DPIToScale: function DPIToScale(dpi) {
    var size = this._orientedPageSize();
    var wmmPaper = size.width;
    var hmmPaper = size.height;
    var wpxWorld = dpi / 25.4 * wmmPaper;
    var hpxWorld = hmmPaper / wmmPaper * wpxWorld;
    var sWorldx = 1 * this.pixelsToMeters(wpxWorld, this.area.getCenter()) * 1000 / wmmPaper;
    var sWorldy = 1 * this.pixelsToMeters(hpxWorld, this.area.getCenter()) * 1000 / hmmPaper;
    var sWorld = (sWorldx + sWorldy) / 2;
    return sWorld;
  },
  _showRectangles: function _showRectangles(rects, p) {
    this.rectGroup.clearLayers();
    for (var i = 0; i < rects.length; i++) {
      var bigRect = rects[i];
      var smallRect = bigRect.pad(-p);
      smallRect = [this.map.unproject(smallRect.min), this.map.unproject(smallRect.max)];
      bigRect = [this.map.unproject(bigRect.min), this.map.unproject(bigRect.max)];
      L.rectangle(bigRect, Object.assign({}, this.rectPreviewStyle)).addTo(this.rectGroup);
      L.rectangle(smallRect, Object.assign({}, this.rectPreviewStyle, {
        fill: false
      })).addTo(this.rectGroup);
    }
    if (this.rectGroup._map == null) {
      this.rectGroup.addTo(this.map);
    }
  },
  _getBoxRectangles: function _getBoxRectangles(LObject, w, h, p, areaPadding, o) {
    if (LObject === null) return [];
    var bounds = null;
    if (LObject instanceof L.LatLngBounds) bounds = LObject;
    if (typeof LObject.getBounds == "function") bounds = LObject.getBounds();
    if (!bounds) return [];
    var topLeft = this.map.project(bounds.getNorthWest()).subtract([areaPadding, areaPadding]);
    var bottomRight = this.map.project(bounds.getSouthEast()).add([areaPadding, areaPadding]);
    var rects = coverAreaWithRectangles(topLeft, bottomRight, w - 2 * p, h - 2 * p);
    return rects;
  },
  _getRouteRectangles: function _getRouteRectangles(LObject, w, h, p, ap, o) {
    if (LObject === null || typeof LObject.getLatLngs !== "function") return [];
    var ll = LObject.getLatLngs();
    if (ll.length === 0) {
      return [];
    }
    if (ll[0] instanceof Array) {
      // multidimensional array (possible multipath ? )
      // we will get only first path
      ll = ll[0];
    }
    var l = ll.slice(); // copy array (algorithm will modify it) TODO: don't modify
    for (var i = 0; i < l.length; i++) {
      l[i] = this.map.project(l[i]); // geo to pixel coords (so paper size becomes meaningful)
    }
    var _coverLineWithRectang = coverLineWithRectangles(l, w - 2 * p, h - 2 * p, o === PageOrientationAuto),
      _coverLineWithRectang2 = _slicedToArray(_coverLineWithRectang, 2),
      rects = _coverLineWithRectang2[0],
      intersections = _coverLineWithRectang2[1];

    // show intersection points (only for debugging purposes)
    if (this.options.debug) {
      // convert from pixel coordinates back to geographical coordinates
      for (var _i2 = 0; _i2 < intersections.length; _i2++) {
        intersections[_i2] = this.map.unproject(intersections[_i2]);
      }
      var _iterator2 = _createForOfIteratorHelper(intersections),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _p2 = _step2.value;
          L.circleMarker(_p2, {
            radius: 5,
            stroke: false,
            color: "black",
            opacity: 1,
            fillOpacity: 1.0
          }).addTo(this.debugRectGroup);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
    return rects;
  },
  _fixFileExt: function _fixFileExt(filename, ext) {
    var exts = ['jpg', 'png', 'pdf'];
    var i;
    var e;
    for (var _i3 = 0, _exts = exts; _i3 < _exts.length; _i3++) {
      e = _exts[_i3];
      var suffix = '.' + e;
      i = filename.lastIndexOf(suffix);
      if (i !== -1) {
        if (i === filename.length - suffix.length) {
          break;
        } else {
          i = -1;
        }
      }
    }
    //fix extension
    if (i !== -1) {
      if (e === ext) {
        return filename;
      } else {
        return filename.substring(0, i) + '.' + ext;
      }
    }
    return filename + '.' + ext;
  },
  _startDownload: function _startDownload(data, ext) {
    if (!this.options.downloadOnFinish || !data) return;

    // fix extensions if needed
    var fileName = this._fixFileExt(this.options.outputFileName, ext);
    Object.assign(this.downloadLink, {
      "download": fileName
    });
    this.downloadLink.href = data instanceof Blob ? URL.createObjectURL(data) : data;
    this.downloadLink.click(); // download
  },
  isScalePaging: function isScalePaging() {
    return this.options.pagingMethod === "scale";
  },
  isPagesPaging: function isPagesPaging() {
    return this.options.pagingMethod === "pages";
  },
  /**
   * set the maximum zoom level of the map we can fall down for image tiles loading
   * if null it will be evaluated from map.getMaxZoom()
   * can be number, or function, that should return the number
   * @param v
   */
  setMaxZoom: function setMaxZoom(v) {
    this.maxZoom = v;
  },
  setArea: function setArea(area) {
    if (_typeof(area) === 'object') {
      if (!(area instanceof L.LatLngBounds) && typeof area.getBounds !== 'function') {
        throw new Error("the area should be instance of LatLngBounds class, or must have getBounds method");
      }
    }
    this.area = area;
    if (!area) {
      this.hideImageRegions();
    }
  },
  setScale: function setScale(scale) {
    this.scale = parseInt(scale);
  },
  getScale: function getScale() {
    return this.scale;
  },
  /**
   * setPageCount defines the number of pages the area will be divided into
   * used only if pagingMethod set to 'pages'
   * @param pages
   */
  setPageCount: function setPageCount() {
    var pages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    if (pages * 1 === 0) pages = 1;
    this.pageCount = pages;
  },
  /**
   *
   * @returns {number}
   */
  getPageCount: function getPageCount() {
    return this.pageCount;
  },
  /**
   * setPageOrientation defines pdf page orientation
   * @param orientation
   */
  setPageOrientation: function setPageOrientation(orientation) {
    var _iterator3 = _createForOfIteratorHelper(this.pageOrientations),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var o = _step3.value;
        if (typeof orientation.toLowerCase === 'function' && o.name.toLowerCase() === orientation.toLowerCase()) {
          this.pageOrientation = o.value;
          return;
        }
        if (o.value === orientation) {
          this.pageOrientation = orientation;
          return;
        }
      }
      //default page orientation
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    this.pageOrientation = this.options.pageOrientation;
  },
  /**
   * setPageMargin defines pdf page margin in mm
   * @param mm
   */
  setPageMargin: function setPageMargin(mm) {
    this.pageMargin = parseInt(mm);
  },
  getPageMargin: function getPageMargin() {
    return this.pageMargin;
  },
  /**
   * setPagesToPrint defines page numbers to include into pdf document
   * @param pagesNumbers
   */
  setPagesToPrint: function setPagesToPrint(pagesNumbers) {
    if (_typeof(pagesNumbers) !== 'object') {
      this.pagesToPrintDefined = [];
    } else {
      this.pagesToPrintDefined = pagesNumbers.slice();
    }
  },
  /**
   * setPageFormat defines page format
   * @param name
   */
  setPageFormat: function setPageFormat(name) {
    var _this = this;
    var i = this.pageFormats.findIndex(function (size) {
      return size.name === name;
    });
    if (i === -1) {
      i = this.pageFormats.findIndex(function (size) {
        return size.name === _this.options.pageFormat;
      });
    }
    this.pageFormat = this.pageFormats[i];
    this.pageSize.width = this.pageFormat.width;
    this.pageSize.height = this.pageFormat.height;
  },
  setPageSize: function setPageSize(width, height) {
    if (width > 0 && height > 0) {
      this.pageSize.width = parseInt(width);
      this.pageSize.height = parseInt(height);
      this.pageFormat = null;
    }
  },
  getPageFormats: function getPageFormats() {
    return this.pageFormats;
  },
  getPageFormat: function getPageFormat() {
    return this.pageFormat;
  },
  getPageOrientations: function getPageOrientations() {
    return this.pageOrientations;
  },
  setImageFormat: function setImageFormat(format) {
    if (format != "jpeg" && format != "png") {
      throw "Invalid image format: \"".concat(format, "\"");
    }
    this.imageFormat = format;
  },
  setRectPreviewStyle: function setRectPreviewStyle(style) {
    if (!style) {
      style = this.options.rectanglePreviewStyle;
    }
    this.rectPreviewStyle = Object.assign({}, style);
  }
});

/**
 *
 * @param map
 * @param options
 * @returns {L.Control.ImagePdf}
 */
L.imagePdf = function (map, options) {
  return new L.Control.ImagePdf(map, options);
};

export { OpCreatePage, OpGenerateImage, OpLoadTiles };
