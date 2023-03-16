import { useLocation, useNavigate } from "react-router-dom";

const list = [
  { name: "shadow 阴影", path: "/shadow" },
  { name: "animation 动效", path: "/animation" },
  { name: "scene 基本", path: "/scene" },
  { name: "geometry 几何体", path: "/geometry" }
]

const IndexPage = () => {
  const navigate = useNavigate();

  const onClick = (path) => {
    navigate(path)
  }

  return <div>
    <ul>
      {list.map(item => <li key={item.name} onClick={() => onClick(item.path)}>{item.name}</li>)}
    </ul>
  </div>
}

export default IndexPage
