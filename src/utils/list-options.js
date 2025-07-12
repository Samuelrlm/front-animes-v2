import { TbMovie } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

const listOptions = [
    {
       label: "Animes",
       path: "/animes",
       icon: <TbMovie />,
       enable: [
         "user",
         "admin"
       ]
    },
    {
        label: "Usuários",
        path: "/users",
        icon: <FaUsers />,
        enable: [
            "admin"
        ],
    },
    {
        label: "Configurações",
        icon: <IoMdSettings />,
        path: "/settings",
        enable: [
            "admin"
        ]
    }
]

export default listOptions;