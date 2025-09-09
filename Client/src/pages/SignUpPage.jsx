import Header  from "../components/Header";
import SignUpForm from "../components/SignUpForm";

function SignUpPage(){
    return <div>
        <Header RequireAuth={false}></Header>
        <SignUpForm></SignUpForm>
    </div>
}

export default SignUpPage;