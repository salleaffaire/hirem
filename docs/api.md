# HiReM API

## Accounts

```curl
GET /api/v1/accounts
```

**Description**: Returns the list of accounts in the user's scope.

---

```curl
GET /api/v1/accounts/{accountId}
```

**Description**: Returns account {accountId} if it exists and if it is in the user's scope.

---

```curl
POST /api/v1/accounts&
```

**Description**: Create an account with the name `body.name`. The created account belongs to the account the user belongs to.

**Body**:

```json
  {
     "name": "New Account 137"
  }
```

**Query**:

`overrideBelongsTo`: override the account which the created account belongs to.

---

## Users

```curl
GET /api/v1/users
```

**Description**: Returns the list of users in the user's scope.

---

```curl
GET /api/v1/accounts/{accountId}/users/{userId}
```

**Description**: Returns user {userId} if it exists and if it is in the user's scope.
