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

export function formDataReseter(formData) {
  for (let i = 0; i < formData.length; i++) {
    if (formData[i].type === "json") {
      formData[i].value = Object.keys(formData[i].value).reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
    } else formData[i].value = "";
  }
  return [...formData];
}
