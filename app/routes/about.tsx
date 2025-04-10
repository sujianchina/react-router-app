import { Link } from "react-router";

export default function About() {
  return (
    <div id="about">
      <Link to="/">← 返回到示例</Link>
      <h1>关于React Router</h1>
      <div>
        <p>
          这是一个演示应用程序，展示了一些强大的功能 React
          Router，包括动态路由、嵌套路由、加载器， 行动，以及更多。
        </p>

        <h2>功能特征</h2>
        <p>探索演示，了解React Router如何处理：</p>
        <ul>
          <li>使用加载器和操作进行数据加载和突变</li>
          <li>具有父/子关系的嵌套路由</li>
          <li>基于URL的动态分段路由</li>
          <li>待定和乐观的UI</li>
        </ul>

        <h2>学习更多</h2>
        <p>
          查看官方文件 <a href="https://reactrouter.com">reactrouter.com</a>
          关于使用React Router构建优秀的web应用程序。
        </p>
      </div>
    </div>
  );
}
