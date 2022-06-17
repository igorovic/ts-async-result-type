Example usage of Typescript type inference on the return type of an `async Function`


```ts
type AsyncReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : any;
  ```


  The following example is an interesting use case. Since typescript is not able to infer types from `getStaticProps` using the a [Generic type](https://www.typescriptlang.org/docs/handbook/2/generics.html) spares us from importing third party types. 