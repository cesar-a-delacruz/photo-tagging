export function formDataReducer(formData) {
  return formData.reduce((acc, data) => {
    if (data.type === "json") {
      acc[data.name] = Object.keys(data.value).reduce((a, key) => {
        a[key] = data.value[key];
        return a;
      }, {});
    } else if (data.type === "file") {
      const file = document.getElementById(`${data.name}`).files[0];
      acc[data.name] = file;
    } else acc[data.name] = data.value;
    return acc;
  }, {});
}
