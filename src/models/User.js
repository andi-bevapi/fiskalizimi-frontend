class User {
    id;
    username;
    operatorCode;
    email;
    position;
    phone;
    firstName;
    lastName;
    branches;
    permissions;

    constructor(user = {}) {
        this.id = user.id || '';
        this.username = user.username || '';
        this.operatorCode = user.operatorCode || '';
        this.email = user.email || '';
        this.position = user.position || '';
        this.phone = user.phone || '';
        this.firstName = user.firstName || '';
        this.lastName = user.lastName || '';
        this.branches = user.branches || [];
        this.permissions = user.permissions || [];
    }

    isLoggedIn() {
        return !!this.id;
    }

    isMyProfile(id) {
        return this.id === id;
    }
}

export default User;
