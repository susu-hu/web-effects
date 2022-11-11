// code Runner插件
const B = () => {
  return new Promise(reslove => {
    setTimeout(() => {
      reslove("苏苏苏哇哈哈哈");
    }, 4000);
  });
};
const C = async () => {
  return await B();
};

const getData = async () => {
  console.log("执行");
  console.log("结果", await C());
};

getData();
