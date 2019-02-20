export function html(array: TemplateStringsArray, ...args: any[]): string {
  let s = "";
  for (let i = 0; i < array.length; i++) {
    s += array[i] + argToString(args[i]);
  }
  return s;
}
function argToString(arg: unknown): string {
  if (arg === undefined || arg === null) {
    return "";
  }
  return String(arg);
}
