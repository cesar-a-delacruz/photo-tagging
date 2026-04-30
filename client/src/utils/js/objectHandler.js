/**
 * Keeps formData fields values while identifying them
 * with ther name
 * @param formData array of fields with their name, type and value
 * @returns object with the name as the key for each field and their value
 */
export function formDataValues(formData) {
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

/**
 * Gets data from the click event on a image and returns
 * the normalized click position with the image
 * @param clickEvent event received from the onClick handler
 * @returns object with the normalized x and y coordinates of the click
 */
export function imageClickedPosition(clickEvent) {
  const imgBoundingSides = {
    left: clickEvent.currentTarget.getBoundingClientRect().left,
    top: clickEvent.currentTarget.getBoundingClientRect().top,
  };
  const imgSizeRatio = {
    width:
      clickEvent.currentTarget.naturalWidth /
      clickEvent.currentTarget.clientWidth,
    height:
      clickEvent.currentTarget.naturalHeight /
      clickEvent.currentTarget.clientHeight,
  };
  return {
    x: (clickEvent.clientX - imgBoundingSides.left) * imgSizeRatio.width,
    y: (clickEvent.clientY - imgBoundingSides.top) * imgSizeRatio.height,
  };
}
