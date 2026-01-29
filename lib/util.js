export function disambiguateRequiredAge(data) {
  return {
    ...data,
    required_age: String(data.required_age),
  };
}

export function stripHTML(data) {
  const stringifiedData = JSON.stringify(data);
  const strippedData = stringifiedData.replace(/<\/?(.*?)>/g, "");
  return JSON.parse(strippedData);
}

export function fixNonNullRequirements(data) {
  return {
    ...data,
    mac_requirements: Array.isArray(data.mac_requirements)
      ? null
      : data.mac_requirements,
    linux_requirements: Array.isArray(data.linux_requirements)
      ? null
      : data.linux_requirements,
  };
}

export function processData(data) {
  return Object.values(data).map(({ data }) =>
    stripHTML(disambiguateRequiredAge(fixNonNullRequirements(data))),
  );
}
