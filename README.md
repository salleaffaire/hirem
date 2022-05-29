# hirem (WiP this project is not completed)

HIerarchical REsource Manager

Manage permisions on custom resources in a hierarchical way.

Users in Account ACME have READ and WRITE access on Pizza resources as never been easier to implement, manage and enforce.

## Docs

Hierarchical Resource Language [HRL](./docs/language.md)
API [API](./docs/api.md)

## Start postgres for development

### Docker

Start a dockerized PostgreSQL instance

```bash
docker run --rm -e POSTGRES_DB=postgres -e POSTGRES_USER=postgres -e ALLOW_EMPTY_PASSWORD=yes -p 5432:5432 bitnami/postgresql:11.6.0
```

once started, you can connect to the DB from a separate terminal,

```bash
docker exec -it sad_ellis psql -d postgres -U postgres
```

### SQL Client for Windows (Free - Open Source)

[HeidiSQL](https://www.heidisql.com/)

If you're running on Windows and your PostgreSQL server is started in WSL using the command above,

The IP address of the PostgreSQL server must be the one on the `eth0` interface when running `ifconfig` in WSL.

For example,

``` text
ifconfig

...

eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.23.13.2  netmask 255.255.240.0  broadcast 172.23.15.255
        inet6 fe80::215:5dff:feaa:f0ae  prefixlen 64  scopeid 0x20<link>
        ether 00:15:5d:aa:f0:ae  txqueuelen 1000  (Ethernet)
        RX packets 85600  bytes 118835015 (118.8 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 14707  bytes 2037572 (2.0 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

...

```

`172.23.13.2` in this example

### Launch

Install for development,

```bash
npm install
```

Start the service,

```bash
npm start
```

Start the service with Auth disabled,

```bash
AUTH_DISABLED="1" npm start
```

## API

```rest
  x GET     /accounts
  x GET     /accounts/{accountId}
  x POST    /accounts

  x GET     /users
  x GET     /accounts/{accountId}/users
  x GET     /accounts/{accountId}/users/{userId}
  x POST    /accounts/{accountId}/users
  x GET     /accounts/{accountId}/users/{userId}/roles                       // List all roles for a user
  x POST    /accounts/{accountId}/users/{userId}/roles/{roleId}              // Add role to user (Role Binding)
  x DELETE  /accounts/{accountId}/users/{userId}/roles/{roleId}              // Remove a role from a user

  x GET     /permissions
    GET     /accounts/{accountId}/permissions
    GET     /accounts/{accountId}/permissions/{permissionId}

  x GET     /roles
  x GET     /accounts/{accountId}/roles
  o GET     /accounts/{accountId}/roles/{roleId}
    POST    /accounts/{accountId}/roles
    POST    /accounts/{accountId}/roles/{roleId}/permissions                 // Add a permission to role
    DELETE  /accounts/{accountId}/roles/{roleId}/permissions/{permissionId}  // Remove a permission from role

    GET     /userinfo
```

## Seting up Auth0

Auth0 domain: `dev-f7mspsfl.us.auth0.com`
Auth0 Client Id: `0StS8S9gCVo52a3MntUaXiyRkj6a2csB`

```bash
AUTH0_IMS_CLIENT_ID=jyEL6syWBLzTQ9cXdWZcaJqM8J3MquWt AUTH0_IMS_CLIENT_SECRET=<>
 OAUTH_AUDIENCE=https://dev.hirem.acme.com npm start
```

Get access token

```bash
curl --request POST \
  --url 'https://dev-f7mspsfl.us.auth0.com/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data grant_type=client_credentials \
  --data client_id=jyEL6syWBLzTQ9cXdWZcaJqM8J3MquWt \
  --data client_secret=<> \
  --data audience=https://dev.hirem.acme.com
```

## Misc

1- @ is equivalent to #(0)
2-
