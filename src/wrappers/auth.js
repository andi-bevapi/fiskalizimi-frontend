import { Redirect } from 'umi'

export default (props) => {
    if (localStorage.token) {
        return props.children;
    }

    return <Redirect to="/login" />;
}