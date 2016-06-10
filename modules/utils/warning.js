let warning = () => true

if (process.env.NODE_ENV !== 'production') {
  warning = function(condition, message) {
    if (!condition) {
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        throw new Error(message);
      } catch (x) {}
    }
  };
}

export default warning
