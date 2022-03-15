export default function (initialState) {
    const { permissions } = initialState.currentUser;

    return {
        canViewProducts: true, //permissions.includes('permission.product.view'),
        canViewCategories: permissions.includes('permission.category.view')
    };
}