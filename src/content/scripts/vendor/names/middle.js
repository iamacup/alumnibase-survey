
export default function checkMiddleName(toCheck) {
  const pcexp = /^([A-Z]\w+\s?){3,9}$/g;

  // Load up the string to check
  const name = toCheck;

  // Assume we're not going to find a valid name
  let valid = false;

  // Check the string against the regEx
  if (pcexp.test(name)) valid = true;

  // Return with either the reformatted valid name or the original invalid name
  if (valid) return name;

  return false;
}
