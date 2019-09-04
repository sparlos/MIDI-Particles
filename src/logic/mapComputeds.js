export default (properties) => {
  let computeds = {};
  properties.forEach(property => {
    let capitalizedProperty = property.charAt(0).toUpperCase() + property.slice(1);
    computeds[property] = {
      get() {
        return this[`store${capitalizedProperty}`];
      },
      set(value) {
        this[`change${capitalizedProperty}`]({
          [property] : value
        });
      }
    };
  });
  
  return computeds;
}