declare module 'sea-axios' {
  type ajax = (config: object) => Promise<any>
  export default function (config: object): ajax
}