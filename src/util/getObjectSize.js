/**
 * Get the size of an object in bytes
 * @param {Object} object - The object to get the size of
 * @returns {Number} The size of the object in bytes
 * @example
 * getObjectSize({ a: 1, b: 2, c: 3 }); // 24
 */
export default function getObjectSize(object) {
  const objectList = [];
  const stack = [object];
  let bytes = 0;

  while (stack.length) {
    const value = stack.pop();

    switch (typeof value) {
      case 'boolean':
        bytes += 4;
        break;
      case 'string':
        bytes += value.length * 2;
        break;
      case 'number':
        bytes += 8;
        break;
      case 'object':
        if (!objectList.includes(value)) {
          objectList.push(value);
          for (const prop in value) {
            if (value.hasOwnProperty(prop)) {
              stack.push(value[prop]);
            }
          }
        }
        break;
    }
  }

  return bytes;
}
