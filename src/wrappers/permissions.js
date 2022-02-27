import { Redirect } from 'umi'

export default (props) => {
    const path = props.location.pathname;
    const currentRoute = props.routes[1].routes.find(route => route.path === path);

    if (!currentRoute.unaccessible) {
        return props.children;
    }

    return <Redirect to="/" />;
}