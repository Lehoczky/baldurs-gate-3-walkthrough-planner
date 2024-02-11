/**
 * Creates an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining
 * elements.
 *
 * @param input The array to process.
 * @param size The length of each chunk
 * @returns Returns the new array of chunks.
 * @example
 *
 * chunk(['a', 'b', 'c', 'd'], 2)
 * // => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3)
 * // => [['a', 'b', 'c'], ['d']]
 */
export const chunk = <T>(input: T[], size: number) => {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0
      ? [...arr, [item]]
      : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]]
  }, [])
}

/**
 * Produces a random number between the inclusive `lower` and `upper` bounds.
 * If only one argument is provided a number between `0` and the given number
 * is returned.
 */
export const randomInt = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b))
  const upper = Math.floor(Math.max(a, b))
  return Math.floor(lower + Math.random() * (upper - lower + 1))
}

/**
 * Opens the user's system file dialog prompting to download
 * the given data.
 *
 * @param fileName default name of the saved file. This is what will show up as file name in the user's file dialog.
 * @param data the content of the file.
 * @param mime [mime type](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type) of the file
 * @param bom
 */
export function download(
  fileName: string,
  data: string | ArrayBuffer | ArrayBufferView | Blob,
  mime = "text/plain",
  bom?: string | Uint8Array,
) {
  const blobData = bom === undefined ? [data] : [bom, data]
  const blob = new Blob(blobData, { type: mime })
  const a = document.createElement("a")

  a.download = fileName
  a.href = URL.createObjectURL(blob)
  a.click()
  setTimeout(() => {
    URL.revokeObjectURL(a.href)
    a.remove()
  }, 200)
}

export async function parseJsonFile<T = any>(file: File) {
  return await new Promise<T>((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = (event) => {
      const result = event.target.result as string
      try {
        const parsedJSON = JSON.parse(result)
        resolve(parsedJSON)
      } catch (error) {
        reject(error)
      }
    }
    fileReader.onerror = (error) => reject(error)
    fileReader.readAsText(file)
  })
}
