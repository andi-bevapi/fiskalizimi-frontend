class User {
    id;
    username;
    operatorCode;
    email;
    position;
    phone;
    firstName;
    lastName;
    branchId;
    clientId;
    permissions;
    arka;

    constructor(user = {}) {
        this.id = user.id || '';
        this.username = user.username || '';
        this.operatorCode = user.operatorCode || '';
        this.email = user.email || '';
        this.position = user.position || '';
        this.phone = user.phone || '';
        this.firstName = user.firstName || '';
        this.lastName = user.lastName || '';
        this.branchId = user.branchId || 0;
        this.clientId = user.clientId || 0;
        this.permissions = user.permissions || [];
        this.arka = user.arka || null;

    }

    isLoggedIn() {
        return !!this.id;
    }

    isMyProfile(id) {
        return this.id === id;
    }
}

export default User;
