import { useLocation, useNavigate } from "react-router-dom";

const list = [
  { name: "shadow", path: "/shadow" },
  { name: "animation", path: "/animation" },
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
