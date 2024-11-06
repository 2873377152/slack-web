declare module '*.module.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.mp4' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module 'echarts/lib/echarts' {
  const echarts: any; // 使用 any 类型来避免类型检查错误
  export = echarts;
}