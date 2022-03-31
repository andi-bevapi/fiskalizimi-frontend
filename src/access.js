export default function (initialState) {
    const { permissions } = initialState.currentUser;

    return {
        canViewProduct: permissions.includes('permission.product.view'),
        canCreateProduct: permissions.includes('permission.product.create'),
        canUpdateProduct: permissions.includes('permission.product.update'),
        canDeleteProduct: permissions.includes('permission.product.delete'),
        canViewBranch: permissions.includes('permission.branch.view'),
        canCreateBranch: permissions.includes('permission.branch.create'),
        canUpdateBranch: permissions.includes('permission.branch.update'),
        canDeleteBranch: permissions.includes('permission.branch.delete'),
        canViewCategory: permissions.includes('permission.category.view'),
        canCreateCategory: permissions.includes('permission.category.create'),
        canUpdateCategory: permissions.includes('permission.category.update'),
        canDeleteCategory: permissions.includes('permission.category.delete'),
        canViewSupplier: permissions.includes('permission.supplier.view'),
        canCreateSupplier: permissions.includes('permission.supplier.create'),
        canUpdateSupplier: permissions.includes('permission.supplier.update'),
        canDeleteSupplier: permissions.includes('permission.supplier.delete'),
        canViewSellingUnit: permissions.includes('permission.sellingUnit.view'),
        canCreateSellinUnit: permissions.includes('permission.sellingUnit.create'),
        canUpdateSellingUnit: permissions.includes('permission.sellingUnit.update'),
        canDeleteSellingUnit: permissions.includes('permission.sellingUnit.delete'),
        canViewUser: permissions.includes('permission.user.view'),
        canCreateUser: permissions.includes('permission.user.create'),
        canUpdateUser: permissions.includes('permission.user.update'),
        canDeleteUser: permissions.includes('permission.user.delete'),
    };
}