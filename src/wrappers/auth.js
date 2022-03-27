import { Redirect } from 'umi'

export default (props) => {
    if (localStorage.poslaToken) {
        return props.children;
    }

    return <Redirect to="/login" />;
}