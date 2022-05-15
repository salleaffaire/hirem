# Hierarchical Resource Language

In order to better express our model and to be more precise in how we describe a permissions in HiReM, we introduce the Hierarchical Resource Language (HRL). It's a pretty simple language :) No need for a complex compiler. But even simple definition greatly help wrap our minds around the concepts of HiReM.

First, some definitions.

**Resource** : A resource is a class of things to which we want to control access. It could literally be anything. HiReM uses HRL to describe its own resources (Accounts, Users, Roles, Permissions). One element of that class is denoted, resource instance.

**Action** : An action is a operation that can be applied to a resource class. Good example are read, write, create, etc.

**Resource Instance** : A Resource Instance is 1 element of the Resource class. Note that by convention, we will pluralize Resource (for example Accounts) and keep an instance singular (for example Account instance).

**Account** : An account is an Account instance in which other resource instances belong. When a resource instance (r) exists within an account (A) we say that (r) belongs to (A), or (r) -> (A). By definition, to simplify the nomenclature, Account is equivalent to Account instance.
Each Resource instance must belong to 1 and only 1 Account.

**Child Account** : As we hinted earlier, since Accounts is a Resource in HiReM, each Account must belong to another Account. If account (A1) belongs to account (A2), or (A1) -> (A2), A1 is a Child Account of A2.

**Scope** : A scope is list of Accounts given a particular User (U). We know that each Account belong to another Account. This creates a N-tree of account instances.
Remember that Users are a Resource in HiReM so they also belong to Accounts.

Given a User U,

- `@` or the Own Account Scope : is list that contains only the Account in which the User U belongs i.e. (@,U) is [A | (U) -> (A)].

- `*` or the All Accounts Scope : is the list of all Accounts. i.e. (*,?) is [A | A].

- `+(n)` or the n-th level Children Scope : is
  - for n=0 or +(0)  is list that contains only the Account in which the User U belongs.
  - for n=k or +(k) is +(k-1) plus the list that contains all Child Acocunts of +(k-1).

## Conventions
