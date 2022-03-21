export default function (initialState) {
    const { permissions } = initialState.currentUser;

    return {
        canViewProduct: true, // permissions.includes('permission.product.view'),
        canCreateProduct: true, // permissions.includes('permission.product.create'),
        canEditProduct: true, // permissions.includes('permission.product.edit'),
        canDeleteProduct: true, // permissions.includes('permission.product.delete'),
    };
}