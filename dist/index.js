"use strict";
import React from "react"
import { useState, useRef, useEffect } from "react";
import "./css/DataTable.css";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) {return  _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function DataTable(props) {
  var data = props.data;
  var _useState = (0, useState)(data),
    _useState2 = _slicedToArray(_useState, 2),
    sortedData = _useState2[0],
    setSortedData = _useState2[1];
  var _useState3 = (0, useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    ascendent = _useState4[0],
    setAscendent = _useState4[1];
  var _useState5 = (0, useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    unFound = _useState6[0],
    setUnFound = _useState6[1];
  var sortData = function sortData(filterId) {
    var tableList = document.querySelectorAll('th');
    switch (filterId) {
      case filterId:
        if (ascendent) {
          setSortedData(_toConsumableArray(sortedData).sort(function (a, b) {
            return a[filterId].localeCompare(b[filterId]);
          }));
          tableList.forEach(function (table) {
            var chevronUp = table.children[0].children[0].children[0];
            var chevronDown = table.children[0].children[0].children[1];
            if (table.id === filterId) {
              chevronUp.classList.remove('unsorted');
              chevronDown.classList.add('unsorted');
            } else {
              chevronUp.classList.add('unsorted');
              chevronDown.classList.add('unsorted');
            }
          });
          setAscendent(false);
        } else {
          setSortedData(_toConsumableArray(sortedData).sort(function (a, b) {
            return b[filterId].localeCompare(a[filterId]);
          }));
          tableList.forEach(function (table) {
            var chevronUp = table.children[0].children[0].children[0];
            var chevronDown = table.children[0].children[0].children[1];
            if (table.id === filterId) {
              chevronDown.classList.remove('unsorted');
              chevronUp.classList.add('unsorted');
            } else {
              chevronDown.classList.add('unsorted');
              chevronUp.classList.add('unsorted');
            }
          });
          setAscendent(true);
        }
        break;
      default:
        return sortedData;
    }
  };
  var _useState7 = (0, useState)(10),
    _useState8 = _slicedToArray(_useState7, 2),
    entry = _useState8[0],
    setEntry = _useState8[1];
  var _useState9 = (0, useState)(1),
    _useState10 = _slicedToArray(_useState9, 2),
    firstEntry = _useState10[0],
    setFirstEntry = _useState10[1];
  var _useState11 = (0, useState)(entry),
    _useState12 = _slicedToArray(_useState11, 2),
    maxEntries = _useState12[0],
    setMaxEntries = _useState12[1];
  var handleChange = function handleChange(e) {
    setEntry(JSON.parse(e.target.value));
  };
  var currentPage = (0, useRef)(1);
  var handlePrevNext = function handlePrevNext(e) {
    var handleButton = e.target;
    switch (handleButton.id) {
      case 'next-btn':
        if (currentPage.current < pages.length) {
          currentPage.current++;
          if (entry * currentPage.current <= sortedData.length) {
            setFirstEntry(maxEntries + 1);
            setMaxEntries(entry * currentPage.current);
          } else {
            setFirstEntry(currentPage.current * entry - entry + 1);
            setMaxEntries(sortedData.length);
          }
        }
        break;
      case 'prev-btn':
        if (currentPage.current > 1) {
          currentPage.current--;
          setFirstEntry(firstEntry - entry);
          setMaxEntries(currentPage.current * entry);
        }
        break;
      default:
        return console.log('no action');
    }
  };
  var searchEmployee = function searchEmployee(e) {
    var value = e.target.value;
    var result = [];
    if (data.length > 0) {
      data.filter(function (employee) {
        var EmployeeList = JSON.stringify(Object.values(employee));
        if (EmployeeList.toLowerCase().includes(value.toLowerCase())) {
          result.push(employee);
        }
        if (result.length < 1) {
          setUnFound(true);
        } else {
          setUnFound(false);
        }
        return setSortedData(result);
      });
    }
  };
  var pages = [];
  if (data.length > 0) {
    var NumberOfPages = Math.ceil(sortedData.length / entry);
    for (var i = 1; i <= NumberOfPages; i++) {
      pages.push(i);
    }
  }
  var selectPage = function selectPage(e) {
    var page = JSON.parse(e.target.innerText);
    currentPage.current = page;
    if (pages.length > 1) {
      if (page === 1) {
        setFirstEntry(1);
        setMaxEntries(entry);
      } else if (sortedData.length <= entry * page) {
        setMaxEntries(sortedData.length);
      } else {
        setMaxEntries(entry * page);
      }
      setFirstEntry(page * entry - entry + 1);
    }
  };
  (0, useEffect)(function () {
    if (data.length > 0) {
      if (pages.length < 1) {
        currentPage.current = 0;
      } else {
        currentPage.current = 1;
      }
      if (sortedData.length >= entry) {
        setMaxEntries(entry);
      } else {
        setMaxEntries(sortedData.length);
      }
      if (unFound) {
        setFirstEntry(0);
        setMaxEntries(0);
      } else {
        setFirstEntry(1);
      }
    }
  }, [data.length, entry, pages.length, sortedData, unFound]);
  (0, useEffect)(function () {
    if (data.length > 0) {
      if (currentPage.current === 0) {
        document.getElementById('prev-btn').style.background = 'none';
        document.getElementById('next-btn').style.background = 'none';
      } else if (firstEntry === 1) {
        document.getElementById('prev-btn').style.background = 'none';
      } else {
        document.getElementById('prev-btn').style.background = '#687e12';
      }
      if (maxEntries === sortedData.length) {
        document.getElementById('next-btn').style.background = 'none';
      } else {
        document.getElementById('next-btn').style.background = '#687e12';
      }
    }
  }, [currentPage, data.length, firstEntry, maxEntries, sortedData]);
  return /*#__PURE__*/React.createElement("div", {
    id: "employee-div",
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "table-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "entries"
  }, "Show", /*#__PURE__*/React.createElement("select", {
    onChange: handleChange
  }, /*#__PURE__*/React.createElement("option", null, "10"), /*#__PURE__*/React.createElement("option", null, "25"), /*#__PURE__*/React.createElement("option", null, "50"), /*#__PURE__*/React.createElement("option", null, "100")), "Entries"), /*#__PURE__*/React.createElement("div", {
    className: "search-container"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "searchbar"
  }, "Search:"), /*#__PURE__*/React.createElement("input", {
    onKeyUp: searchEmployee,
    type: "text",
    id: "searchbar",
    name: "searchbar"
  }))), data.length > 0 ? /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, Object.keys(data[0]).map(function (key, index) {
    return /*#__PURE__*/React.createElement("th", {
      id: key,
      onClick: function onClick() {
        return sortData(key);
      },
      key: key + index
    }, /*#__PURE__*/React.createElement("div", {
      id: key,
      className: "data-title"
    }, key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
      return str.toUpperCase();
    }), /*#__PURE__*/React.createElement("span", {
      className: "chevrons"
    }, /*#__PURE__*/React.createElement("i", {
      id: "chevron-up",
      onClick: function onClick() {
        return sortData(key);
      },
      className: "fa-solid fa-caret-up unsorted"
    }), /*#__PURE__*/React.createElement("i", {
      id: "chevron-down",
      onClick: function onClick() {
        return sortData(key);
      },
      className: "fa-solid fa-caret-down unsorted"
    }))));
  }))), !unFound ? /*#__PURE__*/React.createElement("tbody", {
    className: "data-table"
  }, sortedData.map(function (obj, index) {
    return /*#__PURE__*/React.createElement("tr", {
      key: index
    }, index + 1 >= firstEntry && index < maxEntries && Object.values(obj).map(function (key, index) {
      return /*#__PURE__*/React.createElement("td", {
        key: key + index
      }, key);
    }));
  })) : /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "10",
    className: "empty-list"
  }, "No Data Found"))), /*#__PURE__*/React.createElement("tfoot", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "6"
  }, "Showing ", firstEntry, " To ", maxEntries, " Of ", sortedData.length, " Entries ", sortedData.length < data.length && ' (filtered from ' + data.length + ' total entries)'), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    id: "prev-btn",
    onClick: handlePrevNext
  }, "Preview")), /*#__PURE__*/React.createElement("td", {
    className: "pages"
  }, data.length > 0 && pages.map(function (page) {
    return /*#__PURE__*/React.createElement("div", {
      className: "page-number",
      onClick: selectPage,
      key: page
    }, page);
  })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    id: "next-btn",
    onClick: handlePrevNext
  }, "Next"))))) : /*#__PURE__*/React.createElement("div", {
    className: "empty-list"
  }, "There's no Data"));
}
export { DataTable };