export function trunctuateWord(str, length) {
  if (length == null) {
    length = 100;
  }
  ending = "...";

  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
}
