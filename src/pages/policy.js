import PolicyComponent from "../components/Policy"
import Loading from "@/components/Loading";
export default function Policy({userData}){
    if(userData == null) return <Loading/>
    return <PolicyComponent/>
}