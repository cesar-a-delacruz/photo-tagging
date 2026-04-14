export function formDataReducer(formData) {
  return formData.reduce((acc, data) => {
    if (data.type === "json") {
      acc[data.name] = Object.keys(data.value).reduce((a, key) => {
        a[key] = data.value[key];
        return a;
      }, {});
    } else acc[data.name] = data.value;
    return acc;
  }, {});
}
