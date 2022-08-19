let myplugin = function (Vue) {
  Vue.prototype.fdoufn = function (fn, wait) {
    // 每次点击清除之前的定时器   只保留当前的定时器
    let timer = null;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn();
      }, wait);
    };
  };
};
export default myplugin;