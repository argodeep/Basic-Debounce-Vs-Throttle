import React, { useEffect } from "react";
import "./styles.css";

export default function App() {
  let clicked = 0;
  let called = 0;
  const debounce = _debounce(2000);
  const throttle = _throttle(2000);

  function searchDebounce(event) {
    event.stopPropagation();
    debounce(function (...arg) {
      console.log("Searched Keyword -", ...arg);
    }, event.target.value);
  }

  function add(event) {
    event.stopPropagation();
    clicked++;
    throttle(function () {
      called++;
      console.log("Clicked",clicked,"times but called",called,"times");
    });
  }

  function _debounce(timeout) {
    let timer;
    return function (fn, ...args) {
      const context = this;
      const exec = function () {
        timer = null;
        fn.apply(context, args);
      };
      clearTimeout(timer);
      timer = setTimeout(exec, timeout);
    };
  }

  function _throttle(timeout) {
    let timer;
    return function (fn, ...args) {
      const context = this;
      const exec = function () {
        timer = null;
        fn.apply(context, args);
      };
      if (!timer) {
        timer = setTimeout(exec, timeout);
      }
    };
  }

  useEffect(() => {}, []);

  return (
    <div className="App">
      <input onChange={searchDebounce} placeholder="Search User - Debounce" />
      <br />
      <br />
      <button onClick={add}>Thottle Check</button>
    </div>
  );
}
