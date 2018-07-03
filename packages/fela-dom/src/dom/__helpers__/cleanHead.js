export default function cleanHead() {
  const head = document.head
  while (head.firstChild) {
    head.removeChild(head.firstChild)
  }
}
