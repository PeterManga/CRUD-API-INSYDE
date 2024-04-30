import { useNavigate } from "react-router-dom";

export const UseNavigation=()=>{
    const navigate = useNavigate();

    const handleNavigation = (route)=>{
        navigate(route)
    };
    return handleNavigation
}