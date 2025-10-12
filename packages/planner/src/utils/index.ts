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
  const blob = new Blob(blobData as any, { type: mime })
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
  const text = await file.text()
  return JSON.parse(text) as T
}

/**
 * @see https://stackoverflow.com/a/75124481/10876366
 */
export function isEditableElement(el: EventTarget) {
  if (el instanceof HTMLElement && el.isContentEditable) {
    return true
  }
  if (el instanceof HTMLInputElement) {
    if (/text|email|number|password|search|tel|url/.test(el.type || "")) {
      return !(el.disabled || el.readOnly)
    }
  }
  if (el instanceof HTMLTextAreaElement) {
    return !(el.disabled || el.readOnly)
  }
  return false
}
