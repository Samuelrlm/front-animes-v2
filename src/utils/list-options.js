import { TbMovie } from "react-icons/tb";

const listOptions = [
    {
       label: "Animes",
       path: "/animes",
       icon: <TbMovie />,
       enable: [
         "user",
         "admin"
       ]
    }
]