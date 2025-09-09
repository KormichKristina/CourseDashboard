import Header  from "../components/Header";
import LogInForm from "../components/LogInForm";

function LogInPage(){
    return <div>
        <Header RequireAuth={false}></Header>
        <LogInForm></LogInForm>
    </div>
}

export default LogInPage;